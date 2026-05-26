'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already selected a profile
    const guestSlug = localStorage.getItem('guestSlug')
    if (guestSlug) {
      redirect(`/invite/${guestSlug}`)
    } else {
      // Redirect to landing page to enter guest code
      redirect('/login')
    }
  }, [])

  return (
    <div className="h-screen w-full bg-netflix-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <h1 className="text-4xl font-bold text-netflix-red">NetWedding</h1>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    </div>
  )
}
