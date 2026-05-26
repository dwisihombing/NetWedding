# NetWedding - Digital Wedding Invitation Platform

Welcome to **NetWedding**, a Netflix-inspired digital wedding invitation platform. This web application provides an interactive, memorable way to share wedding details and manage RSVPs with your guests.

## Overview

NetWedding adalah undangan pernikahan digital berbasis web yang meniru tampilan dan nuansa Netflix. Pengunjung masuk melalui halaman "Who's Watching" yang dipersonalisasi, menyaksikan opening cinematic bertema nama pasangan, lalu menjelajahi informasi pernikahan yang disajikan dalam format konten ala Netflix.

## Features

✨ **Key Features:**
- 🎬 **Netflix-Style Interface** - Familiar design language with dark theme and red accents
- 🔐 **Personalized Access** - Each guest gets a unique link with a 6-digit code
- 🎭 **Who's Watching Page** - Netflix-like profile selection interface
- 🎞️ **Opening Cinematic** - Dramatic animated introduction with couple's names
- 📋 **Wedding Information** - Ceremony time, reception details, and what to expect
- 🖼️ **Gallery Section** - Space for wedding photos and memories
- 📝 **RSVP Management** - Easy-to-use form for guest responses
- 📊 **Supabase Integration** - Backend database for managing guests and RSVPs

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Netflix-inspired theme
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Deployment Ready**: Vercel-compatible

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available at https://supabase.com)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Configure wedding details:
     ```bash
     NEXT_PUBLIC_COUPLE_FIRST_NAME=John
     NEXT_PUBLIC_COUPLE_SECOND_NAME=Jane
     NEXT_PUBLIC_WEDDING_DATE=2024-12-25
     NEXT_PUBLIC_WEDDING_LOCATION=Grand Hotel Ballroom
     NEXT_PUBLIC_CEREMONY_TIME=14:00
     NEXT_PUBLIC_RECEPTION_TIME=18:00
     ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Create Tables in Supabase

Run the following SQL in your Supabase SQL editor:

```sql
-- Guests table
CREATE TABLE guests (
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
CREATE TABLE rsvp_responses (
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
CREATE TABLE wedding_info (
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
```

## Project Structure

```
NetWedding/
├── app/
│   ├── api/                 # API routes
│   │   ├── rsvp/           # RSVP endpoint
│   │   └── guest/          # Guest lookup endpoint
│   ├── login/              # Login/Who's Watching page
│   ├── invite/[slug]/      # Main invitation page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home redirect
│   ├── providers.tsx       # React providers
│   └── globals.css         # Global styles
├── components/
│   ├── WhoIsWatching.tsx   # Profile selection
│   ├── OpeningCinematic.tsx # Animated intro
│   ├── InvitationHub.tsx   # Main hub component
│   ├── Navigation.tsx      # Top navigation
│   ├── HeroSection.tsx     # Hero section
│   ├── WeddingDetails.tsx  # Event details
│   ├── GallerySection.tsx  # Photo gallery
│   └── RSVPForm.tsx        # RSVP form
├── lib/
│   └── supabase.ts         # Supabase client & types
├── styles/
│   └── globals.css         # Tailwind & custom styles
├── public/                 # Static files
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Usage

### Guest Access Flow

1. **Entry Point**: Guest receives unique link with 6-digit code
2. **Login**: Guest enters their code on `/login` page
3. **Profile Selection**: Netflix-style "Who's Watching?" page
4. **Opening Show**: Dramatic cinematic with couple's names
5. **Invitation Hub**: Browse wedding details, gallery, and RSVP

## Customization

### Change Wedding Details

Edit `.env.local`:
```env
NEXT_PUBLIC_COUPLE_FIRST_NAME=John
NEXT_PUBLIC_COUPLE_SECOND_NAME=Jane
NEXT_PUBLIC_WEDDING_DATE=2024-12-25
NEXT_PUBLIC_WEDDING_LOCATION=Grand Hotel Ballroom
```

## Deployment

### Deploy to Vercel

```bash
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## API Endpoints

### POST /api/rsvp
Submit or update RSVP response

### GET /api/guest?slug=ABC123
Fetch guest information

### GET /api/rsvp?slug=ABC123
Fetch RSVP response for guest

## License

MIT License - feel free to use this for your wedding!

---

Made with ❤️ for your special day! Enjoy your NetWedding experience! 🎬💍  
