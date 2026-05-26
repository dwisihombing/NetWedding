'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '', name: '' })
  const [toast, setToast] = useState('')
  const supabase = createClient()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    unique_slug: '',
    name: '',
    instagram: '',
    phone: '',
    gender: 'L',
    is_group: false
  })

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      const res = await fetch('/api/admin/guests')
      const data = await res.json()
      if (res.ok) {
        setGuests(data)
      } else {
        setError(data.error || 'Failed to fetch guests')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
      
      // Auto-generate slug from name if slug is empty or was auto-generated
      if (name === 'name') {
        const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        setFormData(prev => ({ ...prev, unique_slug: generatedSlug }))
      }
    }
  }

  const getInviteMessage = (guest: any) => {
    const inviteUrl = `https://ivanpany.vercel.app/invite/${guest.unique_slug}`
    return `Dear ${guest.name},\n\nWith great joy, we invite you to celebrate our wedding \uD83D\uDC8D\u2728\nIt would mean so much for us if you could join, share your prayers, and give us your blessings.\nApologies that we can only send this invitation through a message \uD83D\uDE4F\n\n${inviteUrl}\n\nWith love,\nIvan & Julia \uD83E\uDD0D`
  }

  const sendWhatsApp = (guest: any) => {
    // Format phone number to start with 62
    let phoneStr = guest.phone.replace(/\D/g, '')
    if (phoneStr.startsWith('0')) {
      phoneStr = '62' + phoneStr.substring(1)
    }
    
    const message = getInviteMessage(guest)
    
    // Bypass wa.me redirect based on device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const waUrl = isMobile 
      ? `whatsapp://send?phone=${phoneStr}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneStr}&text=${encodeURIComponent(message)}`
      
    window.open(waUrl, '_blank')
  }

  const copyLink = (guest: any) => {
    const message = getInviteMessage(guest)
    navigator.clipboard.writeText(message)
    setToast('Pesan undangan berhasil disalin!')
    setTimeout(() => setToast(''), 3000)
  }

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name })
  }

  const confirmDelete = async () => {
    const { id } = deleteModal
    setDeleteModal({ isOpen: false, id: '', name: '' })
    
    try {
      const res = await fetch(`/api/admin/guests/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchGuests()
      } else {
        const data = await res.json()
        setError(data.error || 'Gagal menghapus tamu')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
        // Reset form and refresh list
        setFormData({ unique_slug: '', name: '', instagram: '', phone: '', gender: 'L', is_group: false })
        fetchGuests()
      } else {
        setError(data.error || 'Failed to add guest')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-netflix-black py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-netflix-red">Kelola Daftar Tamu</h1>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Sign Out
          </button>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg">
            <p className="text-gray-400 text-sm font-medium mb-1">Total Undangan</p>
            <p className="text-3xl font-black text-white">{guests.length}</p>
          </div>
          <div className="bg-gray-900 border border-green-900/50 p-4 rounded-xl shadow-lg">
            <p className="text-gray-400 text-sm font-medium mb-1">Hadir</p>
            <p className="text-3xl font-black text-green-400">{guests.filter(g => g.rsvp_status === 'confirmed').length}</p>
          </div>
          <div className="bg-gray-900 border border-red-900/50 p-4 rounded-xl shadow-lg">
            <p className="text-gray-400 text-sm font-medium mb-1">Tidak Hadir</p>
            <p className="text-3xl font-black text-red-400">{guests.filter(g => g.rsvp_status === 'declined').length}</p>
          </div>
          <div className="bg-gray-900 border border-yellow-900/50 p-4 rounded-xl shadow-lg">
            <p className="text-gray-400 text-sm font-medium mb-1">Menunggu</p>
            <p className="text-3xl font-black text-yellow-400">{guests.filter(g => g.rsvp_status === 'pending').length}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-netflix-red text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Form Card (Left Column) */}
          <div className="w-full lg:w-1/4 xl:w-[30%] bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6 text-white">Tambah Tamu Baru</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Nama Tamu</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-netflix-red focus:ring-netflix-red sm:text-sm p-2.5 border placeholder-gray-500" placeholder="Masukkan nama..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Kode Unik URL (Otomatis)</label>
              <input type="text" name="unique_slug" value={formData.unique_slug} onChange={handleInputChange} required className="mt-1 block w-full rounded-md bg-gray-900 border-gray-800 text-gray-400 shadow-sm sm:text-sm p-2.5 border" placeholder="misal: budi-santoso" />
            </div>
            {!formData.is_group && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Username Instagram (Untuk Foto Profil)</label>
                <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-netflix-red focus:ring-netflix-red sm:text-sm p-2.5 border placeholder-gray-500" placeholder="tanpa @" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300">Nomor Telepon (WhatsApp)</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-netflix-red focus:ring-netflix-red sm:text-sm p-2.5 border placeholder-gray-500" placeholder="Contoh: 08123456789" />
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" name="is_group" checked={formData.is_group} onChange={handleInputChange} className="h-5 w-5 text-netflix-red bg-gray-800 border-gray-700 rounded focus:ring-netflix-red focus:ring-offset-gray-900" />
              <label className="ml-3 block text-sm font-medium text-gray-200">
                Tamu ini adalah sebuah Grup / Keluarga
              </label>
            </div>
            {!formData.is_group && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Jenis Kelamin</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-netflix-red focus:ring-netflix-red sm:text-sm p-2.5 border">
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            )}
            <div className="flex justify-end pt-6 border-t border-gray-800 mt-2">
              <button type="submit" disabled={submitting} className="inline-flex justify-center w-full py-3 px-6 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-netflix-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-netflix-red focus:ring-offset-gray-900 disabled:opacity-50 transition-colors">
                {submitting ? 'Menyimpan...' : 'Tambah Tamu'}
              </button>
            </div>
          </form>
        </div>

        {/* Table Card (Right Column) */}
        <div className="w-full lg:w-3/4 xl:w-[70%] bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-white">Daftar Tamu</h2>
            <div className="w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Cari nama atau slug..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 text-white text-sm rounded-md focus:border-netflix-red focus:ring-netflix-red p-2"
              />
            </div>
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Memuat data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Slug URL</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Instagram</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Tipe</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status RSVP</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.unique_slug.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">Belum ada data tamu yang tersimpan atau ditemukan.</td>
                    </tr>
                  ) : (
                    guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.unique_slug.toLowerCase().includes(searchQuery.toLowerCase())).map((guest: any) => (
                      <tr key={guest.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{guest.unique_slug}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">{guest.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{guest.instagram ? `@${guest.instagram}` : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {guest.is_group ? (
                            <span className="bg-netflix-red/20 text-netflix-red border border-netflix-red/30 px-2 py-1 rounded text-xs font-bold">Grup</span>
                          ) : (
                            <span className="bg-gray-800 text-gray-300 border border-gray-700 px-2 py-1 rounded text-xs font-bold">Individu</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                            guest.rsvp_status === 'confirmed' ? 'bg-green-900/40 text-green-400 border border-green-800/50' : 
                            guest.rsvp_status === 'declined' ? 'bg-red-900/40 text-red-400 border border-red-800/50' : 
                            'bg-yellow-900/40 text-yellow-400 border border-yellow-800/50'
                          }`}>
                            {guest.rsvp_status === 'confirmed' ? 'Hadir' : guest.rsvp_status === 'declined' ? 'Tidak Hadir' : 'Menunggu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => sendWhatsApp(guest)}
                              title="Kirim WhatsApp"
                              className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-md transition-colors shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                              </svg>
                            </button>
                            <button 
                              onClick={() => copyLink(guest)}
                              title="Salin Link"
                              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition-colors shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            </button>
                            <button 
                              onClick={() => handleDelete(guest.id, guest.name)}
                              title="Hapus Tamu"
                              className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-md transition-colors shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-netflix-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hapus Tamu?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Anda yakin ingin menghapus <strong>{deleteModal.name}</strong> dari daftar tamu? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-netflix-red hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-red-900/50"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-50 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}
    </div>
  )
}
