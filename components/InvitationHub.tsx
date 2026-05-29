'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import HeroSection from './HeroSection'
import WeddingDetails from './WeddingDetails'
import GallerySection from './GallerySection'
import RSVPForm from './RSVPForm'

type SectionType = 'home' | 'details' | 'gallery' | 'rsvp'

interface InvitationHubProps {
  guestSlug: string
  guestData?: any
}

export default function InvitationHub({ guestSlug, guestData }: InvitationHubProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('home')

  const sections = {
    home: <HeroSection setActiveSection={setActiveSection} />,
    details: <WeddingDetails />,
    gallery: <GallerySection setActiveSection={(s) => setActiveSection(s as SectionType)} />,
    rsvp: <RSVPForm guestSlug={guestSlug} />,
  }

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col">
      {activeSection !== 'gallery' && (
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          guestData={guestData}
        />
      )}

      <main className="flex-1 w-full overflow-hidden">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {sections[activeSection]}
        </motion.div>
      </main>
    </div>
  )
}
