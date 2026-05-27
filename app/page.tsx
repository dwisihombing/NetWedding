'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function Home() {
  useEffect(() => {
    // Redirect directly to invitation page (skip login code)
    redirect('/invite/guest')
  }, [])

  return (
    <div className="h-screen w-full bg-netflix-black flex items-center justify-center">
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-netflix-red">Ivan & Julia</h1>
          <p className="mt-4 text-xl text-gray-400">Loading your experience...</p>
        </div>
      </main>
    </div>
  )
}
