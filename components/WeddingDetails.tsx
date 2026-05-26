'use client'

import { motion } from 'framer-motion'

export default function WeddingDetails() {
  const ceremonyTime =
    process.env.NEXT_PUBLIC_CEREMONY_TIME || 'Friday, 17 July 2026 - 09.00 WIB'
  const receptionTime =
    process.env.NEXT_PUBLIC_RECEPTION_TIME || 'Friday, 17 July 2026 - 12.00 WIB'
  const ceremonyLocation =
    process.env.NEXT_PUBLIC_CEREMONY_LOCATION || 'GBKP Runggun Sidikalang, Dairi'
  const receptionLocation =
    process.env.NEXT_PUBLIC_RECEPTION_LOCATION || 'Sopo Godang HKBP 1 Sidikalang, Dairi'

  const details = [
    {
      title: 'Holy Matrimony',
      time: ceremonyTime,
      description: ceremonyLocation,
      icon: '💍',
    },
    {
      title: 'Wedding Reception',
      time: receptionTime,
      description: receptionLocation,
      icon: '🎉',
    },
    {
      title: 'Couple',
      time: 'IVAN & JULIA',
      description: 'Ivan Daniel Andrianta Sitepu S.Si & Julia Ester Stepany Nababan S.K.M',
      icon: '📍',
    },
  ]

  return (
    <section className="min-h-screen relative py-20 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/2-SLIDE--scaled.jpg')" }}></div>
      <div className="absolute inset-0 bg-netflix-black/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-white mb-16 text-center"
        >
          Wedding Details
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-netflix-red/50 transition-all duration-300 netflix-card"
            >
              <div className="text-5xl mb-4">{detail.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{detail.title}</h3>
              <p className="text-netflix-red font-semibold mb-3">{detail.time}</p>
              <p className="text-gray-400">{detail.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 bg-gray-900 rounded-lg p-8 border border-gray-800"
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
