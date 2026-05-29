 'use client'

import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PrayerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromParam = searchParams?.get('from') || ''
  const safeFrom = fromParam.startsWith('/') ? fromParam : ''

  const handleBack = () => {
    if (safeFrom) router.push(safeFrom)
    else router.push('/')
  }

  return (
    <main className="min-h-screen bg-netflix-black text-white relative overflow-hidden">
      {/* Background image with strong overlay so the prayer reads like a calm meditation screen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/7-LOVE-TOKEN-scaled.jpg')",
          backgroundPosition: 'center 30%',
        }}
      />
      <div className="absolute inset-0 bg-netflix-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-netflix-black/40" />

      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-4 md:left-8 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm hover:bg-netflix-red transition-colors text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-netflix-red text-white text-xs md:text-sm font-bold uppercase tracking-[0.4em] px-4 py-1.5 rounded mb-6 shadow-lg"
        >
          Doa
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl font-black mb-12 drop-shadow-2xl"
        >
          Doa Pernikahan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6 text-gray-100 text-base md:text-lg leading-relaxed font-light italic drop-shadow-md"
        >
          <p>
            Tuhan, kalau kami boleh bertemu, itu karena rencana-Mu. Kalau kami
            boleh melangkah bersama, itu karena Pertolongan-Mu. Kalau kami boleh
            menata hati membangun kasih dalam suka dan duka, itu karena kasih-Mu.
          </p>
          <p>
            Kalau kami akhirnya tiba dilembar awal hidup yang baru dan
            membangun masa depan berdua dalam ikatan kasih abadi, itu karena
            anugerah-Mu. Berkati kami ya Tuhan, agar setiap detik yang kami
            lalui, setiap langkah yang kami tempuh dan setiap detak jantung
            kami berdua dapat selalu seiring dan sejalan dengan kuasa-Mu.
          </p>
          <p className="text-white font-semibold not-italic tracking-wide pt-4">
            Terima Kasih Tuhan.
          </p>
          <p> Amin.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 w-24 h-[2px] bg-gradient-to-r from-transparent via-netflix-red to-transparent"
        />
      </div>
    </main>
  )
}
