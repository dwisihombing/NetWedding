import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const bucket = process.env.SUPABASE_GALLERY_BUCKET || 'gallery'
    const folder = process.env.SUPABASE_GALLERY_FOLDER || ''

    const { data, error } = await supabase.storage.from(bucket).list(folder, {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const images = (data || [])
      .filter((item) => item.name && !item.name.endsWith('/'))
      .map((item, index) => {
        const path = folder ? `${folder}/${item.name}` : item.name
        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path)
        return {
          id: `${index + 1}`,
          title: item.name,
          imageUrl: publicData.publicUrl,
        }
      })

    return NextResponse.json({ images }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
