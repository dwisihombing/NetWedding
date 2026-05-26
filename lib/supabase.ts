// Environment variables for Supabase
// Add these to your .env.local file:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
// SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (server-side only)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Guest {
  id: string
  unique_slug: string
  name: string
  phone: string
  gender?: string
  rsvp_status: 'pending' | 'confirmed' | 'declined'
  group_size: number
  dietary_restrictions?: string
  created_at: string
  updated_at: string
}

export interface Wedding {
  id: string
  couple_name_first: string
  couple_name_second: string
  wedding_date: string
  wedding_location: string
  wedding_description?: string
  groom_photo_url?: string
  bride_photo_url?: string
  ceremony_time: string
  reception_time: string
  created_at: string
  updated_at: string
}
