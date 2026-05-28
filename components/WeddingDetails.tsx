'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function WeddingDetails() {
  const ceremonyTime =
    process.env.NEXT_PUBLIC_CEREMONY_TIME || 'Friday, 17 July 2026 - 09.00 WIB'
  const receptionTime =
    process.env.NEXT_PUBLIC_RECEPTION_TIME || 'Friday, 17 July 2026 - 12.00 WIB'
  const ceremonyLocation =
    process.env.NEXT_PUBLIC_CEREMONY_LOCATION || 'GBKP Runggun Sidikalang, Dairi'
  const receptionLocation =
    process.env.NEXT_PUBLIC_RECEPTION_LOCATION || 'Sopo Godang HKBP 1 Sidikalang, Dairi'

  const [activeMap, setActiveMap] = useState<string | null>(null)

  const details = [
    {
      title: 'Holy Matrimony',
      time: ceremonyTime,
      description: ceremonyLocation,
      icon: '💍',
      mapQuery: 'GBKP Runggun Sidikalang'
    },
    {
      title: 'Wedding Reception',
      time: receptionTime,
      description: receptionLocation,
      icon: '🎉',
      mapQuery: 'Sopo Godang HKBP 1 Sidikalang'
    },
  ]

  const toggleMap = (title: string) => {
    if (activeMap === title) {
      setActiveMap(null)
    } else {
      setActiveMap(title)
    }
  }

  return (
    <section className="min-h-screen relative py-20 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/2-SLIDE--scaled.jpg')" }}></div>
      <div className="absolute inset-0 bg-netflix-black/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Wedding Details
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-netflix-red mb-2">IVAN & JULIA</h3>
            <p className="text-gray-300 text-lg px-4">
              Ivan Daniel Andrianta Sitepu S.Si & Julia Ester Stepany Nababan S.K.M
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onClick={() => toggleMap(detail.title)}
              className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-netflix-red/50 transition-all duration-300 netflix-card cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">{detail.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{detail.title}</h3>
              <p className="text-netflix-red font-semibold mb-3">{detail.time}</p>
              <p className="text-gray-400 mb-4">{detail.description}</p>
              
              <div className="flex items-center text-sm font-bold text-white mb-4 bg-gray-800/50 py-2 px-4 rounded-md w-fit group-hover:bg-netflix-red group-hover:text-white transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {activeMap === detail.title ? 'Tutup Peta' : 'Lihat Peta'}
              </div>

              <AnimatePresence>
                {activeMap === detail.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-lg mt-4"
                  >
                    <iframe 
                      width="100%" 
                      height="250" 
                      style={{border:0}} 
                      loading="lazy" 
                      allowFullScreen 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(detail.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 max-w-2xl mx-auto bg-gray-900 rounded-lg p-8 border border-gray-800"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Wedding Gift</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>For those who want to give gift:</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>Mandiri a/n Ivan Daniel Andrianta - 1050020312512</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>BNI a/n Julia Ester Stepany - 0838461459</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
