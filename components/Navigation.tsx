'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { resolveGuestAvatar } from '@/lib/avatar'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: any) => void
  guestData?: any
}

export default function Navigation({
  activeSection,
  setActiveSection,
  guestData,
}: NavigationProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const [reminderSet, setReminderSet] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const bellRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const urlSlug = (params?.slug as string) || ''

  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-07-17'
  const coupleFirst = process.env.NEXT_PUBLIC_COUPLE_FIRST_NAME || 'IVAN'
  const coupleSecond = process.env.NEXT_PUBLIC_COUPLE_SECOND_NAME || 'JULIA'

  // Use URL slug as a stable seed when guestData is missing,
  // so the navbar avatar still picks a consistent image per tamu.
  const { avatar, fallbackAvatar, initial } = resolveGuestAvatar(guestData, urlSlug)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track if a reminder is already saved
  useEffect(() => {
    const slug = guestData?.unique_slug || 'guest'
    const saved = typeof window !== 'undefined' && localStorage.getItem(`reminder_${slug}`)
    setReminderSet(!!saved)
  }, [guestData])

  // Close bell popover on outside click
  useEffect(() => {
    if (!bellOpen) return
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [bellOpen])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Try to schedule a Notification API reminder. Falls back to ICS download.
  const handleSetReminder = async () => {
    const slug = guestData?.unique_slug || 'guest'

    // Save flag locally so user knows it's enabled
    localStorage.setItem(`reminder_${slug}`, weddingDate)
    setReminderSet(true)

    // Browser notification permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      let permission = Notification.permission
      if (permission === 'default') {
        permission = await Notification.requestPermission()
      }
      if (permission === 'granted') {
        // Schedule a one-day-before reminder if the date is in the future
        const target = new Date(weddingDate)
        const remindAt = new Date(target.getTime() - 24 * 60 * 60 * 1000)
        const delay = remindAt.getTime() - Date.now()

        // setTimeout only fires while page is open, but we still try
        if (delay > 0 && delay < 2147483647) {
          window.setTimeout(() => {
            new Notification(`Reminder: ${coupleFirst} & ${coupleSecond} are getting married tomorrow!`, {
              body: `Don't forget the wedding on ${target.toLocaleDateString()}`,
              icon: '/image/icon.png',
            })
          }, delay)
        }

        // Show an immediate confirmation notification
        new Notification('Reminder set!', {
          body: `We'll remind you about ${coupleFirst} & ${coupleSecond}'s wedding.`,
          icon: '/image/icon.png',
        })
      }
    }

    // Always offer ICS as the durable fallback
    downloadIcs()
    showToast('Reminder activated. Calendar file downloaded.')
    setBellOpen(false)
  }

  const handleClearReminder = () => {
    const slug = guestData?.unique_slug || 'guest'
    localStorage.removeItem(`reminder_${slug}`)
    setReminderSet(false)
    showToast('Reminder removed.')
  }

  const downloadIcs = () => {
    const dt = new Date(weddingDate)
    const yyyy = dt.getFullYear()
    const mm = String(dt.getMonth() + 1).padStart(2, '0')
    const dd = String(dt.getDate()).padStart(2, '0')
    const dateStr = `${yyyy}${mm}${dd}`
    const summary = `${coupleFirst} & ${coupleSecond} Wedding`
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NetWedding//Reminder//EN',
      'BEGIN:VEVENT',
      `UID:${dateStr}-${coupleFirst}-${coupleSecond}@netwedding`,
      `DTSTAMP:${dateStr}T000000Z`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
      `SUMMARY:${summary}`,
      'DESCRIPTION:You are invited to our wedding celebration.',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${summary} tomorrow!`,
      'TRIGGER:-P1D',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wedding-${coupleFirst}-${coupleSecond}.ics`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const navItems = [
    { id: 'home', label: t('nav_home'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'details', label: t('nav_details'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'gallery', label: t('nav_gallery'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'rsvp', label: t('nav_rsvp'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ]

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex items-center justify-between px-4 md:px-12 py-4 ${isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setActiveSection('home')}
          className="text-2xl md:text-3xl font-black text-netflix-red cursor-pointer hover:opacity-80 transition-opacity"
        >
          Ivan & Julia
        </motion.h1>

        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id 
                  ? 'text-white font-bold' 
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Language toggle */}
        <div className="flex items-center bg-transparent border border-gray-600 rounded-sm">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-xs font-bold transition-colors ${language === 'en' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('id')}
            className={`px-2 py-1 text-xs font-bold transition-colors ${language === 'id' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}
          >
            ID
          </button>
        </div>

        {/* Bell / reminder */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setBellOpen((o) => !o)}
            aria-label="Set wedding reminder"
            className="relative p-2 text-gray-200 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {reminderSet && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-netflix-red rounded-full ring-2 ring-netflix-black" />
            )}
          </button>

          <AnimatePresence>
            {bellOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 mt-2 w-72 bg-[#181818] border border-gray-700 rounded-md shadow-2xl overflow-hidden"
              >
                <div className="p-4">
                  <p className="text-white font-bold text-sm mb-1">Wedding Reminder</p>
                  <p className="text-gray-400 text-xs mb-3">
                    Get a notification & calendar file for{' '}
                    <span className="text-white">
                      {new Date(weddingDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    .
                  </p>

                  {!reminderSet ? (
                    <button
                      onClick={handleSetReminder}
                      className="w-full bg-netflix-red hover:bg-red-700 text-white text-sm font-semibold py-2 rounded transition-colors"
                    >
                      Remind me
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-green-400">✓ Reminder is active</p>
                      <button
                        onClick={downloadIcs}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold py-2 rounded transition-colors"
                      >
                        Download calendar (.ics)
                      </button>
                      <button
                        onClick={handleClearReminder}
                        className="w-full bg-transparent border border-gray-600 hover:border-netflix-red text-gray-300 hover:text-white text-xs font-semibold py-2 rounded transition-colors"
                      >
                        Remove reminder
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <button
          onClick={() => setActiveSection('rsvp')}
          aria-label="Profile"
          className="w-9 h-9 rounded overflow-hidden bg-netflix-red flex items-center justify-center text-white font-bold text-sm shrink-0 hover:ring-2 hover:ring-white/40 transition"
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt="profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                if (fallbackAvatar && !target.src.includes(fallbackAvatar)) {
                  target.src = fallbackAvatar
                } else {
                  target.style.display = 'none'
                }
              }}
            />
          ) : (
            <span>{initial}</span>
          )}
        </button>
      </div>
    </nav>

    {/* Mobile Bottom Navigation */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-center py-2 px-2 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => (
        <button
          key={`mobile-${item.id}`}
          onClick={() => setActiveSection(item.id)}
          className={`flex flex-col items-center justify-center p-2 transition-colors ${
            activeSection === item.id 
              ? 'text-white' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <div className={`mb-1 transition-transform ${activeSection === item.id ? 'scale-110 text-white' : ''}`}>
             {item.icon}
          </div>
          <span className={`text-[10px] ${activeSection === item.id ? 'font-bold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>

    {/* Toast */}
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-netflix-red text-white text-sm font-semibold px-4 py-2 rounded shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
