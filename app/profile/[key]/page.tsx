'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

type ProfileKey = 'groom' | 'bride'

const profiles: Record<ProfileKey, {
  title: string
  name: string
  parents: string
  image: string
  accent: string
}> = {
  groom: {
    title: 'THE GROOM', 
    name: 'Ivan Daniel Andrianta Sitepu S.Si',
    parents: 'Son of Mr. Saut Maruli Sitepu & Mrs. Sri Julina Ginting',
    image: '/image/4.-GROOM-682x1024.jpeg',
  },
  bride: {
    title: 'THE BRIDE',
    name: 'Julia Ester Stepany Nababan S.K.M',
    parents: 'Daughter of Mr. Dumas Nababan & Mrs. Lisnauli Sitorus S.PAK., M.Pd',
    image: '/image/5.-BRIDE-750x1024.jpg'
  },
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const key = params.key as string
  const fromParam = searchParams?.get('from') || ''
  // Only allow internal paths to prevent open redirect
  const safeFrom = fromParam.startsWith('/') ? fromParam : ''

  const handleBack = () => {
    if (safeFrom) {
      router.push(safeFrom)
    } else {
      router.push('/')
    }
  }

  const handleSwitch = () => {
    const target = key === 'groom' ? 'bride' : 'groom'
    const suffix = safeFrom ? `?from=${encodeURIComponent(safeFrom)}` : ''
    router.push(`/profile/${target}${suffix}`)
  }

  if (key !== 'groom' && key !== 'bride') {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center text-gray-400">
        Profile not found.
      </div>
    )
  }

  const p = profiles[key as ProfileKey]

  return (
    <main className="min-h-screen bg-netflix-black text-white relative overflow-hidden">
      {/* Background image — brighter */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${p.image}')`,
          backgroundPosition: 'center 25%',
        }}
      />
      {/* Soft gradient overlay so text remains readable but image stays bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/85 via-netflix-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent" />

      {/* Back button — always returns to invitation home, not browser history */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-4 md:left-8 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm hover:bg-netflix-red transition-colors text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      {/* Content — anchored ~12.5% from the left on wider screens.
          Allow the headline up to ~75% of the viewport so long names fit on two lines. */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:pl-[12.5vw] md:pr-12 pb-20 pt-32 md:max-w-[75vw]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-netflix-red text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded w-fit mb-4 shadow-lg"
        >
          {p.title}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black drop-shadow-2xl leading-tight mb-3 whitespace-normal"
        >
          {p.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-netflix-red text-sm md:text-base font-semibold tracking-wide mb-4 drop-shadow-md"
        >
          {p.accent}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-gray-100 text-base md:text-lg leading-relaxed drop-shadow-lg">
            {p.parents}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <button
            onClick={handleSwitch}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            View {key === 'groom' ? 'The Bride' : 'The Groom'}
          </button>
        </motion.div>
      </div>
    </main>
  )
}
