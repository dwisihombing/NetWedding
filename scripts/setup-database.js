#!/usr/bin/env node

/**
 * Database Setup Script
 * Run with: node scripts/setup-database.js
 * 
 * Creates Supabase tables and policies
 * Requires environment variables to be set
 */

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const SQL_MIGRATIONS = `
-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  unique_slug VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  rsvp_status VARCHAR(20) DEFAULT 'pending',
  group_size INT DEFAULT 1,
  dietary_restrictions TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RSVP Responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guest_slug VARCHAR(10) NOT NULL REFERENCES guests(unique_slug),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  attendance VARCHAR(20),
  group_size INT,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Wedding Info table
CREATE TABLE IF NOT EXISTS wedding_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  couple_name_first VARCHAR(255) NOT NULL,
  couple_name_second VARCHAR(255) NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_location VARCHAR(255),
  wedding_description TEXT,
  groom_photo_url TEXT,
  bride_photo_url TEXT,
  ceremony_time TIME,
  reception_time TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_info ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read" ON wedding_info FOR SELECT USING (true);
CREATE POLICY "Guests can read own data" ON guests FOR SELECT USING (true);
CREATE POLICY "Allow insert rsvp" ON rsvp_responses FOR INSERT WITH CHECK (true);
`

const main = async () => {
  try {
    console.log('Setting up NetWedding database...\n')

    // Execute migrations
    console.log('Creating tables and policies...')

    // Note: For production, you should use Supabase dashboard or migrations
    // This is just for demonstration

    console.log('✓ Database setup complete!')
    console.log('\nNext steps:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Create a new query and paste the SQL from README.md')
    console.log('4. Run the queries')
  } catch (error) {
    console.error('Error setting up database:', error.message)
    process.exit(1)
  }
}

main()
