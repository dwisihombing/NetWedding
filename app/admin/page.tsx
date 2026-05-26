'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    unique_slug: '',
    name: '',
    phone: '',
    gender: 'L',
    group_size: 1
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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        setFormData({ unique_slug: '', name: '', phone: '', gender: 'L', group_size: 1 })
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Kelola Daftar Tamu</h1>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Sign Out
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Tambah Tamu Baru</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kode Unik / Slug</label>
              <input type="text" name="unique_slug" value={formData.unique_slug} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="misal: ivan-julia" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Tamu</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jumlah Orang (Grup)</label>
              <input type="number" name="group_size" value={formData.group_size} onChange={handleInputChange} min="1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button type="submit" disabled={submitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                {submitting ? 'Menyimpan...' : 'Tambah Tamu'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Daftar Tamu</h2>
          </div>
          {loading ? (
            <div className="p-6 text-center text-gray-500">Memuat data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status RSVP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grup</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {guests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data tamu.</td>
                    </tr>
                  ) : (
                    guests.map((guest: any) => (
                      <tr key={guest.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{guest.unique_slug}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            guest.rsvp_status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            guest.rsvp_status === 'declined' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {guest.rsvp_status === 'confirmed' ? 'Hadir' : guest.rsvp_status === 'declined' ? 'Tidak Hadir' : 'Menunggu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.group_size}</td>
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
  )
}
