'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WhoIsWatchingProps {
  onSelect: () => void
  guestCode: string
}

export default function WhoIsWatching({ onSelect }: WhoIsWatchingProps) {
  const [selected, setSelected] = useState(false)

  const profiles = [
    { name: 'You', initial: 'Y', color: 'bg-blue-600' },
    { name: '+Guest', initial: '+', color: 'bg-gray-600' },
  ]

  return (
    <div className="h-screen w-full bg-netflix-black flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold text-white mb-16"
      >
        Who's Watching?
      </motion.h1>

      <div className="flex gap-8 md:gap-12 flex-wrap justify-center mb-16">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => {
              setSelected(true)
              setTimeout(() => onSelect(), 500)
            }}
            className={`cursor-pointer group transition-transform duration-300 ${
              selected ? 'pointer-events-none' : 'hover:scale-110'
            }`}
          >
            <div
              className={`w-32 h-32 md:w-44 md:h-44 rounded-lg ${profile.color} flex items-center justify-center text-5xl md:text-7xl font-bold text-white shadow-lg group-hover:shadow-netflix-red/50 transition-all duration-300`}
            >
              {profile.initial}
            </div>
            <p className="text-center mt-4 text-gray-300 group-hover:text-white transition-colors">
              {profile.name}
            </p>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400"
        >
          Loading your invitation...
        </motion.div>
      )}
    </div>
  )
}
