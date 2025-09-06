'use client'

import { motion } from 'framer-motion'
import { Heart, Code } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900/50 border-t border-white/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent-500/5 rounded-full blur-2xl" />
      </div>

      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main Copyright */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="w-5 h-5 text-primary-400" />
            <span className="text-gray-300 text-sm">
              © {currentYear} Shivam Raj. All rights reserved.
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-gray-500 text-xs mb-4">
            Built with passion for Android development
          </p>

          {/* Made with love */}
          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-red-400 fill-current" />
            </motion.div>
            <span>using Next.js, TypeScript & Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}