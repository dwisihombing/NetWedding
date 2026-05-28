'use client'

import { useState } from 'react'

export default function AdminDashboardPage() {
  const [parhobasList, setParhobasList] = useState([
    { id: 1, name: 'Parhobas 1', email: 'parhobas1@netwedding.com', role: 'Parhobas', status: 'Aktif' },
    { id: 2, name: 'Parhobas 2', email: 'parhobas2@netwedding.com', role: 'Parhobas', status: 'Aktif' },
  ])
  
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Akun Parhobas</h1>
          <p className="text-gray-500 mt-1">Tambah, edit, atau hapus akses staf kepanitiaan (Parhobas).</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          {showAddForm ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Batal
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Tambah Parhobas
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Form Tambah Akun</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); alert('Fungsi ini membutuhkan integrasi dengan backend (Supabase). Email yang ditambahkan di sini akan langsung bisa Login dengan Google.'); setShowAddForm(false); }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" required className="block w-full rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400" placeholder="Nama staf" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Google / Gmail)</label>
              <input type="email" required className="block w-full rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400" placeholder="email@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="block w-full rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border">
                <option value="parhobas">Parhobas (Kelola Tamu)</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm">
                Daftarkan Akun
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Daftar Akun Staf</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {parhobasList.map((person) => (
                <tr key={person.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{person.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md text-xs font-bold">
                      {person.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold">
                      {person.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-200 font-medium text-xs">
                      Nonaktifkan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
