import { redirect } from 'next/navigation'
import InvitePageClient from '@/components/InvitePageClient'

export default function InvitePage({ params }: { params: { slug: string } }) {
  const guestSlug = params.slug

  if (guestSlug === 'guest') {
    redirect('/guest')
  }

  return <InvitePageClient guestSlug={guestSlug} />
}
