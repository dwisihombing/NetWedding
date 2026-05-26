'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GallerySection() {
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
    <section className="min-h-screen bg-netflix-black pt-24 pb-20 md:pb-32 overflow-y-auto overflow-x-hidden">
      
      {/* Slideshow Top Section */}
      <div className="w-full relative mb-12 bg-gray-900 border-b border-netflix-red/30">
        <div className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
          {galleryItems.length > 0 && galleryItems[activeIndex]?.imageUrl ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${galleryItems[activeIndex].imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent"></div>
            </motion.div>
          ) : (
             <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
               <span className="text-gray-500">Loading gallery...</span>
             </div>
          )}
          
          {/* Overlay Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={`title-${activeIndex}`}
              className="text-3xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-lg mb-4"
            >
              {t('gallery_title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={`desc-${activeIndex}`}
              className="text-lg md:text-xl text-gray-300 drop-shadow-md font-semibold"
            >
              Moment #{activeIndex + 1}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-6 px-1">Gallery Collection</h3>
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {(galleryItems.length > 0 ? galleryItems : Array.from({ length: 8 }).map((_, i) => ({ id: `${i}`, title: '', imageUrl: '' }))).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setActiveIndex(index)}
              className={`snap-start shrink-0 min-w-[150px] md:min-w-[250px] h-24 md:h-36 rounded overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeIndex === index ? 'border-netflix-red scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]' : 'border-transparent hover:border-white opacity-60 hover:opacity-100'}`}
            >
              <div className="relative w-full h-full bg-gray-800">
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
