# NetWedding Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- VS Code (recommended)

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure Supabase** (see README.md)

4. **Run dev server**
   ```bash
   npm run dev
   ```

## Project Structure Explained

### `/app` - Next.js App Router
- **layout.tsx** - Root layout for entire app
- **page.tsx** - Home page (redirects to login)
- **providers.tsx** - React context providers
- **login/** - Guest code entry & Who's Watching
- **invite/[slug]/** - Main invitation page
- **api/** - Backend endpoints

### `/components` - React Components
All components use Framer Motion for animations and Tailwind for styling.

- **WhoIsWatching.tsx** - Netflix profile selection
- **OpeningCinematic.tsx** - Animated intro sequence
- **InvitationHub.tsx** - Main container/router
- **Navigation.tsx** - Top nav with section tabs
- **HeroSection.tsx** - Couple intro & countdown
- **WeddingDetails.tsx** - Event details cards
- **GallerySection.tsx** - Photo grid
- **RSVPForm.tsx** - Guest response form

### `/lib` - Utilities & Configuration
- **supabase.ts** - Supabase client & types
- **utils.ts** - Helper functions

### `/styles` - Global Styles
- **globals.css** - Tailwind, custom CSS, animations

## Development Workflow

### Adding a New Component

1. Create file in `/components/MyComponent.tsx`
2. Use TypeScript for type safety
3. Add Framer Motion animations
4. Use Tailwind classes
5. Import in parent component

**Template:**
```tsx
'use client'

import { motion } from 'framer-motion'

interface MyComponentProps {
  title: string
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="..."
    >
      {title}
    </motion.div>
  )
}
```

### Adding a New Page

1. Create directory in `/app/my-page/`
2. Create `page.tsx` in that directory
3. Use layout conventions

**Template:**
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      Content here
    </div>
  )
}
```

### Adding API Routes

1. Create file in `/app/api/route-name/route.ts`
2. Export `GET`, `POST`, `PUT`, `DELETE` as needed
3. Use Supabase client for database

**Template:**
```tsx
import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Process request
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
```

## Styling Guidelines

### Using Tailwind
```tsx
// Always use Tailwind classes
<div className="bg-netflix-black text-white p-4">
  Content
</div>
```

### Netflix Color Palette
```
- netflix-black: #141414
- netflix-dark: #1a1a1a
- netflix-gray: #564d4d
- netflix-red: #e50914
```

### Custom CSS in globals.css
```css
.netflix-card {
  @apply transition-transform duration-300 ease-out hover:scale-105;
}
```

## Animation Patterns

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Slide & Fade
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### View Animations
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

## Environment Variables

**Public (client-side)** - prefix with `NEXT_PUBLIC_`:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_COUPLE_FIRST_NAME
- NEXT_PUBLIC_COUPLE_SECOND_NAME
- NEXT_PUBLIC_WEDDING_DATE
- NEXT_PUBLIC_WEDDING_LOCATION
- NEXT_PUBLIC_CEREMONY_TIME
- NEXT_PUBLIC_RECEPTION_TIME

**Private (server-only)**:
- SUPABASE_SERVICE_ROLE_KEY

## Testing Locally

### Test Guest Flow
1. Go to `http://localhost:3000/login`
2. Enter any 6-digit code (e.g., ABC123)
3. Select a profile
4. View invitation pages
5. Test RSVP form

### Test API Endpoints
```bash
# Test RSVP endpoint
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{"guestSlug":"ABC123",...}'
```

## Common Issues

### Supabase Connection Failed
- Check NEXT_PUBLIC_SUPABASE_URL in .env.local
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Verify Supabase project is running

### Animations Not Working
- Check Framer Motion is installed: `npm list framer-motion`
- Ensure `'use client'` at top of component

### Styling Issues
- Clear Tailwind cache: `rm -rf .next`
- Rebuild: `npm run dev`

## Performance Tips

1. **Use Next/Image for images**
   ```tsx
   import Image from 'next/image'
   <Image src="/photo.jpg" alt="..." width={400} height={300} />
   ```

2. **Lazy load components**
   ```tsx
   const HeavyComponent = dynamic(() => import('./Heavy'))
   ```

3. **Memoize expensive components**
   ```tsx
   export default memo(MyComponent)
   ```

4. **Code splitting for animations**
   - Framer Motion only loads when needed

## Debugging

### Enable Next.js Debug
```bash
DEBUG=* npm run dev
```

### Check Supabase Logs
1. Go to Supabase dashboard
2. View database logs
3. Check RLS policies

### Browser DevTools
1. Open Inspector
2. Check Network tab for API calls
3. Check Console for errors

## Deployment Checklist

- [ ] All env vars configured
- [ ] Supabase tables created
- [ ] RLS policies set
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] All links tested
- [ ] RSVP form tested
- [ ] Mobile responsive verified

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

---

Happy coding! 🚀
