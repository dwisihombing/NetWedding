'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

interface GallerySectionProps {
  setActiveSection?: (section: string) => void
}

type Slide = { id: string; title: string; imageUrl: string }

// Verses cycle in the bottom-left quote slot, swapping every 3 photo slides.
const VERSES = [
  {
    text: 'So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.',
    ref: 'Matthew 19:6',
  },
  {
    text: 'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.',
    ref: 'Ecclesiastes 4:9-10',
  },
] as const

// Deterministic Fisher-Yates shuffle
function seededShuffle<T>(input: T[], seed: number): T[] {
  const arr = [...input]
  let s = seed || 1
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const SLIDE_DURATION = 4 // seconds per photo
const TICK_MS = 100

export default function GallerySection({ setActiveSection }: GallerySectionProps) {
  const [galleryItems, setGalleryItems] = useState<
    Array<{ id: string; title: string; imageUrl: string }>
  >([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Gallery owns audio while open, so global audio player can pause itself.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('gallery:active'))
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('gallery:inactive'))
      }
    }
  }, [])

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) return
        const payload = await response.json()
        setGalleryItems(payload.images || [])
      } catch {
        setGalleryItems([])
      }
    }
    loadGallery()
  }, [])

  // Compose slide list: each photo x3, shuffled, no back-to-back duplicates.
  const slides: Slide[] = useMemo(() => {
    if (galleryItems.length === 0) return []

    const repeated: typeof galleryItems = []
    for (let r = 0; r < 3; r++) repeated.push(...galleryItems)

    const shuffled = seededShuffle(repeated, 17)
    for (let i = 1; i < shuffled.length; i++) {
      if (shuffled[i].id === shuffled[i - 1].id) {
        for (let j = i + 1; j < shuffled.length; j++) {
          if (
            shuffled[j].id !== shuffled[i - 1].id &&
            (i + 1 >= shuffled.length || shuffled[j].id !== shuffled[i + 1]?.id)
          ) {
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            break
          }
        }
      }
    }

    return shuffled.map((img, idx) => ({
      id: `${img.id}-${idx}`,
      title: img.title,
      imageUrl: img.imageUrl,
    }))
  }, [galleryItems])

  // Pick which verse shows in the bottom-left slot — swap every 3 slides.
  const currentVerse = VERSES[Math.floor(activeIndex / 3) % VERSES.length]
  const totalDuration = slides.length * SLIDE_DURATION
  const elapsed = activeIndex * SLIDE_DURATION + progress * SLIDE_DURATION

  useEffect(() => {
    setActiveIndex(0)
    setProgress(0)
  }, [slides.length])

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + TICK_MS / 1000 / SLIDE_DURATION
        if (next >= 1) {
          setActiveIndex((i) => (i + 1) % slides.length)
          return 0
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(t)
  }, [isPlaying, slides.length])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume
      audioRef.current.muted = muted
    }
  }, [volume, muted])

  // Try autoplay for gallery soundtrack when entering gallery.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.play().catch(() => {
      // Browser may block autoplay until first user interaction.
    })
  }, [])

  const bumpControls = () => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 3500)
  }
  useEffect(() => {
    bumpControls()
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  const togglePlay = async () => {
    setIsPlaying((p) => !p)
    bumpControls()
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play()
      } catch {
        /* browser may block until user interacts */
      }
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const toggleMute = () => {
    setMuted((m) => !m)
    bumpControls()
  }

  const handleVolumeChange = (v: number) => {
    setVolume(v)
    if (v > 0) setMuted(false)
    bumpControls()
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const target = ratio * totalDuration
    const targetIndex = Math.min(
      Math.floor(target / SLIDE_DURATION),
      slides.length - 1
    )
    setActiveIndex(Math.max(0, targetIndex))
    setProgress((target - targetIndex * SLIDE_DURATION) / SLIDE_DURATION)
  }

  const goPrev = () => {
    setProgress(0)
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length)
    bumpControls()
  }
  const goNext = () => {
    setProgress(0)
    setActiveIndex((i) => (i + 1) % slides.length)
    bumpControls()
  }

  const currentSlide = slides[activeIndex]

  return (
    <section
      onMouseMove={bumpControls}
      onTouchStart={bumpControls}
      className="fixed inset-0 z-[100] bg-black overflow-hidden cursor-pointer"
    >
      <audio
        ref={audioRef}
        src="/backsound/I Prayed for You  A Beautiful Christian Wedding Song  Faithful Love Story Duet.mp3"
        loop
        preload="auto"
      />

      {/* Main slide */}
      <div className="absolute inset-0 w-full h-full" onClick={togglePlay}>
        <AnimatePresence mode="wait">
          {currentSlide ? (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 bg-cover bg-center md:bg-contain bg-no-repeat"
              style={{ backgroundImage: `url('${currentSlide.imageUrl}')` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <span className="text-gray-500">Loading gallery...</span>
            </div>
          )}
        </AnimatePresence>

        {/* Top + bottom gradients */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Top bar: back only */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-12 py-5"
          >
            {setActiveSection ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveSection('home')
                }}
                className="flex items-center gap-2 bg-black/40 hover:bg-netflix-red text-white px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </button>
            ) : (
              <span />
            )}

            <span />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verse quote (bottom-left) — alternates every 3 slides */}
      <div
        className="absolute left-4 md:left-12 bottom-28 md:bottom-32 z-20 max-w-md md:max-w-2xl pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={currentVerse.ref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="border-l-4 border-netflix-red pl-4"
          >
            <p className="text-white text-base md:text-xl italic font-light leading-relaxed drop-shadow-lg">
              &ldquo;{currentVerse.text}&rdquo;
            </p>
            <footer className="text-gray-300 text-xs md:text-sm mt-2 tracking-wider drop-shadow-md">
              — {currentVerse.ref} —
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Bottom Netflix-like player controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-12 pb-6 md:pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div
              onClick={handleSeek}
              className="group/seek relative h-1.5 hover:h-2.5 transition-all bg-white/20 rounded-full cursor-pointer mb-3"
            >
              <div
                className="absolute top-0 left-0 h-full bg-netflix-red rounded-full"
                style={{
                  width: `${
                    totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0
                  }%`,
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-netflix-red shadow-lg opacity-0 group-hover/seek:opacity-100 transition-opacity"
                style={{
                  left: `calc(${
                    totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0
                  }% - 7px)`,
                }}
              />
            </div>

            {/* Controls row */}
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 md:gap-5">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={goPrev}
                  aria-label="Previous"
                  className="text-white hover:text-gray-300 transition-colors hidden sm:block"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
                  </svg>
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next"
                  className="text-white hover:text-gray-300 transition-colors hidden sm:block"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
                  </svg>
                </button>

                <div
                  className="relative flex items-center"
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {muted || volume === 0 ? (
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 12L19 9.5l-1.5-1.5L15 10.5 12.5 8 11 9.5l2.5 2.5L11 14.5 12.5 16 15 13.5l2.5 2.5L19 14.5z" />
                        <path d="M3 9v6h4l5 5V4L7 9H3z" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.23v2.06a7 7 0 010 13.42v2.06A9 9 0 0014 3.23z" />
                      </svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {showVolume && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 96, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={muted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="ml-2 accent-netflix-red"
                        style={{ height: 4 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <span className="text-gray-300 text-xs md:text-sm font-medium tabular-nums hidden md:block">
                  {fmt(elapsed)} / {fmt(totalDuration)}
                </span>
              </div>

              <span className="absolute left-1/2 -translate-x-1/2 text-white font-black text-sm md:text-2xl tracking-[0.25em] pointer-events-none whitespace-nowrap">
                IVAN <span className="text-netflix-red">&</span> JULIA
              </span>

              <div className="w-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
