'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface OpeningCinematicProps {
  onComplete: () => void
}

export default function OpeningCinematic({
  onComplete,
}: OpeningCinematicProps) {
  const [progress, setProgress] = useState(0)
  const coupleName = process.env.NEXT_PUBLIC_COUPLE_FIRST_NAME || 'IVAN'
  const coupleLastName = process.env.NEXT_PUBLIC_COUPLE_SECOND_NAME || 'JULIA'

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500) // Faster complete transition
          return 100
        }
        return prev + Math.random() * 25 // Faster increment
      })
    }, 200) // Faster interval

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="h-screen w-full bg-netflix-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background image effect */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/image/2-SLIDE--scaled.jpg')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-netflix-red/10 via-netflix-black/80 to-netflix-black">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-netflix-red via-transparent to-netflix-red"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-lg">
            {coupleName}
            <span className="block text-netflix-red">&</span>
            {coupleLastName}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-3xl text-gray-300 mb-12"
        >
          Coming Soon
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full max-w-xs mx-auto"
        >
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${Math.min(progress, 100)}%` }}
              className="h-full bg-netflix-red"
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-gray-500 text-sm mt-4">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>

        {/* Dramatic text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 70 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <p className="text-gray-400 text-lg md:text-2xl italic">
            Get ready for an unforgettable celebration
          </p>
        </motion.div>
      </div>

      {/* Netflix-style logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute bottom-8 left-8"
      >
        <p className="text-netflix-red text-3xl font-black">IvanJulia</p>
      </motion.div>
    </div>
  )
}
