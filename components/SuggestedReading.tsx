
'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Eye, Heart, ArrowRight } from 'lucide-react'
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

interface SuggestedReadingProps {
  suggestedBlogs: BlogPost[]
}

export default function SuggestedReading({ suggestedBlogs }: SuggestedReadingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (!suggestedBlogs || suggestedBlogs.length === 0) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full mb-4"
        >
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400 font-semibold">Suggested Reading</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          You Might Also Like
        </h2>
        <p className="text-gray-400">
          Discover more interesting articles and tutorials
        </p>
      </div>

      {/* Suggested Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedBlogs.map((blog, index) => (
          <motion.div
            key={blog.$id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative"
          >
            <Link href={`/blogs/${blog.slug}`} prefetch={true}>
              <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 h-full">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-xl" />
                </div>

                <div className="relative p-6 h-full flex flex-col">
                  {/* Featured Image */}
                  {blog.featuredImage && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <div className="relative w-full bg-gradient-to-br from-dark-700 to-dark-800 rounded-lg overflow-hidden" style={{ aspectRatio: '1200/600' }}>
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2 mb-3">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4 flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-dark-700/50 text-purple-400 text-xs rounded-md border border-dark-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="px-2 py-1 bg-dark-700/50 text-gray-500 text-xs rounded-md border border-dark-600">
                          +{blog.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime}m</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{blog.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                      <div className="text-gray-600">
                        {formatDate(blog.$createdAt)}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-end">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-lg font-medium group-hover:from-purple-400/20 group-hover:to-blue-400/20 transition-all duration-300">
                        <span className="text-sm">Read More</span>
                        <motion.div
                          animate={{ x: hoveredIndex === index ? 4 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full blur-sm" />
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/20 rounded-full blur-sm" />
    </motion.div>
  )
}
