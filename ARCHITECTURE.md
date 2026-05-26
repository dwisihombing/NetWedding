# NetWedding - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Netflix-Inspired Wedding Invitation       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│
│  Browser (Next.js App)
│  ├─ Pages (Next.js App Router)
│  │  ├─ / → Redirect to /invite/guest
│  │  └─ /invite/[slug] → InvitePage (Main Invitation)
│  │
│  ├─ Components (React + Framer Motion)
│  │  ├─ WhoIsWatching (Profile Selection)
│  │  ├─ OpeningCinematic (Animated Intro)
│  │  ├─ InvitationHub (Main Container)
│  │  ├─ Navigation (Top Nav)
│  │  ├─ HeroSection (Couple Intro)
│  │  ├─ WeddingDetails (Event Info)
│  │  ├─ GallerySection (Photos)
│  │  └─ RSVPForm (Guest Response)
│  │
│  ├─ Styling (Tailwind CSS)
│  │  ├─ globals.css (Global styles)
│  │  ├─ Netflix color palette
│  │  └─ Custom animations
│  │
│  ├─ State Management
│  │  ├─ localStorage (guest code)
│  │  └─ Component state (React)
│  │
│  └─ Utilities
│     ├─ lib/utils.ts (Helpers)
│     └─ lib/examples.ts (Example data)
│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      NETWORK LAYER                           │
├─────────────────────────────────────────────────────────────┤
│
│  HTTP/HTTPS Requests
│  ├─ GET /api/guest?slug=ABC123
│  ├─ POST /api/rsvp (Submit response)
│  └─ GET /api/rsvp?slug=ABC123 (Get RSVP)
│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      SERVER LAYER                            │
├─────────────────────────────────────────────────────────────┤
│
│  Next.js API Routes
│  ├─ /app/api/rsvp/route.ts
│  │  ├─ POST - Submit RSVP
│  │  └─ GET - Fetch RSVP
│  │
│  └─ /app/api/guest/route.ts
│     └─ GET - Fetch guest data
│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER (Supabase)                 │
├─────────────────────────────────────────────────────────────┤
│
│  PostgreSQL Database
│  ├─ guests table
│  │  ├─ id (UUID)
│  │  ├─ unique_slug (VARCHAR)
│  │  ├─ name, email, phone
│  │  ├─ rsvp_status
│  │  ├─ group_size
│  │  └─ dietary_restrictions
│  │
│  ├─ rsvp_responses table
│  │  ├─ id (UUID)
│  │  ├─ guest_slug (FK)
│  │  ├─ attendance
│  │  ├─ group_size
│  │  ├─ dietary_restrictions
│  │  └─ message
│  │
│  └─ wedding_info table
│     ├─ id (UUID)
│     ├─ couple_name_first/second
│     ├─ wedding_date
│     ├─ ceremony_time, reception_time
│     └─ location, description
│
│  Authentication & Security
│  ├─ Supabase Auth (Future)
│  ├─ Row Level Security (RLS)
│  └─ API Key authentication
│
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Guest Access Flow

```
Guest receives link
    ↓
Click link → /invite/[slug]
    ↓
Select profile (Who's Invited?)
    ↓
POST /api/guest?slug=ABC123
    ↓
Load guest data from database
    ↓
Display OpeningCinematic
    ↓
Show InvitationHub with 4 sections
    ├─ HeroSection (Countdown)
    ├─ WeddingDetails (Info)
    ├─ GallerySection (Photos)
    └─ RSVPForm (Response)
    ↓
Fill RSVP form
    ↓
POST /api/rsvp (Submit)
    ↓
Save to rsvp_responses table
    ↓
Show confirmation
```

## Component Tree

```
<Layout>
  <Providers>
    <page>
      {/* Home redirects to /invite/guest */}
      Redirect to /invite/guest
    </page>
    
    <InvitePage>
      {stage === 'profile' ? (
        <WhoIsWatching onSelect={handleProfileSelect} />
      ) : stage === 'cinema' ? (
        <OpeningCinematic onComplete={handleCinematicComplete} />
      ) : (
        <InvitationHub>
          <Navigation activeSection setActiveSection />
          <motion.div>
            {activeSection === 'home' && <HeroSection />}
            {activeSection === 'details' && <WeddingDetails />}
            {activeSection === 'gallery' && <GallerySection />}
            {activeSection === 'rsvp' && <RSVPForm />}
          </motion.div>
        </InvitationHub>
      )}
    </InvitePage>
  </Providers>
</Layout>
```

## State Management

### Component State
- Navigation: `activeSection`
- InvitePage: `stage`, `selectedProfile`
- RSVPForm: `formData`, `isSubmitting`, `submitMessage`
- WhoIsWatching: `selected`

### Local Storage
- `guestSlug` - Current guest code
- `watched_[slug]` - Whether cinematic was watched

### Server State
- Supabase database (guests, rsvp_responses, wedding_info)

## Environment Variables

### Public (Client-side)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_COUPLE_FIRST_NAME
NEXT_PUBLIC_COUPLE_SECOND_NAME
NEXT_PUBLIC_WEDDING_DATE
NEXT_PUBLIC_WEDDING_LOCATION
NEXT_PUBLIC_CEREMONY_TIME
NEXT_PUBLIC_RECEPTION_TIME
```

### Private (Server-side)
```
SUPABASE_SERVICE_ROLE_KEY
```

## File Organization

```
app/
├── api/
│   ├── rsvp/
│   │   └── route.ts (CRUD operations)
│   └── guest/
│       └── route.ts (Fetch guest)
├── login/
│   └── page.tsx (Auth page)
├── invite/
│   └── [slug]/
│       └── page.tsx (Main page)
├── layout.tsx (Root layout)
├── page.tsx (Redirect)
└── globals.css (Global styles)

components/
├── WhoIsWatching.tsx
├── OpeningCinematic.tsx
├── InvitationHub.tsx
├── Navigation.tsx
├── HeroSection.tsx
├── WeddingDetails.tsx
├── GallerySection.tsx
└── RSVPForm.tsx

lib/
├── supabase.ts (Client config)
├── utils.ts (Helpers)
└── examples.ts (Sample data)

styles/
└── globals.css (Tailwind + custom)

scripts/
├── generate-codes.js
└── setup-database.js

public/
└── (static files)
```

## Deployment Architecture

### Vercel Deployment
```
GitHub Repository
    ↓
Push to main branch
    ↓
Vercel auto-deployment
    ↓
Built Next.js app
    ↓
Deployed to Vercel CDN
    ↓
Custom domain (optional)
    ↓
Production URL
```

### Environment Setup
```
Vercel Project Settings
├─ Build & Development
│  ├─ Framework: Next.js
│  └─ Build command: npm run build
├─ Environment Variables
│  └─ Add from .env.local
└─ Domains
   └─ Connect custom domain
```

## Performance Optimizations

1. **Code Splitting** - Framer Motion loaded on-demand
2. **Image Optimization** - Next.js Image component
3. **CSS Optimization** - Tailwind purging unused styles
4. **API Caching** - Supabase query optimization
5. **Bundle Size** - Tree-shaking unused code

## Security Features

1. **Input Validation** - Form validation
2. **SQL Safety** - Supabase parameterized queries
3. **XSS Protection** - React auto-escaping
4. **CORS** - Configured in API routes
5. **Environment Secrets** - Not exposed in code
6. **RLS** - Row Level Security on Supabase

---

**For questions about architecture, see DEVELOPMENT.md**
