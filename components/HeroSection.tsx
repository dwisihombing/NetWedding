'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  const weddingDate = process.env.NEXT_PUBLIC_WEDDING_DATE || '2024-12-25'
  const weddingLocation = process.env.NEXT_PUBLIC_WEDDING_LOCATION || 'Grand Hotel Ballroom'
  const firstCoupleName = process.env.NEXT_PUBLIC_COUPLE_FIRST_NAME || 'John'
  const secondCoupleName = process.env.NEXT_PUBLIC_COUPLE_SECOND_NAME || 'Jane'

  const calculateDaysUntil = () => {
    const wedding = new Date(weddingDate)
    const today = new Date()
    const diff = wedding.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const daysUntil = calculateDaysUntil()

  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-netflix-red/20 via-netflix-black to-netflix-black" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-lg">
            {firstCoupleName}
            <span className="block text-netflix-red my-4">&</span>
            {secondCoupleName}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            Are Getting Married!
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-netflix-red/10 border border-netflix-red/30 rounded-lg p-8 md:p-12 max-w-md mx-auto mb-12"
          >
            <div className="text-4xl md:text-5xl font-black text-netflix-red mb-2">
              {daysUntil} Days
            </div>
            <p className="text-gray-300">until the big day</p>
          </motion.div>

          {/* Date and Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl text-gray-400">
              {new Date(weddingDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-lg md:text-xl text-gray-400">{weddingLocation}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
