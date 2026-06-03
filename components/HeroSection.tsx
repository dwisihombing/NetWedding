'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface HeroSectionProps {
  setActiveSection: (section: any) => void
}

type ProfileKey = 'groom' | 'bride'

export default function HeroSection({ setActiveSection }: HeroSectionProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const guestSlug = (params?.slug as string) || ''
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-07-17'
  const firstCoupleName = process.env.NEXT_PUBLIC_COUPLE_FIRST_NAME || 'IVAN'
  const secondCoupleName = process.env.NEXT_PUBLIC_COUPLE_SECOND_NAME || 'JULIA'

  const backgroundImages = [
    '/image/1-COVER-scaled.jpg',
    '/image/2-SLIDE--scaled.jpg',
    '/image/3-scaled.jpg',
    '/image/7-LOVE-TOKEN-scaled.jpg'
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 4000) // Rotate image every 4 seconds
    return () => clearInterval(timer)
  }, [backgroundImages.length])

  const profiles: Record<ProfileKey, { title: string; image: string }> = {
    groom: {
      title: 'THE GROOM',
      image: '/image/4.-GROOM-682x1024.jpeg',
    },
    bride: {
      title: 'THE BRIDE',
      image: '/image/5.-BRIDE-750x1024.jpg',
    },
  }

  return (
    <section className="min-h-screen w-full relative overflow-y-auto pb-20 overflow-x-hidden">
      {/* Hero Background (Netflix style) */}
      <div className="relative min-h-[85vh] w-full bg-netflix-black flex flex-col justify-end pt-28 pb-16 px-4 md:px-12 z-0 overflow-hidden">

        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
              backgroundPosition: 'center 40%',
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/30 to-transparent"></div>

        <div className="relative z-10 w-full max-w-4xl">

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <span className="inline-block bg-netflix-red text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded">
              {t('hero_coming_soon')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-lg leading-tight uppercase"
          >
            {firstCoupleName} <br /><span className="text-netflix-red">&</span> {secondCoupleName}
          </motion.h1>

          {/* TOP 1 + Date row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="flex items-center gap-3 mt-4"
          >
            {/* TOP 1 badge — Netflix #1 style */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <div className="absolute inset-0 bg-netflix-red rounded-sm flex flex-col items-center justify-center leading-none">
                <span className="text-white font-black text-[7px] sm:text-[8px] uppercase tracking-tight">TOP</span>
                <span className="text-white font-black text-[14px] sm:text-base leading-none">1</span>
              </div>
            </div>

            <span className="text-gray-400 text-sm">•</span>

            {/* Wedding date */}
            <span className="text-white text-sm sm:text-base font-semibold">
              {new Date(weddingDate).toLocaleDateString(
                t('hero_days') === 'Days' ? 'en-US' : 'id-ID',
                { day: 'numeric', month: 'long', year: 'numeric' }
              )}
            </span>
          </motion.div>

          {/* Invitation subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm sm:text-base text-gray-300 mt-3 max-w-xl leading-relaxed"
          >
            {t('hero_invitation_subtitle')} <span className="text-white font-semibold">{firstCoupleName} &amp; {secondCoupleName}</span>{' '}
            {t('hero_invitation_date_prefix')}{' '}
            <span className="text-white font-semibold">
              {new Date(weddingDate).toLocaleDateString(
                t('hero_days') === 'Days' ? 'en-US' : 'id-ID',
                { day: 'numeric', month: 'long', year: 'numeric' }
              )}
            </span>
            {t('hero_invitation_date_suffix')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              onClick={() => setActiveSection('gallery')}
              className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded text-lg font-bold hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              {t('hero_play')}
            </button>
            <button
              onClick={() => setActiveSection('details')}
              className="flex items-center justify-center gap-2 bg-gray-500/70 text-white px-6 py-3 rounded text-lg font-bold hover:bg-gray-500/90 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t('hero_more_info')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* "Lists of films" (Menu categories) */}
      <div className="relative z-10 -mt-6 md:-mt-12 pb-20">

        {/* Category: Menu Utama */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-200 mb-3 md:mb-4 px-4 md:px-12">{t('hero_main_menu')}</h2>
          <div className="flex gap-3 md:gap-4 overflow-x-auto px-4 md:px-12 pb-4 scrollbar-hide snap-x">
            <div onClick={() => setActiveSection('details')} className="snap-start w-[60vw] sm:w-[240px] md:w-[320px] shrink-0 h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/image/4.-GROOM-682x1024.jpeg')", backgroundPosition: 'center 25%' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="relative z-10 font-bold text-xl drop-shadow-lg">{t('details_ceremony')}</span>
            </div>
            <div onClick={() => setActiveSection('details')} className="snap-start w-[60vw] sm:w-[240px] md:w-[320px] shrink-0 h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/image/5.-BRIDE-750x1024.jpg')", backgroundPosition: 'center 25%' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="relative z-10 font-bold text-xl drop-shadow-lg">{t('details_reception')}</span>
            </div>
            <div onClick={() => setActiveSection('rsvp')} className="snap-start w-[60vw] sm:w-[240px] md:w-[320px] shrink-0 h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/image/7-LOVE-TOKEN-scaled.jpg')", backgroundPosition: 'center 25%' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="relative z-10 text-center">
                <svg className="w-8 h-8 mx-auto text-white mb-1 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
                <span className="font-bold text-xl drop-shadow-lg">{t('rsvp_title')}</span>
              </div>
            </div>

            {/* Groom & Bride profile cards (appended to Menu Utama row) */}
            {(['groom', 'bride'] as ProfileKey[]).map((key) => {
              const p = profiles[key]
              return (
                <div
                  key={key}
                  onClick={() =>
                    router.push(
                      `/profile/${key}${guestSlug ? `?from=${encodeURIComponent('/invite/' + guestSlug)}` : ''}`
                    )
                  }
                  className="snap-start w-[60vw] sm:w-[240px] md:w-[320px] shrink-0 h-32 md:h-40 bg-gray-800 rounded cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group"
                >
                  <div
                    className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundImage: `url('${p.image}')`, backgroundPosition: 'center 25%' }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Netflix-style "Recently Added" badge: red pill centered, flush to bottom edge */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center">
                    <span className="inline-block bg-netflix-red text-white text-[10px] md:text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-t leading-none shadow-lg">
                      {p.title}
                    </span>
                  </div>
                </div>
              )
            })}

            <div
              onClick={() =>
                router.push(
                  `/prayer${guestSlug ? `?from=${encodeURIComponent('/invite/' + guestSlug)}` : ''}`
                )
              }
              className="snap-start w-[60vw] sm:w-[240px] md:w-[320px] shrink-0 h-32 md:h-40 bg-gray-800 rounded cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group"
            >
              <div
                className="absolute inset-0 bg-cover opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ backgroundImage: "url('/image/7-LOVE-TOKEN-scaled.jpg')", backgroundPosition: 'center 25%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-3">
                <span className="font-bold text-lg md:text-xl text-white drop-shadow-lg leading-tight">
                  {t('hero_wedding_prayer')}
                </span>
                <span className="text-[10px] md:text-xs text-gray-300 mt-1 tracking-wide">{t('hero_wedding_prayer_sub')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category: Our Story (Mobile List vs Desktop Top 10) */}
        <div className="mt-8 md:mt-12">
          
          {/* MOBILE VIEW (Episodes List) */}
          <div className="md:hidden px-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-4 bg-netflix-red"></div>
              <span className="text-netflix-red font-bold tracking-widest text-xs">{t('story_series')}</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-1 uppercase tracking-wide">{t('story_title')}</h2>
            <p className="text-gray-400 text-sm mb-6">{t('story_season')}</p>

            <div className="flex flex-col gap-6">
              {[
                { id: '01', titleKey: 'story_ep1_title', dateKey: 'story_ep1_date', descKey: 'story_ep1_desc', image: '/image/1-COVER-scaled.jpg', isLocked: false },
                { id: '02', titleKey: 'story_ep2_title', dateKey: 'story_ep2_date', descKey: 'story_ep2_desc', image: '/image/2-SLIDE--scaled.jpg', isLocked: false },
                { id: '03', titleKey: 'story_ep3_title', dateKey: 'story_ep3_date', descKey: 'story_ep3_desc', image: '/image/3-scaled.jpg', isLocked: false },
                { id: '04', titleKey: 'story_ep4_title', dateKey: 'story_ep4_date', descKey: 'story_ep4_desc', image: '/image/4.-GROOM-682x1024.jpeg', isLocked: false },
                { id: '05', titleKey: 'story_ep5_title', dateKey: 'story_ep5_date', descKey: 'story_ep5_desc', image: '/image/7-LOVE-TOKEN-scaled.jpg', isLocked: true },
              ].map((ep, idx) => (
                <div key={ep.id} className={`flex items-start gap-4 ${ep.isLocked ? 'opacity-50' : 'opacity-100'}`}>
                  {/* Number */}
                  <div className="text-3xl font-bold text-gray-400 w-8 shrink-0 tracking-tighter">{ep.id}</div>
                  
                  {/* Thumbnail */}
                  <div className="relative w-32 h-20 shrink-0 bg-gray-800 rounded overflow-hidden shadow-lg border border-gray-700/50">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${ep.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Progress Bar (fake) */}
                    {!ep.isLocked && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                        <div className="h-full bg-netflix-red" style={{ width: `${Math.max(10, 100 - (idx * 25))}%` }}></div>
                      </div>
                    )}
                    {/* Lock Icon for Coming Soon */}
                    {ep.isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-gray-100 font-bold text-sm flex items-center gap-2">
                      {t(ep.titleKey as any)}
                      {ep.isLocked && <span className="text-[9px] text-netflix-red font-bold uppercase tracking-wider">{t('hero_coming_soon')}</span>}
                    </h3>
                    <p className="text-gray-400 text-[10px] mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 text-netflix-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {t(ep.dateKey as any)}
                    </p>
                    <p className="text-gray-500 text-[11px] mt-1 line-clamp-2 leading-snug pr-2">
                      {t(ep.descKey as any)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP VIEW — Netflix Top 10 Style */}
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-gray-200 mb-4 px-12">{t('story_top10')}</h2>
            <div className="flex overflow-x-auto pl-12 pr-24 pb-8 pt-2 scrollbar-hide" style={{ gap: 0 }}>
              {[
                { id: 1, image: '/image/1-COVER-scaled.jpg',      titleKey: 'story_ep1_title', isNew: true  },
                { id: 2, image: '/image/2-SLIDE--scaled.jpg',     titleKey: 'story_ep2_title', isNew: false },
                { id: 3, image: '/image/3-scaled.jpg',            titleKey: 'story_ep3_title', isNew: true  },
                { id: 4, image: '/image/4.-GROOM-682x1024.jpeg',  titleKey: 'story_ep4_title', isNew: false },
                { id: 5, image: '/image/7-LOVE-TOKEN-scaled.jpg', titleKey: 'story_ep5_title', isNew: true  },
              ].map((item) => (
                <div
                  key={item.id}
                  className="snap-start flex items-center shrink-0 group cursor-pointer mr-6 md:mr-10 h-[200px]"
                >
                  {/* Giant stroked number using SVG for pixel-perfect height alignment */}
                  <svg className="h-[200px] w-[130px] shrink-0 z-0" viewBox="0 0 130 200">
                    <text
                      x="0"
                      y="198"
                      fontSize="270"
                      fontFamily="'Arial Black', Impact, sans-serif"
                      fontWeight="900"
                      fill="black"
                      stroke="#595959"
                      strokeWidth="6"
                      letterSpacing="-0.05em"
                    >
                      {item.id}
                    </text>
                  </svg>

                  {/* Poster Card — overlaps the number with negative margin */}
                  <div
                    className="relative w-[140px] h-[200px] bg-gray-800 rounded z-10 overflow-hidden shadow-2xl border border-gray-700/40 transition-transform duration-300 group-hover:scale-105"
                    style={{ marginLeft: '-4px' }} // Overlap sekitar 2%
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-8">
                      <span className="text-white font-bold text-xl leading-tight drop-shadow-lg line-clamp-2 block">
                        {t(item.titleKey as any)}
                      </span>
                    </div>
                    {item.isNew && (
                      <div className="absolute bottom-0 left-0 right-0 bg-netflix-red text-white text-[8px] font-bold text-center py-[3px] tracking-wider uppercase">
                        Recently Added
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
