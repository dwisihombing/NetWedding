'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WhoIsWatching from '@/components/WhoIsWatching'

export default function LoginPage() {
  const router = useRouter()
  const [guestCode, setGuestCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [stage, setStage] = useState<'code' | 'watching'>('code')

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate guest code - in a real app, you'd check against Supabase
      if (guestCode.length < 4) {
        setError('Invalid guest code. Please try again.')
        setIsLoading(false)
        return
      }

      // Store the guest code
      localStorage.setItem('guestSlug', guestCode)
      setStage('watching')
    } catch (err) {
      setError('Failed to validate guest code')
      setIsLoading(false)
    }
  }

  const handleWatchingSelect = () => {
    router.push(`/invite/${guestCode}`)
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {stage === 'code' ? (
        <div className="h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-netflix-red mb-4">NetWedding</h1>
              <p className="text-gray-400 text-lg">Enter your guest code to begin</p>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={guestCode}
                  onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                  placeholder="Enter your 6-digit code"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  maxLength={6}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900 text-red-100 rounded text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || guestCode.length < 4}
                className="w-full py-3 bg-netflix-red hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded transition-colors"
              >
                {isLoading ? 'Validating...' : 'Continue'}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-8">
              Enter the 6-digit code from your invitation
            </p>
          </div>
        </div>
      ) : (
        <WhoIsWatching onSelect={handleWatchingSelect} guestCode={guestCode} />
      )}
    </div>
  )
}
