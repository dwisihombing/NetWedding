'use client'

import { motion } from 'framer-motion'

export default function WeddingDetails() {
  const ceremonyTime = process.env.NEXT_PUBLIC_CEREMONY_TIME || '14:00'
  const receptionTime = process.env.NEXT_PUBLIC_RECEPTION_TIME || '18:00'
  const location = process.env.NEXT_PUBLIC_WEDDING_LOCATION || 'Grand Hotel Ballroom'

  const details = [
    {
      title: 'Ceremony',
      time: ceremonyTime,
      description: 'Join us for the exchange of vows',
      icon: '💍',
    },
    {
      title: 'Reception',
      time: receptionTime,
      description: 'Celebration, dinner, and dancing',
      icon: '🎉',
    },
    {
      title: 'Location',
      time: location,
      description: 'Grand venue for our special day',
      icon: '📍',
    },
  ]

  return (
    <section className="min-h-screen bg-netflix-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
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
          <h3 className="text-2xl font-bold text-white mb-4">What to Expect</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>Elegant ceremony followed by cocktail hour</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>Gourmet dinner with carefully curated menu</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>Live entertainment and dancing until late</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-netflix-red">▸</span>
              <span>Photo opportunities throughout the evening</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
