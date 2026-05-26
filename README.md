# NetWedding - Digital Wedding Invitation Platform

Welcome to **NetWedding**, a Netflix-inspired digital wedding invitation platform. This web application provides an interactive, memorable way to share wedding details and manage RSVPs with your guests.

## Overview

NetWedding adalah undangan pernikahan digital berbasis web yang meniru tampilan dan nuansa Netflix. Pengunjung langsung masuk ke halaman profile "Who's Invited?" yang dipersonalisasi, menyaksikan opening cinematic bertema nama pasangan, lalu menjelajahi informasi pernikahan yang disajikan dalam format konten ala Netflix.

## Features

✨ **Key Features:**
- 🎬 **Netflix-Style Interface** - Familiar design language with dark theme and red accents
- 🔐 **Personalized Access** - Each guest gets a unique link with a 6-digit code
- 🎭 **Who's Invited? Page** - Netflix-like profile selection interface
- 🎞️ **Opening Cinematic** - Dramatic animated introduction with couple's names
- 📋 **Wedding Information** - Ceremony time, reception details, and what to expect
- 🖼️ **Gallery Section** - Space for wedding photos and memories
- 📝 **RSVP Management** - Easy-to-use form for guest responses
- 📊 **Supabase Integration** - Backend database for managing guests and RSVPs

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Netflix-inspired theme
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL + Storage)
- **Guest Master Data**: Google Sheets (nama undangan, nomor telepon, jenis kelamin)
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
    SUPABASE_GALLERY_BUCKET=gallery
    SUPABASE_GALLERY_FOLDER=
    GOOGLE_SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/<sheet-id>/gviz/tq?tqx=out:csv
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

## MVP Architecture (Agreed)

- **Deploy**: Vercel
- **Repository**: GitHub
- **Guest List Source**: Google Sheets (easy admin update)
- **Photo Gallery**: Supabase Storage (gratis, cepat, mudah upload)
- **Wishes/Ucapan**: Supabase DB (real-time, production-ready)
- **MVP Scope**: Lokasi, RSVP, Gift, Wishes, Galeri

### Google Sheets format (header wajib)

Gunakan header CSV berikut di row pertama:

`unique_slug,name,phone,gender`

Contoh:

`guest001,Budi,08123456789,male`

## Database Setup

### Create Tables in Supabase

Run the following SQL in your Supabase SQL editor:

```sql
-- Guests table
CREATE TABLE guests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  unique_slug VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  gender VARCHAR(20),
  rsvp_status VARCHAR(20) DEFAULT 'pending',
  group_size INT DEFAULT 1,
  dietary_restrictions TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RSVP Responses table
CREATE TABLE rsvp_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guest_slug VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  gender VARCHAR(20),
  attendance VARCHAR(20),
  group_size INT,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rsvp_guest_slug ON rsvp_responses(guest_slug);

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

1. **Entry Point**: Guest opens the invitation link
2. **Profile Selection**: Netflix-style "Who's Invited?" page
3. **Opening Show**: Dramatic cinematic with couple's names
4. **Invitation Hub**: Browse wedding details, gallery, and RSVP

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

## Langkah 2 — Setup Supabase Gallery (Storage)

1. Buka **Supabase Dashboard → Storage**
2. Buat bucket baru:
   - Name: `gallery` (atau sesuaikan dengan `SUPABASE_GALLERY_BUCKET`)
   - Access: **Public**
3. (Opsional) Buat folder, misalnya: `wedding`
4. Upload foto-foto ke bucket/folder tersebut
5. Set environment di `.env.local`:

```env
SUPABASE_GALLERY_BUCKET=gallery
SUPABASE_GALLERY_FOLDER=wedding
```

6. Jalankan app, lalu test endpoint:
   - `GET /api/gallery`
   - Harus mengembalikan `images: [{ id, title, imageUrl }]`

### Jika bucket private
Pastikan policy read diaktifkan untuk file yang ingin ditampilkan publik, atau ubah bucket menjadi public.

## Langkah 3 — Test RSVP + Wishes real ke Supabase

### A. Test dari UI
1. Buka undangan: `/invite/<slug-tamu>`
2. Masuk ke tab **RSVP**
3. Isi form: nama, nomor telepon, jenis kelamin, attendance, message
4. Submit
5. Cek di Supabase table `rsvp_responses` apakah row baru masuk

### B. Test cepat via API (opsional)

Gunakan request berikut:

```bash
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "guestSlug":"guest001",
    "name":"Budi",
    "phone":"08123456789",
    "gender":"male",
    "attendance":"confirmed",
    "groupSize":2,
    "dietaryRestrictions":"",
    "message":"Selamat ya!"
  }'
```

Respons sukses:
- `{ "success": true, ... }`

### C. Verifikasi hasil submit
- Cek row baru di `rsvp_responses`
- Kolom penting yang wajib terisi: `guest_slug`, `name`, `phone`, `message`

## License

MIT License - feel free to use this for your wedding!

---

Made with ❤️ for your special day! Enjoy your NetWedding experience! 🎬💍  
