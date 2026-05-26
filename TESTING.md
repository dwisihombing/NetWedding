# NetWedding - Testing Guide

Complete testing procedures for NetWedding application.

## 🧪 Unit Testing Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest @types/jest
```

Create `jest.config.js`:
```js
const nextJest = require('next/jest')
const createJestConfig = nextJest()

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

## 🔍 Manual Testing Checklist

### 1. Profile Selection (Who's Invited?)
- [ ] Both profiles display correctly
- [ ] Hover effects work
- [ ] Click animation works
- [ ] Redirects to opening cinematic

### 2. Opening Cinematic
- [ ] Progress bar animates
- [ ] Couple names display
- [ ] Automatic progression to next section
- [ ] Can skip (optional feature)

### 3. Hero Section
- [ ] Couple names display correctly
- [ ] Countdown shows correct days
- [ ] Date formatted correctly
- [ ] Location displays
- [ ] Scroll animation works

### 5. Wedding Details
- [ ] All three cards visible
- [ ] Ceremony time formatted correctly
- [ ] Reception time formatted correctly
- [ ] Hover effects work
- [ ] Additional info section displays

### 6. Gallery Section
- [ ] Grid displays (8 items)
- [ ] Responsive layout (1/2/4 columns)
- [ ] Play button appears on hover
- [ ] Mobile: single column layout

### 7. RSVP Form
- [ ] All fields visible
- [ ] Required validation
- [ ] Email validation
- [ ] Group size field appears when confirmed
- [ ] Submit button disabled until valid
- [ ] Success message displays
- [ ] Form resets after submit

### 8. Navigation
- [ ] All tabs visible
- [ ] Active indicator shows
- [ ] Tab switching works
- [ ] Mobile menu (when implemented)

### 9. Responsive Design
- [ ] Mobile (375px)
  - [ ] Single column layout
  - [ ] Touch-friendly buttons
  - [ ] Nav stack vertically
- [ ] Tablet (768px)
  - [ ] 2-column layout
  - [ ] Proper spacing
- [ ] Desktop (1200px)
  - [ ] Full layout
  - [ ] All features visible

### 10. Animations
- [ ] Fade-in animations work
- [ ] Slide animations smooth
- [ ] Scroll animations trigger
- [ ] No jank or stuttering
- [ ] Performance is good

## 🌐 Browser Testing

### Desktop
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Safari (iOS)

### Viewport Sizes
- [ ] 320px (small phone)
- [ ] 375px (iPhone)
- [ ] 768px (tablet)
- [ ] 1024px (large tablet)
- [ ] 1440px (desktop)
- [ ] 1920px (large desktop)

## 📱 Mobile Testing

```bash
# Test on local network
npm run dev -- -H 0.0.0.0

# Then visit: http://[YOUR_IP]:3000
```

## 🔧 API Testing

### Test Guest Lookup
```bash
curl http://localhost:3000/api/guest?slug=ABC123 \
  -H "Content-Type: application/json"
```

### Test RSVP Submission
```bash
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "guestSlug": "ABC123",
    "name": "John Doe",
    "email": "john@example.com",
    "attendance": "confirmed",
    "groupSize": 2,
    "dietaryRestrictions": "vegetarian",
    "message": "Looking forward!"
  }'
```

### Test RSVP Retrieval
```bash
curl http://localhost:3000/api/rsvp?slug=ABC123
```

## 🔐 Security Testing

- [ ] No credentials in client code
- [ ] Environment variables not exposed
- [ ] XSS protection (try script injection)
- [ ] Input sanitization
- [ ] No console errors
- [ ] CORS properly configured

## ⚡ Performance Testing

### Lighthouse Audit
```bash
# Build for production
npm run build

# Check with Lighthouse
# Chrome DevTools → Lighthouse
```

Targets:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Bundle Analysis
```bash
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js and run build
```

### Load Testing
- [ ] Test with 100 concurrent users
- [ ] Test with 10,000 RSVP requests
- [ ] Monitor database performance
- [ ] Check API response times

## 🎬 User Journey Testing

### Complete Happy Path
1. [ ] Start at `/` (home)
2. [ ] Select profile from "Who's Invited?"
3. [ ] Watch cinematic
4. [ ] Scroll through hero
5. [ ] View wedding details
6. [ ] Browse gallery
7. [ ] Fill RSVP form
8. [ ] See confirmation

### Edge Cases
- [ ] Invalid email format
- [ ] Very long names
- [ ] Special characters in fields
- [ ] Dietary restrictions with quotes/special chars
- [ ] Fast navigation (rapid tab clicks)
- [ ] Going back in browser
- [ ] Refresh during form submission
- [ ] Network timeout

## 📊 Analytics Testing (When Implemented)

- [ ] Page views tracked
- [ ] Events tracked
- [ ] User flow tracked
- [ ] RSVP submissions tracked
- [ ] Error events tracked

## 🐛 Error Scenarios

- [ ] Network disconnected
- [ ] Supabase down
- [ ] Invalid guest code
- [ ] Database timeout
- [ ] Missing environment variables
- [ ] Corrupted localStorage
- [ ] Large form submissions

## 📝 Testing Report Template

```markdown
# Testing Report - NetWedding

**Date:** [DATE]
**Tester:** [NAME]
**Build:** [VERSION]

## Summary
- **Total Tests:** 50
- **Passed:** 48
- **Failed:** 2
- **Skipped:** 0

## Passed Tests
✅ Profile selection (Who's Invited?)
✅ Navigation
... (list all passed)

## Failed Tests
❌ Gallery loading on slow network
- Expected: Images load
- Actual: 404 errors
- Severity: High

❌ RSVP form submit on mobile
- Expected: Form submits
- Actual: Button doesn't respond
- Severity: Critical

## Browser Compatibility
- Chrome: ✅ Pass
- Firefox: ✅ Pass
- Safari: ⚠️ Minor issue
- Edge: ✅ Pass

## Performance
- Lighthouse Score: 92/100
- Load Time: 1.2s
- TTFB: 200ms

## Recommendations
1. Fix mobile RSVP button
2. Add image lazy loading
3. Optimize Framer Motion animations

## Sign Off
[Tester Name] - [Date]
```

## 🚀 Deployment Testing

Before deploying to production:

- [ ] Build succeeds: `npm run build`
- [ ] No build warnings
- [ ] No console errors
- [ ] All env vars configured
- [ ] Database initialized
- [ ] Supabase RLS policies set
- [ ] API endpoints working
- [ ] Guest codes generated
- [ ] Test with real Supabase data
- [ ] RSVP submission working

## ✅ Pre-Launch Checklist

```
Development Phase
- [ ] Feature complete
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Documentation complete

Staging Phase
- [ ] Deployed to staging
- [ ] All tests pass on staging
- [ ] Performance acceptable
- [ ] Security audit passed

Production Phase
- [ ] Database backed up
- [ ] Monitoring set up
- [ ] Error tracking enabled
- [ ] Team trained
- [ ] Rollback plan ready
- [ ] Launch!
```

## 📞 Support Testing

- [ ] Error messages are clear
- [ ] Help documentation available
- [ ] Support contact visible
- [ ] FAQ covers common issues

---

**Questions?** See DEVELOPMENT.md or README.md
