'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function AudioPlayer() {
  const pathname = usePathname()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  // When the Gallery section is open it owns its own audio track and we mute
  // this background track. Tracked via window-level CustomEvents.
  const [galleryActive, setGalleryActive] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleInteract = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        setIsPlaying(true)
      }
    }

    document.addEventListener('click', handleInteract)
    document.addEventListener('touchstart', handleInteract)
    document.addEventListener('touchmove', handleInteract)
    document.addEventListener('wheel', handleInteract)
    window.addEventListener('scroll', handleInteract, { passive: true })

    return () => {
      document.removeEventListener('click', handleInteract)
      document.removeEventListener('touchstart', handleInteract)
      document.removeEventListener('touchmove', handleInteract)
      document.removeEventListener('wheel', handleInteract)
      window.removeEventListener('scroll', handleInteract)
    }
  }, [hasInteracted])

  // Listen for Gallery mount / unmount events
  useEffect(() => {
    const onActive = () => setGalleryActive(true)
    const onInactive = () => setGalleryActive(false)
    window.addEventListener('gallery:active', onActive)
    window.addEventListener('gallery:inactive', onInactive)
    return () => {
      window.removeEventListener('gallery:active', onActive)
      window.removeEventListener('gallery:inactive', onInactive)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    // Pause this background track whenever Gallery is showing.
    if (galleryActive) {
      audioRef.current.pause()
      return
    }
    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Audio playback blocked by browser:", e)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, galleryActive])

  // Attempt autoplay on mount
  useEffect(() => {
    if (audioRef.current && !galleryActive) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setHasInteracted(true)
      }).catch(() => {
        // Autoplay waiting for interaction
      })
    }
    // We intentionally only run this on mount; subsequent state shifts are
    // handled by the effect above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the global interaction listener if clicked directly
    setIsPlaying(!isPlaying)
  }

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/parhobas') || pathname?.startsWith('/login')) {
    return null
  }

  // Hide the floating button while the Gallery is active (Gallery has its own controls)
  if (galleryActive) return null

  return (
    <>
      <audio
        ref={audioRef}
        src="/backsound/Westlife - I Wanna Grow Old with You (Official Audio).mp3"
        loop
      />
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={togglePlay}
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 p-3 bg-netflix-black/90 rounded-full border border-white/20 text-white hover:bg-gray-800 transition-colors shadow-2xl backdrop-blur-2xl"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.657 6.343a8 8 0 010 11.314M11 19L6 15H2V9h4l5-4v14z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </motion.button>
    </>
  )
}
