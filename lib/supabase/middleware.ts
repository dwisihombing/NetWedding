import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const allowedEmail = process.env.ADMIN_EMAIL

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // User is not logged in, redirect to login page
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Check if the user is the allowed admin
    if (allowedEmail && user.email !== allowedEmail) {
      // Unauthenticated email, deny access
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('error', 'Unauthorized email')
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated user away from login page
  if (request.nextUrl.pathname === '/login' && user) {
    if (!allowedEmail || user.email === allowedEmail) {
       const url = request.nextUrl.clone()
       url.pathname = '/admin'
       return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
