import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      guestSlug,
      name,
      attendance,
      groupSize,
    } = body

    if (!guestSlug || !name) {
      return NextResponse.json(
        { error: 'guestSlug and name are required' },
        { status: 400 }
      )
    }

    // Insert RSVP into Supabase
    const { data, error } = await supabase.from('rsvp_responses').insert([
      {
        guest_slug: guestSlug,
        name,
        attendance,
        group_size: attendance === 'no' ? 0 : groupSize,
      },
    ])

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Also update guest status
    let rsvpStatus = 'pending'
    if (attendance === 'no') rsvpStatus = 'declined'
    else if (attendance !== 'undecided') rsvpStatus = 'confirmed'
    
    await supabase
      .from('guests')
      .update({ rsvp_status: rsvpStatus, group_size: attendance === 'no' ? 0 : groupSize })
      .eq('unique_slug', guestSlug)

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
      .from('rsvp_responses')
      .select('*')
      .eq('guest_slug', guestSlug)
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
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
