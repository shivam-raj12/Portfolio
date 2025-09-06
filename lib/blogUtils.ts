/**
 * Utility functions for blog interactions
 */

// Check if user has already liked this blog
export const checkIfLiked = (blogId: string): boolean => {
  if (typeof window === 'undefined') return false
  const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
  return likedBlogs.includes(blogId)
}

// Mark blog as liked in localStorage
export const markAsLiked = (blogId: string): void => {
  if (typeof window === 'undefined') return
  const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
  if (!likedBlogs.includes(blogId)) {
    likedBlogs.push(blogId)
    localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs))
  }
}

// Remove blog from liked list in localStorage
export const removeFromLiked = (blogId: string): void => {
  if (typeof window === 'undefined') return
  const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
  const updatedLikedBlogs = likedBlogs.filter((id: string) => id !== blogId)
  localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs))
}

// Format download counts
export const formatDownloads = (downloads: number): string => {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`
  } else if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`
  }
  return downloads.toString()
}

// Format file sizes
export const formatSize = (size: string): string => {
  return `${size} MB`
}