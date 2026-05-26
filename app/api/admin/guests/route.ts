import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { unique_slug, name, phone, gender, group_size } = body

    if (!unique_slug || !name || !phone) {
      return NextResponse.json(
        { error: 'unique_slug, name, and phone are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.from('guests').insert([
      {
        unique_slug,
        name,
        phone,
        gender: gender || 'L',
        group_size: group_size || 1,
        rsvp_status: 'pending',
      }
    ])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
