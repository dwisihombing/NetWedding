# Quick Start Guide - NetWedding

Get your Netflix-style wedding invitation up and running in 5 minutes!

## 1️⃣ Clone & Install

```bash
cd /workspaces/NetWedding
npm install
```

## 2️⃣ Setup Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and Anon Key
4. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

NEXT_PUBLIC_COUPLE_FIRST_NAME=John
NEXT_PUBLIC_COUPLE_SECOND_NAME=Jane
NEXT_PUBLIC_WEDDING_DATE=2024-12-25
NEXT_PUBLIC_WEDDING_LOCATION=Grand Hotel Ballroom
NEXT_PUBLIC_CEREMONY_TIME=14:00
NEXT_PUBLIC_RECEPTION_TIME=18:00
```

## 3️⃣ Setup Database

1. Go to Supabase SQL Editor
2. Create new query
3. Copy and paste SQL from README.md (Database Setup section)
4. Run the queries

## 4️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login)

## 5️⃣ Test It Out

1. Enter any 6-digit code (e.g., `ABC123`)
2. Select a profile
3. Watch the opening cinematic
4. Explore all sections
5. Fill out the RSVP form

## 🎯 What's Included

✅ Netflix-style UI with responsive design  
✅ Who's Watching profile page  
✅ Opening cinematic with animations  
✅ Wedding details, gallery, RSVP sections  
✅ Supabase backend integration  
✅ TypeScript + React 18 + Next.js 14  
✅ Framer Motion animations  
✅ Tailwind CSS styling  

## 📝 Next Steps

### Customize Content
Edit `.env.local`:
- Change couple names
- Update wedding date/time/location
- Add ceremony and reception times

### Add Photos
1. Upload images to Supabase Storage
2. Update URLs in:
   - `HeroSection.tsx` - Add background image
   - `GallerySection.tsx` - Add gallery photos
   - `OpeningCinematic.tsx` - Add video/images

### Generate Guest Codes
```bash
node scripts/generate-codes.js 20
```
Generates 20 unique codes and saves to CSV

### Deploy
```bash
npm run build
vercel
```

Or see [DEPLOYMENT.md](./DEPLOYMENT.md) for other options

## 📚 Documentation

- [README.md](./README.md) - Complete documentation
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [FEATURES.md](./FEATURES.md) - Features & roadmap
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

## 🐛 Common Issues

**Problem**: Supabase connection fails  
**Solution**: Check `.env.local` variables are correct

**Problem**: Styles not working  
**Solution**: Run `npm run dev` and wait for build

**Problem**: Animations not showing  
**Solution**: Clear `.next` folder and restart dev server

## 💡 Pro Tips

1. Use environment variables for all config
2. Test RSVP form with mock data first
3. Add your own photos to gallery
4. Test on mobile with dev tools
5. Backup your Supabase database regularly

## 🎬 Demo Flow

**Guest Experience:**
1. Click personalized link with their code
2. Enter code on login page
3. Select profile (Netflix-style)
4. Watch animated introduction
5. Browse wedding info, gallery
6. Submit RSVP
7. See confirmation message

**Your Workflow:**
1. Customize couple names & date
2. Add your photos
3. Generate guest codes
4. Share links with guests
5. Monitor RSVPs in Supabase
6. View analytics (optional)

## 🚀 Ready?

Start building your wedding experience now! 💍

```bash
npm run dev
```

Questions? Check the documentation or open an issue on GitHub!

---

**Made with ❤️ for your special day! Enjoy! 🎉**
