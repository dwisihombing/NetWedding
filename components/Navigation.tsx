'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: any) => void
}

export default function Navigation({
  activeSection,
  setActiveSection,
}: NavigationProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'details', label: t('nav_details') },
    { id: 'gallery', label: t('nav_gallery') },
    { id: 'rsvp', label: t('nav_rsvp') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex items-center justify-between px-4 md:px-12 py-4 ${isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-black text-netflix-red"
        >
          IvanJulia
        </motion.h1>

        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id 
                  ? 'text-white font-bold' 
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile menu could go here, for now just the language toggle */}
        <div className="flex items-center bg-transparent border border-gray-600 rounded-sm">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-xs font-bold transition-colors ${language === 'en' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('id')}
            className={`px-2 py-1 text-xs font-bold transition-colors ${language === 'id' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}
          >
            ID
          </button>
        </div>
      </div>
    </nav>
  )
}
