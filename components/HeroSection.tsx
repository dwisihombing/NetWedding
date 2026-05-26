'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroSectionProps {
  setActiveSection: (section: any) => void
}

export default function HeroSection({ setActiveSection }: HeroSectionProps) {
  const { t } = useLanguage()
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-07-17'
  const firstCoupleName = process.env.NEXT_PUBLIC_COUPLE_FIRST_NAME || 'IVAN'
  const secondCoupleName = process.env.NEXT_PUBLIC_COUPLE_SECOND_NAME || 'JULIA'

  return (
    <section className="min-h-screen w-full relative overflow-y-auto pb-20 overflow-x-hidden">
      {/* Hero Background (Netflix style) */}
      <div className="relative min-h-[85vh] w-full bg-gradient-to-br from-gray-900 to-netflix-black flex flex-col justify-end pt-28 pb-16 px-4 md:px-12 z-0">
        <div className="absolute inset-0 bg-cover bg-top opacity-50" style={{ backgroundImage: "url('/image/1-COVER-scaled.jpg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent"></div>

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
      <div className="relative z-10 px-4 md:px-12 -mt-6 md:-mt-12 space-y-8 md:space-y-12 pb-20">
        
        {/* Category: The Details */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-200 mb-3 md:mb-4 px-1">{t('nav_details')}</h2>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
             <div onClick={() => setActiveSection('details')} className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" style={{ backgroundImage: "url('/image/4.-GROOM-682x1024.jpeg')" }}></div>
                <span className="relative z-10 font-bold text-xl">{t('details_ceremony')}</span>
             </div>
             <div onClick={() => setActiveSection('details')} className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:border-white border-2 border-transparent transition-all overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" style={{ backgroundImage: "url('/image/5.-BRIDE-750x1024.jpg')" }}></div>
                <span className="relative z-10 font-bold text-xl">{t('details_reception')}</span>
             </div>
          </div>
        </div>

        {/* Category: RSVP */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-200 mb-3 md:mb-4 px-1">{t('nav_rsvp')}</h2>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
             <div onClick={() => setActiveSection('rsvp')} className="snap-start min-w-[200px] md:min-w-[300px] h-32 md:h-40 bg-netflix-red/20 rounded flex items-center justify-center cursor-pointer hover:bg-netflix-red/40 border-2 border-netflix-red/50 hover:border-white transition-all group">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
                  <span className="font-bold text-lg">{t('rsvp_title')}</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}
