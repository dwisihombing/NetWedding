import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const guestSlug = request.nextUrl.searchParams.get('slug')

    if (!guestSlug) {
      return NextResponse.json(
        { error: 'Guest slug required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('unique_slug', guestSlug)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
