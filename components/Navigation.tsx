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
    { id: 'home', label: t('nav_home'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'details', label: t('nav_details'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'gallery', label: t('nav_gallery'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'rsvp', label: t('nav_rsvp'), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ]

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex items-center justify-between px-4 md:px-12 py-4 ${isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setActiveSection('home')}
          className="text-2xl md:text-3xl font-black text-netflix-red cursor-pointer hover:opacity-80 transition-opacity"
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

    {/* Mobile Bottom Navigation */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-center py-2 px-2 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => (
        <button
          key={`mobile-${item.id}`}
          onClick={() => setActiveSection(item.id)}
          className={`flex flex-col items-center justify-center p-2 transition-colors ${
            activeSection === item.id 
              ? 'text-white' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <div className={`mb-1 transition-transform ${activeSection === item.id ? 'scale-110 text-white' : ''}`}>
             {item.icon}
          </div>
          <span className={`text-[10px] ${activeSection === item.id ? 'font-bold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
    </>
  )
}
