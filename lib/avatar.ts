// Pick a deterministic avatar from a string seed (e.g. guest slug).
// Returns the same avatar for the same seed across refreshes.
function pickAvatarBySeed(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = (Math.abs(hash) % 10) + 1
  const paddedIndex = index.toString().padStart(2, '0')
  // Alternate genders by hash so we get a mix of both
  const folderPrefix = Math.abs(hash) % 2 === 0 ? 'avatar-pria' : 'avatar-wanita'
  return `/avatars/${folderPrefix}-${paddedIndex}.png`
}

// Shared helper: deterministic avatar resolver for a guest.
// `fallbackSeed` is used when guestData is missing (e.g. unknown slug)
// so the avatar is still stable per tamu rather than blank/random per render.
export function resolveGuestAvatar(
  guestData: any,
  fallbackSeed?: string
): {
  avatar: string | null
  fallbackAvatar: string | null
  initial: string
} {
  if (!guestData) {
    const seed = fallbackSeed || 'guest'
    const avatar = pickAvatarBySeed(seed)
    return { avatar, fallbackAvatar: avatar, initial: 'G' }
  }

  const initial = (guestData.name || 'G').charAt(0).toUpperCase()

  let localAvatar: string | null = null
  if (!guestData.is_group) {
    const slug = guestData.unique_slug || guestData.name || 'guest'
    let hash = 0
    for (let i = 0; i < slug.length; i++) {
      hash = slug.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = (Math.abs(hash) % 10) + 1
    const paddedIndex = index.toString().padStart(2, '0')

    const gender = (guestData.gender || 'L').toUpperCase()
    const folderPrefix = gender === 'P' ? 'avatar-wanita' : 'avatar-pria'

    localAvatar = `/avatars/${folderPrefix}-${paddedIndex}.png`
  }

  const avatar =
    !guestData.is_group && guestData.instagram
      ? `https://unavatar.io/instagram/${guestData.instagram}`
      : localAvatar

  return { avatar, fallbackAvatar: localAvatar, initial }
}


