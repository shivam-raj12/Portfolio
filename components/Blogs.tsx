'use client'

import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {BookOpen, Eye, Heart} from 'lucide-react'
import {getLatestBlogs, type BlogPost, incrementBlogLikes, decrementBlogLikes} from '@/lib/appwrite'
import {checkIfLiked, markAsLiked, removeFromLiked} from '@/lib/blogUtils'
import Link from 'next/link'

export default function Blogs() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setError(null)
                const blogsData = await getLatestBlogs(3)
                setBlogs(blogsData || [])
            } catch (error) {
                console.error('Error fetching blogs:', error)
                setError('Failed to load blogs')
                setBlogs([])
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])


    const handleLike = async (blogId: string) => {
        const isLiked = checkIfLiked(blogId)

        try {
            if (isLiked) {
                // Dislike (remove like)
                await decrementBlogLikes(blogId)
                removeFromLiked(blogId) // Remove from localStorage
                // Update local state to reflect the dislike
                setBlogs(prevBlogs =>
                    prevBlogs.map(blog =>
                        blog.$id === blogId
                            ? {...blog, likes: Math.max(0, blog.likes - 1)}
                            : blog
                    )
                )
            } else {
                // Like
                await incrementBlogLikes(blogId)
                markAsLiked(blogId) // Mark as liked in localStorage
                // Update local state to reflect the like
                setBlogs(prevBlogs =>
                    prevBlogs.map(blog =>
                        blog.$id === blogId
                            ? {...blog, likes: blog.likes + 1}
                            : blog
                    )
                )
            }
        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }

    return (
        <section id="blogs" className="section-padding bg-dark-800/30">
            <div className="container-custom">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    viewport={{once: true}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        My <span className="gradient-text">Blogs</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Sharing my Android development journey through blogs and learnings about modern mobile
                        development.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i}
                                 className="bg-dark-800/50 rounded-xl overflow-hidden border border-dark-700 h-full flex flex-col animate-pulse">
                                <div className="h-48 bg-dark-700/50"/>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="h-6 bg-dark-700/50 rounded mb-2"/>
                                    <div className="h-4 bg-dark-700/50 rounded mb-4"/>
                                    <div className="h-4 bg-dark-700/50 rounded mb-4"/>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-6 w-16 bg-dark-700/50 rounded"/>
                                        <div className="h-6 w-20 bg-dark-700/50 rounded"/>
                                    </div>
                                    <div className="h-10 bg-dark-700/50 rounded mt-auto"/>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <div
                            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-red-400"/>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Error Loading Blogs</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            {error}. Please try refreshing the page.
                        </p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <div
                            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-primary-400"/>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">No Blogs Available</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            I'm currently working on some amazing blog posts. Check back soon for new content!
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.$id}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true}}
                                className="group relative"
                            >
                                <div
                                    className="bg-dark-800/50 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/30 transition-all duration-300 card-hover h-full flex flex-col">
                                    <div
                                        className="relative h-48 bg-gradient-to-br from-primary-900/20 to-accent-900/20 overflow-hidden">
                                        {blog.featuredImage ? (
                                            <img
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none'
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center ${blog.featuredImage ? 'hidden' : ''}`}>
                                            <BookOpen className="w-16 h-16 text-primary-400 opacity-50"/>
                                        </div>
                                        <div
                                            className="absolute bottom-4 left-4 px-2 py-1 bg-dark-800/80 text-gray-300 text-xs rounded">
                                            {blog.readTime} min read
                                        </div>
                                        <div
                                            className="absolute bottom-4 right-4 flex items-center space-x-2 text-gray-300 text-xs">
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-3 h-3"/>
                                                <span>{blog.views}</span>
                                            </div>
                                            <button
                                                onClick={() => handleLike(blog.$id)}
                                                className={`flex items-center space-x-1 transition-colors ${
                                                    checkIfLiked(blog.$id)
                                                        ? 'text-red-400 hover:text-red-300'
                                                        : 'hover:text-red-400'
                                                }`}
                                                title={checkIfLiked(blog.$id) ? 'Click to unlike' : 'Click to like'}
                                            >
                                                <Heart
                                                    className={`w-3 h-3 ${checkIfLiked(blog.$id) ? 'fill-current' : ''}`}/>
                                                <span>{blog.likes}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-500 text-xs mb-2">By Shivam Raj</p>

                                        <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1">
                                            {blog.excerpt}
                                        </p>

                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                {blog.tags.slice(0, 3).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded text-xs text-primary-400"
                                                    >
                            {tag}
                          </span>
                                                ))}
                                                {blog.tags.length > 3 && (
                                                    <span
                                                        className="px-2 py-1 bg-gray-600/20 border border-gray-600/30 rounded text-xs text-gray-400">
                            +{blog.tags.length - 3} more
                          </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <Link
                                                href={`/blogs/${blog.slug}`}
                                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 hover:text-primary-300 rounded-lg transition-all duration-300 border border-primary-500/30"
                                            >
                                                <BookOpen className="w-4 h-4"/>
                                                <span className="text-sm">Read Article</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6}}
                    viewport={{once: true}}
                    className="text-center mt-16"
                >
                    <a
                        href="/blogs"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                    >
                        <BookOpen className="w-5 h-5"/>
                        <span>View All Blog Posts</span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}