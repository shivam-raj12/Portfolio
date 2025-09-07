'use client'

import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {BookOpen, Calendar, Clock, Search, Filter, ArrowLeft, Eye, Heart} from 'lucide-react'
import Link from 'next/link'
import {getPublishedBlogs, type BlogPost, incrementBlogLikes, decrementBlogLikes} from '@/lib/appwrite'
import {checkIfLiked, markAsLiked, removeFromLiked} from '@/lib/blogUtils'

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTag, setSelectedTag] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setError(null)
                const blogsData = await getPublishedBlogs(50) // Get more blogs for the full page
                setBlogs(blogsData || [])
                setFilteredBlogs(blogsData || [])
            } catch (error) {
                console.error('Error fetching blogs:', error)
                setError('Failed to load blogs')
                setBlogs([])
                setFilteredBlogs([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    useEffect(() => {
        let filtered = blogs

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }

        // Filter by tag
        if (selectedTag) {
            filtered = filtered.filter(blog =>
                blog.tags.includes(selectedTag)
            )
        }

        setFilteredBlogs(filtered)
    }, [blogs, searchTerm, selectedTag])

    const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))


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
                setFilteredBlogs(prevBlogs =>
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
                setFilteredBlogs(prevBlogs =>
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (isLoading) {
        return (
            <div className="bg-dark-950">
                <div className="pt-8">
                    <div className="container-custom section-padding">
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div
                                    className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                                <p className="text-gray-400">Loading blogs...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-dark-950">
                <div className="pt-8">
                    <div className="container-custom section-padding">
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div
                                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-red-400"/>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Error Loading Blogs</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-6">
                                    {error}. Please try refreshing the page.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                                >
                                    Refresh Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-dark-950">
            <div className="pt-8">
                {/* Back Button and Search/Filter */}
                <section className="section-padding bg-dark-800/30">
                    <div className="container-custom">
                        {/* Back Button */}
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                            className="mb-8"
                        >
                            <Link
                                href="/"
                                className="group flex items-center space-x-3 text-white hover:text-primary-400 transition-all duration-300"
                            >
                                <div
                                    className="p-2 rounded-lg bg-dark-800/50 group-hover:bg-primary-500/20 transition-colors">
                                    <ArrowLeft className="w-5 h-5"/>
                                </div>
                                <span className="text-lg font-semibold">Back to Portfolio</span>
                            </Link>
                        </motion.div>

                        {/* Search and Filter */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                                    />
                                </div>

                                {/* Tag Filter */}
                                <div className="relative">
                                    <Filter
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                    <select
                                        value={selectedTag}
                                        onChange={(e) => setSelectedTag(e.target.value)}
                                        className="pl-10 pr-8 py-3 bg-dark-800 border border-dark-700 border-b-2 border-b-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:border-b-primary-500 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="">All Tags</option>
                                        {allTags.map(tag => (
                                            <option key={tag} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="section-padding">
                    <div className="container-custom">
                        {filteredBlogs.length === 0 ? (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                className="text-center py-16"
                            >
                                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4"/>
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">No blogs found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                            </motion.div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog, index) => (
                                    <motion.article
                                        key={blog.$id}
                                        initial={{opacity: 0, y: 30}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.5, delay: index * 0.1}}
                                        className="group"
                                    >
                                        <Link href={`/blogs/${blog.slug}`} prefetch={true}>
                                            <div
                                                className="bg-dark-800/50 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/30 transition-all duration-300 card-hover h-full flex flex-col">
                                                {/* Featured Image */}
                                                <div
                                                    className="relative w-full bg-gradient-to-br from-primary-900/20 to-accent-900/20 overflow-hidden"
                                                    style={{aspectRatio: '1200/600'}}>
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
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                handleLike(blog.$id)
                                                            }}
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

                                                {/* Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                                                        {blog.title}
                                                    </h2>

                                                    <p className="text-gray-500 text-xs mb-2">By Shivam Raj</p>

                                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                                                        {blog.excerpt}
                                                    </p>

                                                    {/* Tags */}
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
                                  +{blog.tags.length - 3}
                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Meta Info */}
                                                    <div
                                                        className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center space-x-1">
                                                                <Calendar className="w-3 h-3"/>
                                                                <span>{formatDate(blog.$createdAt)}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="w-3 h-3"/>
                                                                <span>{blog.readTime} min read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}