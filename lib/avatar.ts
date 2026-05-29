// Shared helper: deterministic avatar resolver for a guest
export function resolveGuestAvatar(guestData: any): {
  avatar: string | null
  fallbackAvatar: string | null
  initial: string
} {
  if (!guestData) {
    return { avatar: null, fallbackAvatar: null, initial: 'G' }
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
