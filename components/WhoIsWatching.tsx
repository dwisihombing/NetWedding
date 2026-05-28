'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WhoIsWatchingProps {
  onSelect: (profileName: string) => void
  guestCode: string
  guestData?: any
}

export default function WhoIsWatching({ onSelect, guestData }: WhoIsWatchingProps) {
  const [selected, setSelected] = useState(false)

  // Generate dynamic profile data based on guestData
  const getGuestProfile = () => {
    if (!guestData) return { name: 'You', initial: 'Y', color: 'bg-blue-600', isGroup: false, avatar: null }
    
    const initial = guestData.name.charAt(0).toUpperCase()
    let avatar = (!guestData.is_group && guestData.instagram) ? `https://unavatar.io/instagram/${guestData.instagram}` : null
    
    // If no instagram avatar, generate a deterministic random avatar from assets based on gender
    if (!avatar && !guestData.is_group) {
      // Create a simple hash from the unique_slug to keep the avatar consistent across reloads
      const slug = guestData.unique_slug || guestData.name || 'guest';
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      // Calculate a number between 1 and 10
      const index = Math.abs(hash) % 10 + 1;
      const paddedIndex = index.toString().padStart(2, '0');
      
      const gender = guestData.gender || 'L';
      const folderPrefix = gender === 'P' ? 'avatar-wanita' : 'avatar-pria';
      
      avatar = `/avatars/${folderPrefix}-${paddedIndex}.png`;
    }
    
    return { name: guestData.name, initial, color: 'bg-netflix-red', isGroup: guestData.is_group, avatar }
  }

  const guestProfile = getGuestProfile()

  const profiles = [
    guestProfile,
  ]

  return (
    <div className="h-screen w-full bg-netflix-black flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-medium text-white mb-8 md:mb-12 text-center tracking-wide"
      >
        Who&apos;s Invited?
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
              setTimeout(() => onSelect(profile.name), 500)
            }}
            className={`cursor-pointer group transition-transform duration-300 ${
              selected ? 'pointer-events-none' : 'hover:scale-110'
            }`}
          >
            <div
              className={`w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-lg overflow-hidden ${profile.color} flex items-center justify-center text-6xl md:text-7xl font-bold text-white shadow-lg group-hover:shadow-netflix-red/50 transition-all duration-300 relative`}
            >
              {profile.isGroup ? (
                <svg className="w-20 h-20 md:w-24 md:h-24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              ) : profile.avatar ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <span className="hidden absolute inset-0 items-center justify-center text-6xl md:text-7xl font-bold">{profile.initial}</span>
                </div>
              ) : (
                profile.initial
              )}
            </div>
            <p className="text-center mt-4 md:mt-6 text-2xl md:text-3xl font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">
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
