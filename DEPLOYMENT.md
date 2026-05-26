# NetWedding Deployment Guide

## Quick Start to Production

### 1. Vercel Deployment (Recommended)

**Easiest Option:**
```bash
npm install -g vercel
vercel
```

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`

### 2. Deploy to Production

**Build locally first:**
```bash
npm run build
npm start
```

### 3. Set up Supabase Project

1. Create account at https://supabase.com
2. Create new project
3. Run SQL migrations (see README.md database setup)
4. Get API keys from project settings
5. Add to production environment variables

### 4. Environment Variables Needed

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Wedding Config
NEXT_PUBLIC_COUPLE_FIRST_NAME=
NEXT_PUBLIC_COUPLE_SECOND_NAME=
NEXT_PUBLIC_WEDDING_DATE=YYYY-MM-DD
NEXT_PUBLIC_WEDDING_LOCATION=
NEXT_PUBLIC_CEREMONY_TIME=HH:MM
NEXT_PUBLIC_RECEPTION_TIME=HH:MM
```

### 5. Custom Domain

In Vercel:
1. Go to Settings → Domains
2. Add your custom domain
3. Point DNS records (see Vercel instructions)

### 6. Guest Code Generation

Generate unique 6-digit codes for guests:

```javascript
// In a Node script or admin panel
const generateGuestCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
```

### 7. Post-Launch Checklist

- [ ] Test all links on production
- [ ] Verify Supabase connectivity
- [ ] Test RSVP form submission
- [ ] Test gallery loading
- [ ] Check mobile responsiveness
- [ ] Verify email notifications (if configured)
- [ ] Test with actual guest codes
- [ ] Set up analytics (optional)
- [ ] Enable HTTPS/SSL
- [ ] Configure backup strategy

### 8. Guest Distribution

**Send guests links like:**
```
https://yourdomain.com/invite/guest123
```

Or create QR codes pointing to personalized guest links for print invitations.

### 9. Monitoring & Maintenance

- Monitor Supabase dashboard for usage
- Check error logs in Vercel
- Regular backups of guest data
- Update content as needed

---

Good luck with your wedding! 🎉💍
