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

  const isProtectedPage = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/parhobas')
  const isProtectedApi = request.nextUrl.pathname.startsWith('/api/admin')

  if (isProtectedPage || isProtectedApi) {
    if (!user) {
      if (isProtectedApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Check if user is the master admin
    const isMasterAdmin = allowedEmail && user.email === allowedEmail
    
    if (!isMasterAdmin) {
      // Check if user is in staff_roles
      const { data: staffData } = await supabase
        .from('staff_roles')
        .select('role')
        .eq('email', user.email)
        .eq('status', 'Aktif')
        .single()
        
      if (!staffData) {
        if (isProtectedApi) {
          return NextResponse.json({ error: 'Forbidden: Email not registered' }, { status: 403 })
        }
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('error', 'Unauthorized email')
        return NextResponse.redirect(url)
      }

      // If user is trying to access /admin but is only a parhobas, redirect to /parhobas
      if (request.nextUrl.pathname === '/admin' && staffData.role !== 'admin') {
         const url = request.nextUrl.clone()
         url.pathname = '/parhobas'
         return NextResponse.redirect(url)
      }

      // Restrict staff API to admins only
      if (request.nextUrl.pathname.startsWith('/api/admin/staff') && staffData.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden: Admin only' }, { status: 403 })
      }
    }
  }

  // Redirect authenticated user away from login page
  if (request.nextUrl.pathname === '/login' && user) {
    const isMasterAdmin = allowedEmail && user.email === allowedEmail
    
    // Check role to decide where to redirect
    if (isMasterAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
    
    const { data: staffData } = await supabase
      .from('staff_roles')
      .select('role')
      .eq('email', user.email)
      .eq('status', 'Aktif')
      .single()

    if (staffData) {
      const url = request.nextUrl.clone()
      url.pathname = staffData.role === 'admin' ? '/admin' : '/parhobas'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
