'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Stylized bank badge logos (no external assets required)
function MandiriLogo() {
  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white shadow-md">
      <svg viewBox="0 0 120 60" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <text
          x="60"
          y="32"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="22"
          fill="#003D79"
          letterSpacing="-1"
        >
          mandiri
        </text>
        <path
          d="M20 42 Q60 52 100 42 L100 48 Q60 58 20 48 Z"
          fill="#FFCC00"
        />
      </svg>
    </div>
  )
}

function BNILogo() {
  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-[#F36C21] shadow-md">
      <div className="flex items-baseline gap-1">
        <span className="text-white font-black text-2xl tracking-tight">BNI</span>
        <span className="text-white/90 font-bold text-xs">46</span>
      </div>
    </div>
  )
}

function BankCard({
  logo,
  bankName,
  holder,
  account,
}: {
  logo: React.ReactNode
  bankName: string
  holder: string
  account: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-lg p-5 border border-white/10 hover:border-netflix-red/50 transition-all duration-300 shadow-lg">
      <div className="flex items-center gap-4 mb-3">
        {logo}
        <div>
          <p className="text-white font-bold text-lg leading-tight drop-shadow-md">{bankName}</p>
          <p className="text-gray-200 text-sm drop-shadow">a/n {holder}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 bg-gray-900/50 backdrop-blur-sm rounded-md px-4 py-3 border border-white/5">
        <span className="text-white font-mono tracking-wider text-sm md:text-base drop-shadow">
          {account}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold px-3 py-1.5 rounded bg-netflix-red hover:bg-red-700 text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function WeddingDetails() {
  const ceremonyTime =
    process.env.NEXT_PUBLIC_CEREMONY_TIME || 'Friday, 17 July 2026 - 09.00 WIB'
  const receptionTime =
    process.env.NEXT_PUBLIC_RECEPTION_TIME || 'Friday, 17 July 2026 - 12.00 WIB'
  const ceremonyLocation =
    process.env.NEXT_PUBLIC_CEREMONY_LOCATION || 'GBKP Runggun Sidikalang, Dairi'
  const receptionLocation =
    process.env.NEXT_PUBLIC_RECEPTION_LOCATION || 'Sopo Godang HKBP 1 Sidikalang, Dairi'

  const [openMaps, setOpenMaps] = useState<Set<string>>(new Set())

  const details = [
    {
      title: 'Holy Matrimony',
      time: ceremonyTime,
      description: ceremonyLocation,
      icon: '💍',
      mapQuery: 'GBKP Runggun Sidikalang'
    },
    {
      title: 'Wedding Reception',
      time: receptionTime,
      description: receptionLocation,
      icon: '🎉',
      mapQuery: 'Sopo Godang HKBP 1 Sidikalang'
    },
  ]

  const toggleMap = (title: string) => {
    setOpenMaps((prev) => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  return (
    <section className="min-h-screen relative py-20 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/2-SLIDE--scaled.jpg')" }}></div>
      <div className="absolute inset-0 bg-netflix-black/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Wedding Details
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onClick={() => toggleMap(detail.title)}
              className="bg-gray-900/30 backdrop-blur-md rounded-lg p-8 border border-white/10 hover:border-netflix-red/50 transition-all duration-300 netflix-card cursor-pointer group shadow-2xl"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left drop-shadow-lg">{detail.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{detail.title}</h3>
              <p className="text-netflix-red font-semibold mb-3 drop-shadow-md">{detail.time}</p>
              <p className="text-gray-100 mb-4 drop-shadow">{detail.description}</p>
              
              <div className={`flex items-center text-sm font-bold text-white mb-4 py-2 px-4 rounded-md w-fit transition-colors backdrop-blur-sm ${
                openMaps.has(detail.title)
                  ? 'bg-netflix-red'
                  : 'bg-gray-800/40 group-hover:bg-netflix-red border border-white/10'
              }`}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {openMaps.has(detail.title) ? 'Tutup Peta' : 'Lihat Peta'}
              </div>

              <AnimatePresence>
                {openMaps.has(detail.title) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-lg mt-4"
                  >
                    <iframe 
                      width="100%" 
                      height="250" 
                      style={{border:0}} 
                      loading="lazy" 
                      allowFullScreen 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(detail.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto bg-gray-900/30 backdrop-blur-md rounded-lg p-8 border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Wedding Gift</h3>
          <p className="text-gray-100 mb-6 drop-shadow">
            For those who want to give gift, you can transfer to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BankCard
              logo={<MandiriLogo />}
              bankName="Mandiri"
              holder="Ivan Daniel Andrianta"
              account="1050020312512"
            />
            <BankCard
              logo={<BNILogo />}
              bankName="BNI"
              holder="Julia Ester Stepany"
              account="0838461459"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
