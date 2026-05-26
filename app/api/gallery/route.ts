import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imageDir = path.join(process.cwd(), 'public', 'image')
    
    if (!fs.existsSync(imageDir)) {
      return NextResponse.json({ images: [] }, { status: 200 })
    }

    const files = fs.readdirSync(imageDir)
    
    // Filter only valid image extensions
    const imageFiles = files.filter(file => 
      file.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
    )

    const images = imageFiles.map((file, index) => ({
      id: `${index + 1}`,
      title: `Wedding Moment ${index + 1}`,
      imageUrl: `/image/${file}`,
    }))

    return NextResponse.json({ images }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
