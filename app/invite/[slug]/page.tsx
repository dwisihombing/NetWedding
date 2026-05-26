'use client'

import { useParams } from 'next/navigation'
import OpeningCinematic from '@/components/OpeningCinematic'
import InvitationHub from '@/components/InvitationHub'
import { useState, useEffect } from 'react'

export default function InvitePage() {
  const params = useParams()
  const guestSlug = params.slug as string
  const [hasWatched, setHasWatched] = useState(false)

  useEffect(() => {
    const watched = localStorage.getItem(`watched_${guestSlug}`)
    setHasWatched(!!watched)
  }, [guestSlug])

  const handleCinematicComplete = () => {
    localStorage.setItem(`watched_${guestSlug}`, 'true')
    setHasWatched(true)
  }

  if (!hasWatched) {
    return <OpeningCinematic onComplete={handleCinematicComplete} guestSlug={guestSlug} />
  }

  return <InvitationHub guestSlug={guestSlug} />
}
