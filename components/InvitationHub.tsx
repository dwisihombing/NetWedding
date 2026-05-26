'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import HeroSection from './HeroSection'
import WeddingDetails from './WeddingDetails'
import GallerySection from './GallerySection'
import RSVPForm from './RSVPForm'

interface InvitationHubProps {
  guestSlug: string
}

type SectionType = 'home' | 'details' | 'gallery' | 'rsvp'

export default function InvitationHub({ guestSlug }: InvitationHubProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('home')

  const sections = {
    home: <HeroSection />,
    details: <WeddingDetails />,
    gallery: <GallerySection />,
    rsvp: <RSVPForm guestSlug={guestSlug} />,
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="pt-20 md:pt-24">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {sections[activeSection]}
        </motion.div>
      </main>
    </div>
  )
}
