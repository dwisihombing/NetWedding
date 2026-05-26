'use client'

import { motion } from 'framer-motion'

export default function GallerySection() {
  const galleryItems = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: `Wedding Moment ${i + 1}`,
    placeholder: `#${(i + 1) * 2}`,
  }))

  return (
    <section className="min-h-screen bg-netflix-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-white mb-16 text-center"
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="netflix-card"
            >
              <div className="relative h-64 bg-gradient-to-br from-netflix-red/20 to-gray-900 rounded-lg overflow-hidden group cursor-pointer border border-gray-800 hover:border-netflix-red transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-netflix-red/30 mb-2">
                      {item.placeholder}
                    </div>
                    <p className="text-gray-500 group-hover:text-white transition-colors">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* Play button on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-netflix-red/80 hover:bg-netflix-red flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-gray-400 mt-12"
        >
          Gallery coming soon with your wedding photos!
        </motion.p>
      </div>
    </section>
  )
}
