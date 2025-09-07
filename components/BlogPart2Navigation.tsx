'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Calendar, Clock, Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface BlogPost {
  $id: string
  title: string
  excerpt: string
  slug: string
  $createdAt: string
  readTime: number
  views: number
  likes: number
  tags: string[]
  featuredImage?: string
}

interface BlogPart2NavigationProps {
  relatedBlog: BlogPost | null
  currentPartNumber?: number
}

export default function BlogPart2Navigation({ relatedBlog, currentPartNumber = 1 }: BlogPart2NavigationProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (!relatedBlog) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Determine the next part number
  const nextPartNumber = currentPartNumber + 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-full mb-4"
        >
          <BookOpen className="w-5 h-5 text-primary-400" />
          <span className="text-primary-400 font-semibold">Continue Reading</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Part {nextPartNumber} Available
        </h2>
        <p className="text-gray-400">
          Continue your journey with the next part of this series
        </p>
      </div>

      {/* Part 2 Blog Card */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
      >
        <Link href={`/blogs/${relatedBlog.slug}`} prefetch={true}>
          <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-purple-500/10" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />
            </div>

            <div className="relative p-8">
              {/* Featured Image */}
              {relatedBlog.featuredImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6 rounded-xl overflow-hidden"
                >
                  <div className="relative w-full bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl overflow-hidden" style={{ aspectRatio: '1200/600' }}>
                    <img
                      src={relatedBlog.featuredImage}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Part Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-sm font-medium">Part {nextPartNumber}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Content */}
              <div className="space-y-4">
                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300 line-clamp-2"
                >
                  {relatedBlog.title}
                </motion.h3>

                {/* Excerpt */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-gray-400 line-clamp-3 leading-relaxed"
                >
                  {relatedBlog.excerpt}
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-wrap gap-2"
                >
                  {relatedBlog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-dark-700/50 text-primary-400 text-xs rounded-md border border-dark-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {relatedBlog.tags.length > 3 && (
                    <span className="px-2 py-1 bg-dark-700/50 text-gray-500 text-xs rounded-md border border-dark-600">
                      +{relatedBlog.tags.length - 3} more
                    </span>
                  )}
                </motion.div>

                {/* Meta Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-gray-500"
                >
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(relatedBlog.$createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{relatedBlog.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{relatedBlog.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{relatedBlog.likes} likes</span>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-6 flex justify-end"
              >
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-lg font-semibold group-hover:from-primary-400 group-hover:to-purple-400 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/25">
                  <span>Read Part {nextPartNumber}</span>
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </Link>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500/20 rounded-full blur-sm" />
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full blur-sm" />
    </motion.div>
  )
}
