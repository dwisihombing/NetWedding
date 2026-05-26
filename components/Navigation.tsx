'use client'

import { motion } from 'framer-motion'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: any) => void
}

export default function Navigation({
  activeSection,
  setActiveSection,
}: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'details', label: 'Details' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'rsvp', label: 'RSVP' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-netflix-black via-netflix-black to-transparent px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-black text-netflix-red"
        >
          NetWedding
        </motion.h1>

        <div className="flex gap-2 md:gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="relative px-3 md:px-4 py-2 text-sm md:text-base font-semibold text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-netflix-red"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  )
}
