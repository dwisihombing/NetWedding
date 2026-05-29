'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [guestCode, setGuestCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (guestCode.trim()) {
      setIsLoading(true)
      router.push(`/invite/${guestCode.trim()}`)
    }
  }

  return (
    <div className="min-h-screen w-full bg-netflix-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-netflix-red mb-2">Ivan & Julia</h1>
          <p className="text-lg text-gray-300">Undangan Pernikahan Digital</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Selamat Datang</h2>
          <p className="text-gray-400 mb-6 text-sm">Masukkan kode undangan Anda untuk melanjutkan</p>

          <div className="mb-6">
            <label htmlFor="guestCode" className="block text-sm font-medium text-gray-300 mb-2">
              Kode Undangan
            </label>
            <input
              id="guestCode"
              type="text"
              value={guestCode}
              onChange={(e) => setGuestCode(e.target.value)}
              placeholder="Contoh: guest atau nama_anda"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-netflix-red focus:ring-2 focus:ring-netflix-red/20 transition-colors"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!guestCode.trim() || isLoading}
            className="w-full bg-netflix-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            {isLoading ? 'Membuka...' : 'Buka Undangan'}
          </button>

          <p className="text-gray-500 text-xs text-center mt-6">
            Gunakan kode undangan dari undangan yang Anda terima
          </p>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">Dengan penuh kasih sayang,</p>
          <p className="text-netflix-red font-bold text-lg mt-1">Ivan & Julia</p>
        </div>
      </div>
    </div>
  )
}
