'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function GuestManager() {
  const [guests, setGuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '', name: '' })
  const [toast, setToast] = useState('')
  
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
      
      if (name === 'name') {
        const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        setFormData(prev => ({ ...prev, unique_slug: generatedSlug }))
      }
    }
  }

  const getInviteMessage = (guest: any) => {
    const inviteUrl = `https://ivanpany.vercel.app/invite/${guest.unique_slug}`
    return `Dear ${guest.name},\n\nWith great joy, we invite you to celebrate our wedding 💍✨\nIt would mean so much for us if you could join, share your prayers, and give us your blessings.\nApologies that we can only send this invitation through a message 🙏\n\n${inviteUrl}\n\nWith love,\nIvan & Julia 🤍`
  }

  const sendWhatsApp = (guest: any) => {
    let phoneStr = guest.phone.replace(/\D/g, '')
    if (phoneStr.startsWith('0')) {
      phoneStr = '62' + phoneStr.substring(1)
    }
    
    const message = getInviteMessage(guest)
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

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Daftar Tamu</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola dan kirim undangan kepada tamu pernikahan.</p>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm transition-colors">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Undangan</p>
          <p className="text-3xl font-black text-gray-800 dark:text-white">{guests.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-900/50 p-5 rounded-xl shadow-sm transition-colors">
          <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Hadir</p>
          <p className="text-3xl font-black text-green-700 dark:text-green-300">{guests.filter(g => g.rsvp_status === 'confirmed').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/50 p-5 rounded-xl shadow-sm transition-colors">
          <p className="text-red-500 dark:text-red-400 text-sm font-medium mb-1">Tidak Hadir</p>
          <p className="text-3xl font-black text-red-600 dark:text-red-300">{guests.filter(g => g.rsvp_status === 'declined').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-yellow-200 dark:border-yellow-900/50 p-5 rounded-xl shadow-sm transition-colors">
          <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-1">Menunggu</p>
          <p className="text-3xl font-black text-yellow-600 dark:text-yellow-300">{guests.filter(g => g.rsvp_status === 'pending').length}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Form Card (Left Column) */}
        <div className="w-full lg:w-1/3 xl:w-[30%] bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden p-6 lg:sticky lg:top-24 transition-colors">
          <h2 className="text-lg font-bold mb-6 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">Tambah Tamu Baru</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Tamu</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="block w-full rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400 transition-colors" placeholder="Masukkan nama..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kode Unik URL (Otomatis)</label>
              <input type="text" name="unique_slug" value={formData.unique_slug} onChange={handleInputChange} required className="block w-full rounded-lg bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 sm:text-sm p-3 border focus:outline-none transition-colors" placeholder="misal: budi-santoso" />
            </div>
            {!formData.is_group && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username Instagram (Profil)</label>
                <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} className="block w-full rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400 transition-colors" placeholder="tanpa @" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Telepon (WhatsApp)</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="block w-full rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400 transition-colors" placeholder="Contoh: 08123456789" />
            </div>
            <div className="flex items-center mt-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
              <input type="checkbox" name="is_group" checked={formData.is_group} onChange={handleInputChange} className="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" />
              <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tamu ini adalah sebuah Grup / Keluarga
              </label>
            </div>
            {!formData.is_group && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Kelamin</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="block w-full rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border transition-colors">
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            )}
            <div className="pt-4 mt-2">
              <button type="submit" disabled={submitting} className="w-full flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all">
                {submitting ? 'Menyimpan...' : 'Tambah Tamu'}
              </button>
            </div>
          </form>
        </div>

        {/* Table Card (Right Column) */}
        <div className="w-full lg:w-2/3 xl:w-[70%] bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-gray-800">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Daftar Undangan</h2>
            <div className="w-full sm:w-72 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Cari nama atau slug..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              />
            </div>
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Slug URL</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Instagram</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipe</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status RSVP</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.unique_slug.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-gray-800">Belum ada data tamu yang ditemukan.</td>
                    </tr>
                  ) : (
                    guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.unique_slug.toLowerCase().includes(searchQuery.toLowerCase())).map((guest: any) => (
                      <tr key={guest.id} className="hover:bg-blue-50/30 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">{guest.unique_slug}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{guest.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{guest.instagram ? `@${guest.instagram}` : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {guest.is_group ? (
                            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-2 py-1 rounded-md text-xs font-bold">Grup</span>
                          ) : (
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded-md text-xs font-bold">Individu</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                            guest.rsvp_status === 'confirmed' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 
                            guest.rsvp_status === 'declined' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : 
                            'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                          }`}>
                            {guest.rsvp_status === 'confirmed' ? 'Hadir' : guest.rsvp_status === 'declined' ? 'Tidak Hadir' : 'Menunggu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => sendWhatsApp(guest)}
                              title="Kirim WhatsApp"
                              className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 p-2 rounded-lg transition-colors border border-green-200 dark:border-green-800"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                            </button>
                            <button 
                              onClick={() => copyLink(guest)}
                              title="Salin Link"
                              className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 p-2 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            </button>
                            <button 
                              onClick={() => handleDelete(guest.id, guest.name)}
                              title="Hapus Tamu"
                              className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 p-2 rounded-lg transition-colors border border-red-200 dark:border-red-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm text-center transform transition-all border border-gray-100 dark:border-gray-800">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hapus Tamu?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Anda yakin ingin menghapus <strong>{deleteModal.name}</strong> dari daftar tamu? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
                className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors w-full"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors w-full"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 dark:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-gray-700">
          <div className="bg-green-500 rounded-full p-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}
    </>
  )
}
