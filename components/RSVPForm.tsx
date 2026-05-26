'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RSVPFormProps {
  guestSlug: string
}

export default function RSVPForm({ guestSlug }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'undecided' as 'confirmed' | 'declined' | 'undecided',
    groupSize: 1,
    dietaryRestrictions: '',
    message: '',
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
      // Simulate API call to Supabase
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitMessage('Thank you! Your RSVP has been received.')
      setFormData({
        name: '',
        email: '',
        attendance: 'undecided',
        groupSize: 1,
        dietaryRestrictions: '',
        message: '',
      })

      setTimeout(() => setSubmitMessage(''), 3000)
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.')
      setTimeout(() => setSubmitMessage(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-netflix-black py-20 md:py-32">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-white mb-4 text-center"
        >
          RSVP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-400 mb-12"
        >
          Please let us know if you can join us
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Will you attend?
            </label>
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
            >
              <option value="undecided">Not sure yet</option>
              <option value="confirmed">Yes, I'll be there!</option>
              <option value="declined">Sorry, can't make it</option>
            </select>
          </div>

          {/* Group Size */}
          {formData.attendance === 'confirmed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                How many guests?
              </label>
              <input
                type="number"
                name="groupSize"
                min="1"
                max="5"
                value={formData.groupSize}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
              />
            </motion.div>
          )}

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Dietary Restrictions (optional)
            </label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors"
              placeholder="e.g., vegetarian, gluten-free"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Message for the couple (optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none transition-colors resize-none"
              placeholder="Share your wishes and congratulations..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full py-3 bg-netflix-red hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </motion.button>

          {/* Message */}
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded text-center ${
                submitMessage.includes('Thank')
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
