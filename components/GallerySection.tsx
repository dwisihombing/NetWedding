'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface GallerySectionProps {
  setActiveSection?: (section: string) => void
}

export default function GallerySection({ setActiveSection }: GallerySectionProps) {
  const { t } = useLanguage()
  const [galleryItems, setGalleryItems] = useState<
    Array<{ id: string; title: string; imageUrl: string }>
  >([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) return
        const payload = await response.json()
        setGalleryItems(payload.images || [])
      } catch (error) {
        setGalleryItems([])
      }
    }

    loadGallery()
  }, [])

  useEffect(() => {
    if (galleryItems.length === 0) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [galleryItems])

  return (
    <section className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col justify-end">
      
      {/* Back Button */}
      {setActiveSection && (
        <button 
          onClick={() => setActiveSection('home')}
          className="absolute top-8 left-4 md:left-8 z-[110] text-white flex items-center gap-2 hover:text-netflix-red transition-colors drop-shadow-md font-bold text-lg bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </button>
      )}

      {/* Main Fullscreen Image */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {galleryItems.length > 0 && galleryItems[activeIndex]?.imageUrl ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center md:bg-contain bg-no-repeat"
              style={{ backgroundImage: `url('${galleryItems[activeIndex].imageUrl}')` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
               <span className="text-gray-500">Loading gallery...</span>
            </div>
          )}
        </AnimatePresence>
        
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* Title & Scene Selection Bar (Bottom) */}
      <div className="relative z-10 w-full px-4 md:px-12 pb-6 md:pb-12 pt-32 bg-gradient-to-t from-black to-transparent">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`title-${activeIndex}`}
          className="text-2xl md:text-4xl font-black text-white drop-shadow-lg mb-4"
        >
          {t('gallery_title')} <span className="text-lg md:text-2xl text-gray-300 ml-3 font-normal">| Scene {activeIndex + 1}</span>
        </motion.h2>

        {/* Thumbnails (Scene Selection) */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {(galleryItems.length > 0 ? galleryItems : Array.from({ length: 8 }).map((_, i) => ({ id: `${i}`, title: '', imageUrl: '' }))).map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`snap-start shrink-0 min-w-[100px] md:min-w-[160px] h-16 md:h-24 rounded overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeIndex === index ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)] z-20' : 'border-transparent hover:border-gray-400 opacity-50 hover:opacity-100 z-10'}`}
            >
              <div className="relative w-full h-full bg-gray-900">
                {item.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">#{index + 1}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
