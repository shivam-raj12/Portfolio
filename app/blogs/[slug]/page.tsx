'use client'

import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {BookOpen, Calendar, Clock, ArrowLeft, Share2, Heart, Eye} from 'lucide-react'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import BlogContentRenderer from '@/components/BlogContentRenderer'
import BlogPart2Navigation from '@/components/BlogPart2Navigation'
import SuggestedReading from '@/components/SuggestedReading'
import {
    getBlogBySlug,
    getBlogById,
    getBlogsByIds,
    type BlogPost,
    incrementBlogViews,
    incrementBlogLikes,
    decrementBlogLikes,
    parseBlogContent
} from '@/lib/appwrite'
import {checkIfLiked, markAsLiked, removeFromLiked} from '@/lib/blogUtils'

export default function BlogDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const [blog, setBlog] = useState<BlogPost | null>(null)
    const [relatedBlog, setRelatedBlog] = useState<BlogPost | null>(null)
    const [suggestedBlogs, setSuggestedBlogs] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showLikeAnimation, setShowLikeAnimation] = useState(false)


    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return

            try {
                setError(null)
                console.log('Fetching blog with slug:', slug)

                // Fetch main blog data first (this is critical for the page)
                const blogData = await getBlogBySlug(slug)
                console.log('Blog data received:', blogData)

                if (blogData) {
                    setBlog(blogData)
                    // Check if user has already liked this blog
                    setIsLiked(checkIfLiked(blogData.$id))

                    // Set loading to false immediately after main blog data is loaded
                    setIsLoading(false)

                    // Start parallel fetching of additional data (non-blocking)
                    const additionalDataPromises = []

                    // Add view increment (non-blocking)
                    additionalDataPromises.push(
                        incrementBlogViews(blogData.$id).catch(error =>
                            console.error('Error incrementing blog views:', error)
                        )
                    )

                    // Add related blog fetch (non-blocking)
                    if (blogData.relatedBlog) {
                        additionalDataPromises.push(
                            getBlogById(blogData.relatedBlog)
                                .then(relatedBlogData => {
                                    if (relatedBlogData) {
                                        setRelatedBlog(relatedBlogData)
                                    }
                                })
                                .catch(error => console.error('Error fetching related blog:', error))
                        )
                    }

                    // Add suggested blogs fetch (non-blocking)
                    if (blogData.suggestedReading && blogData.suggestedReading.length > 0) {
                        additionalDataPromises.push(
                            getBlogsByIds(blogData.suggestedReading)
                                .then(suggestedBlogsData => {
                                    if (suggestedBlogsData && suggestedBlogsData.length > 0) {
                                        setSuggestedBlogs(suggestedBlogsData)
                                    }
                                })
                                .catch(error => console.error('Error fetching suggested blogs:', error))
                        )
                    }

                    // Wait for all additional data in parallel (but don't block the UI)
                    Promise.all(additionalDataPromises).catch(error =>
                        console.error('Error in additional data fetching:', error)
                    )
                } else {
                    console.log('No blog found for slug:', slug)
                    setError('Blog not found')
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error fetching blog:', error)
                setError('Failed to load blog')
                setIsLoading(false)
            }
        }

        fetchBlog()
    }, [slug])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const handleLike = async () => {
        if (!blog) return

        try {
            if (isLiked) {
                // Dislike (remove like)
                await decrementBlogLikes(blog.$id)
                setIsLiked(false)
                removeFromLiked(blog.$id) // Remove from localStorage
                // Update local state to reflect the dislike
                setBlog(prevBlog =>
                    prevBlog ? {...prevBlog, likes: Math.max(0, prevBlog.likes - 1)} : null
                )
            } else {
                // Like
                await incrementBlogLikes(blog.$id)
                setIsLiked(true)
                markAsLiked(blog.$id) // Mark as liked in localStorage

                // Trigger like animation
                setShowLikeAnimation(true)
                setTimeout(() => setShowLikeAnimation(false), 2000)

                // Update local state to reflect the like
                setBlog(prevBlog =>
                    prevBlog ? {...prevBlog, likes: prevBlog.likes + 1} : null
                )
            }
        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }


    const handleShare = async () => {
        if (!blog) return

        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            // You could show a toast notification here
        }
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
                                <p className="text-gray-400">Loading blog post...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="bg-dark-950">
                <div className="pt-8">
                    <div className="container-custom section-padding">
                        <div className="text-center py-16">
                            <div
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-red-400"/>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">
                                {error || 'Blog Post Not Found'}
                            </h1>
                            <p className="text-gray-400 mb-6">
                                {error === 'Blog not found'
                                    ? 'The blog post you\'re looking for doesn\'t exist.'
                                    : error === 'Failed to load blog'
                                        ? 'There was an error loading the blog post. Please try again.'
                                        : 'Something went wrong. Please try again.'
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4"/>
                                    <span>Back to Blogs</span>
                                </Link>
                                {error && (
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <span>Try Again</span>
                                    </button>
                                )}
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
                {/* Back Button */}
                <div className="container-custom section-padding">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="mb-8"
                    >
                        <Link
                            href="/blogs"
                            className="group flex items-center space-x-3 text-white hover:text-primary-400 transition-all duration-300"
                        >
                            <div
                                className="p-2 rounded-lg bg-dark-800/50 group-hover:bg-primary-500/20 transition-colors">
                                <ArrowLeft className="w-5 h-5"/>
                            </div>
                            <span className="text-lg font-semibold">Back to Blogs</span>
                        </Link>
                    </motion.div>

                    {/* Featured Image */}
                    {blog.featuredImage && (
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="max-w-4xl mx-auto mb-12"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <div className="relative w-full" style={{aspectRatio: '1200/600'}}>
                                    <img
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Article Header */}
                    <motion.header
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                            {blog.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4"/>
                                <span>{formatDate(blog.$createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4"/>
                                <span>{blog.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>By Shivam Raj</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Eye className="w-4 h-4"/>
                                <span>{blog.views} views</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm text-primary-400"
                                >
                  {tag}
                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center space-x-4 relative">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={handleLike}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    isLiked
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                                        : 'bg-dark-800 text-gray-400 border border-dark-700 hover:text-white hover:border-red-500/30'
                                }`}
                                title={isLiked ? 'Click to unlike' : 'Click to like'}
                            >
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}/>
                                <span>{isLiked ? `Liked (${blog.likes})` : `Like (${blog.likes})`}</span>
                            </motion.button>

                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={handleShare}
                                className="flex items-center space-x-2 px-4 py-2 bg-dark-800 text-gray-400 border border-dark-700 rounded-lg hover:text-white transition-colors"
                            >
                                <Share2 className="w-4 h-4"/>
                                <span>Share</span>
                            </motion.button>

                            {/* Like Animation */}
                            {showLikeAnimation && (
                                <motion.div
                                    initial={{scale: 0, opacity: 1}}
                                    animate={{
                                        scale: [0, 1.5, 2, 0],
                                        opacity: [1, 1, 1, 0],
                                        y: [0, -20, -40, -60]
                                    }}
                                    transition={{duration: 2, ease: "easeOut"}}
                                    className="absolute -top-20 left-1/2 transform -translate-x-1/2 pointer-events-none"
                                >
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            animate={{
                                                rotate: [0, 10, -10, 0],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{duration: 0.5, repeat: 3}}
                                        >
                                            <Heart className="w-8 h-8 text-red-500 fill-current"/>
                                        </motion.div>
                                        <motion.div
                                            initial={{opacity: 0, y: 10}}
                                            animate={{opacity: [0, 1, 0], y: [10, 0, -10]}}
                                            transition={{duration: 1.5, delay: 0.2}}
                                            className="text-red-400 text-sm font-medium mt-2"
                                        >
                                            +1
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.header>

                    {/* Article Content */}
                    <motion.article
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="prose prose-invert prose-lg max-w-none">
                            <BlogContentRenderer content={parseBlogContent(blog.content)}/>
                        </div>
                    </motion.article>

                    {/* Part Navigation */}
                    <div className="max-w-4xl mx-auto">
                        <BlogPart2Navigation
                            relatedBlog={relatedBlog}
                            currentPartNumber={blog.partNumber || 1}
                        />
                    </div>

                    {/* Suggested Reading */}
                    <div className="max-w-6xl mx-auto">
                        <SuggestedReading suggestedBlogs={suggestedBlogs}/>
                    </div>
                </div>
            </div>
        </div>
    )
}