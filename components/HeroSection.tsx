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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-lg leading-tight uppercase"
          >
            {firstCoupleName} <br/><span className="text-netflix-red">&</span> {secondCoupleName}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 mt-4 max-w-2xl text-shadow font-semibold"
          >
            {t('hero_married')} <span className="block mt-2 text-white">{new Date(weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
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
      <div className="relative z-10 px-4 md:px-12 -mt-6 md:-mt-12 pb-20">
        
        {/* Category: Menu Utama */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-200 mb-3 md:mb-4 px-1">Menu Utama</h2>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
             <div onClick={() => setActiveSection('details')} className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/image/4.-GROOM-682x1024.jpeg')" }}></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <span className="relative z-10 font-bold text-xl drop-shadow-lg">{t('details_ceremony')}</span>
             </div>
             <div onClick={() => setActiveSection('details')} className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/image/5.-BRIDE-750x1024.jpg')" }}></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <span className="relative z-10 font-bold text-xl drop-shadow-lg">{t('details_reception')}</span>
             </div>
             <div onClick={() => setActiveSection('rsvp')} className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/image/7-LOVE-TOKEN-scaled.jpg')" }}></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
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
                   className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-gray-800 rounded cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group"
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
          </div>
        </div>

      </div>

    </section>
  )
}
