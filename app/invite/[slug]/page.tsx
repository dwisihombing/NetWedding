'use client'

import { useParams } from 'next/navigation'
import OpeningCinematic from '@/components/OpeningCinematic'
import InvitationHub from '@/components/InvitationHub'
import WhoIsWatching from '@/components/WhoIsWatching'
import { useState, useEffect } from 'react'

export default function InvitePage() {
  const params = useParams()
  const guestSlug = params.slug as string
  const [stage, setStage] = useState<'profile' | 'cinema' | 'main'>('profile')
  const [guestData, setGuestData] = useState<any>(null)

  useEffect(() => {
    // Fetch guest data
    fetch(`/api/guest?slug=${guestSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setGuestData(data)
        }
      })

    const watched = localStorage.getItem(`watched_${guestSlug}`)
    const profile = localStorage.getItem(`profile_${guestSlug}`)
    
    if (profile) {
      if (watched) {
        setStage('main')
      } else {
        setStage('cinema')
      }
    }
  }, [guestSlug])

  const handleProfileSelect = (profileName: string) => {
    localStorage.setItem(`profile_${guestSlug}`, profileName)
    setStage('cinema')
  }

  const handleCinematicComplete = () => {
    localStorage.setItem(`watched_${guestSlug}`, 'true')
    setStage('main')
  }

  if (stage === 'profile') {
    return (
      <WhoIsWatching 
        onSelect={(profileName) => handleProfileSelect(profileName)} 
        guestCode={guestSlug}
        guestData={guestData}
      />
    )
  }

  if (stage === 'cinema') {
    return <OpeningCinematic onComplete={handleCinematicComplete} />
  }

  return <InvitationHub guestSlug={guestSlug} guestData={guestData} />
}
