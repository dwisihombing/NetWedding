'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface RSVPFormProps {
  guestSlug: string
}

export default function RSVPForm({ guestSlug }: RSVPFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'undecided' as 'matrimony' | 'reception' | 'both' | 'no' | 'undecided',
    groupSize: 1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'groupSize' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestSlug,
          name: formData.name,
          attendance: formData.attendance,
          groupSize: formData.groupSize,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || t('rsvp_error'))
      }

      setSubmitMessage(t('rsvp_success'))
      setFormData({
        name: '',
        attendance: 'undecided',
        groupSize: 1,
      })

      setTimeout(() => setSubmitMessage(''), 3000)
    } catch (error) {
      setSubmitMessage(t('rsvp_error'))
      setTimeout(() => setSubmitMessage(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isAttending = formData.attendance === 'matrimony' || formData.attendance === 'reception' || formData.attendance === 'both'

  return (
    <section className="min-h-screen relative py-20 md:py-32 overflow-y-auto">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/7-LOVE-TOKEN-scaled.jpg')" }}></div>
      <div className="absolute inset-0 bg-netflix-black/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-white mb-2 text-center"
        >
          {t('rsvp_title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center text-netflix-red italic font-semibold tracking-wide mb-3"
        >
          {t('rsvp_full')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-400 mb-12"
        >
          {t('rsvp_subtitle')}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900/50 p-8 rounded-xl border border-gray-800"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t('rsvp_name')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
              placeholder={t('rsvp_name_placeholder')}
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t('rsvp_attend_label')}
            </label>
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
            >
              <option value="undecided">{t('rsvp_attend_undecided')}</option>
              <option value="matrimony">{t('rsvp_attend_matrimony')}</option>
              <option value="reception">{t('rsvp_attend_reception')}</option>
              <option value="both">{t('rsvp_attend_both')}</option>
              <option value="no">{t('rsvp_attend_no')}</option>
            </select>
          </div>

          {/* Group Size */}
          {isAttending && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {t('rsvp_guests_label')}
              </label>
              <input
                type="number"
                name="groupSize"
                min="1"
                max="10"
                value={formData.groupSize}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || formData.attendance === 'undecided'}
            whileHover={{ scale: (isSubmitting || formData.attendance === 'undecided') ? 1 : 1.02 }}
            whileTap={{ scale: (isSubmitting || formData.attendance === 'undecided') ? 1 : 0.98 }}
            className="w-full py-3 bg-netflix-red hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded transition-colors mt-8"
          >
            {isSubmitting ? t('rsvp_submitting') : t('rsvp_submit')}
          </motion.button>

          {/* Message */}
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded text-center ${
                submitMessage === t('rsvp_success')
                  ? 'bg-green-900 text-green-100'
                  : 'bg-red-900 text-red-100'
              }`}
            >
              {submitMessage}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
