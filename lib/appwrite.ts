import {Client, ID, Query, TablesDB} from 'appwrite'
import {
    APPWRITE_APP_STORE_TABLE_ID,
    APPWRITE_BLOGS_TABLE_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_ENDPOINT,
    APPWRITE_MESSAGES_TABLE_ID,
    APPWRITE_PROFILE_TABLE_ID,
    APPWRITE_PROJECT_ID
} from './variables'

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)

export const tablesDB = new TablesDB(client)

// Types
export interface BlogPost {
    $id: string
    title: string
    slug: string
    excerpt: string
    content: string // JSON string that needs to be parsed
    readTime: number
    tags: string[]
    views: number
    likes: number
    featuredImage?: string // Can be null
    relatedBlog?: string // ID of the related blog (next part)
    suggestedReading?: string[] // Array of blog IDs for suggested reading
    partNumber?: number // Part number of this blog (1, 2, 3, etc.)
    $sequence: number
    $createdAt: string
    $updatedAt: string
}

export interface ContentBlock {
    type: 'heading' | 'paragraph' | 'code' | 'image' | 'list' | 'quote' | 'table' | 'inlineCode' | 'link' | 'blockLink'
    level?: number
    text?: string
    code?: string
    language?: string
    src?: string
    alt?: string
    caption?: string
    style?: 'bullet' | 'number' | 'disc' | 'circle' | 'square' | 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman'
    items?: string[]
    author?: string
    headers?: string[]
    rows?: string[][]
    url?: string
    target?: '_blank' | '_self'
    isExternal?: boolean
    description?: string
}

export interface Profile {
    $id: string
    profile: string
    $sequence: number
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    $databaseId: string
    $tableId: string
}

export interface Message {
    $id: string
    name: string
    email: string
    subject: string
    message: string
}

export interface App {
    $id: string
    title: string
    description: string
    version: string
    features: string[]
    downloadLink: string
    icon: string
    size: string
    downloads: number
    info?: string
    info_detail?: string
}

// Helper Functions

/**
 * Log error to Appwrite for debugging
 */
export async function logError(error: string, context: string, additionalData?: any): Promise<void> {
    try {
        // You can implement this to log to a separate errors table in Appwrite
        // For now, we'll just log to console with structured data
        console.error('Error Log:', {
            error,
            context,
            additionalData,
            timestamp: new Date().toISOString(),
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
            url: typeof window !== 'undefined' ? window.location.href : 'Server'
        })
    } catch (logError) {
        console.error('Failed to log error:', logError)
    }
}

/**
 * Parse blog content from JSON string with robust error handling
 */
export function parseBlogContent(content: string): ContentBlock[] {
    try {
        // Check if content is empty or null
        if (!content || content.trim() === '') {
            console.warn('Empty content provided')
            return [{
                type: 'paragraph',
                text: 'No content available for this blog post.'
            }]
        }

        // Attempt to parse JSON
        const parsed = JSON.parse(content)

        // Validate that it's an array
        if (!Array.isArray(parsed)) {
            console.warn('Parsed content is not an array:', parsed)
            return [{
                type: 'paragraph',
                text: 'Content format is invalid. Please check the blog content structure.'
            }]
        }

        // Validate each block has required properties
        return parsed.map((block, index) => {
            if (!block || typeof block !== 'object') {
                console.warn(`Invalid block at index ${index}:`, block)
                return {
                    type: 'paragraph',
                    text: 'This content block could not be loaded properly.'
                }
            }

            if (!block.type || typeof block.type !== 'string') {
                console.warn(`Block at index ${index} missing type:`, block)
                return {
                    type: 'paragraph',
                    text: 'Content block is missing required type information.'
                }
            }

            return block
        })
    } catch (error) {
        console.error('Error parsing blog content:', error)

        // Log error to Appwrite for debugging
         logError(
            error instanceof Error ? error.message : String(error),
            'parseBlogContent',
            {
                contentLength: content?.length || 0,
                contentPreview: content?.substring(0, 100) || 'No content',
                errorType: error instanceof SyntaxError ? 'JSON_SYNTAX_ERROR' : 'UNKNOWN_ERROR'
            }
        )

        // Try to provide more helpful error messages
        if (error instanceof SyntaxError) {
            console.error('JSON syntax error in blog content:', error.message)
            // Try to extract the problematic part for better debugging
            const match = error.message.match(/position (\d+)/)
            if (match) {
                const position = parseInt(match[1])
                const problemText = content.substring(Math.max(0, position - 20), position + 20)
                console.error('Problematic content around position', position, ':', problemText)
            }

            return [{
                type: 'paragraph',
                text: 'There was an error parsing the blog content. Please check the content format.'
            }]
        }

        // Generic fallback
        return [{
            type: 'paragraph',
            text: 'Unable to load blog content. Please refresh the page or contact support if the problem persists.'
        }]
    }
}

// Client-side cache to prevent repeated API calls
const blogCache = new Map<string, { data: any, timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCachedData<T>(key: string): T | null {
    const cached = blogCache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data as T
    }
    return null
}

function setCachedData<T>(key: string, data: T): void {
    blogCache.set(key, { data, timestamp: Date.now() })
}

// API Functions

/**
 * Get all published blogs with pagination
 */
export async function getPublishedBlogs(limit = 10, offset = 0): Promise<BlogPost[]> {
    const cacheKey = `blogs-${limit}-${offset}`
    const cached = getCachedData<BlogPost[]>(cacheKey)
    if (cached) {
        return cached
    }

    try {
        const response = await tablesDB.listRows(
            APPWRITE_DATABASE_ID,
            APPWRITE_BLOGS_TABLE_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(limit),
                Query.offset(offset)
            ]
        )
        const blogs = response.rows as unknown as BlogPost[]
        setCachedData(cacheKey, blogs)
        return blogs
    } catch (error) {
        console.error('Error fetching blogs:', error)
        return []
    }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `blog-slug-${slug}`
    const cached = getCachedData<BlogPost | null>(cacheKey)
    if (cached !== null) {
        return cached
    }

    try {
        // Decode URL-encoded slug (spaces become %20 in URLs)
        const decodedSlug = decodeURIComponent(slug)
        console.log('getBlogBySlug called with:', slug)
        console.log('Decoded slug:', decodedSlug)

        const response = await tablesDB.listRows(
            APPWRITE_DATABASE_ID,
            APPWRITE_BLOGS_TABLE_ID,
            [Query.equal('slug', decodedSlug)]
        )

        const blog = response.rows[0] as unknown as BlogPost || null
        setCachedData(cacheKey, blog)
        return blog
    } catch (error) {
        console.error('Error fetching blog:', error)
        logError(
            error instanceof Error ? error.message : String(error),
            'getBlogBySlug',
            { slug, decodedSlug: decodeURIComponent(slug) }
        )
        return null
    }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogById(blogId: string): Promise<BlogPost | null> {
    const cacheKey = `blog-id-${blogId}`
    const cached = getCachedData<BlogPost | null>(cacheKey)
    if (cached !== null) {
        return cached
    }

    try {
        const response = await tablesDB.listRows(
            APPWRITE_DATABASE_ID,
            APPWRITE_BLOGS_TABLE_ID,
            [Query.equal('$id', blogId)]
        )

        const blog = response.rows[0] as unknown as BlogPost || null
        setCachedData(cacheKey, blog)
        return blog
    } catch (error) {
        console.error('Error fetching blog by ID:', error)
        logError(
            error instanceof Error ? error.message : String(error),
            'getBlogById',
            { blogId }
        )
        return null
    }
}

/**
 * Get multiple blog posts by IDs (for suggested reading)
 * Optimized to fetch only specific blogs instead of all blogs
 */
export async function getBlogsByIds(blogIds: string[]): Promise<BlogPost[]> {
    try {
        if (!blogIds || blogIds.length === 0) {
            return []
        }

        // Fetch blogs in parallel using individual queries
        const blogPromises = blogIds.map(blogId => 
            tablesDB.listRows(
                APPWRITE_DATABASE_ID,
                APPWRITE_BLOGS_TABLE_ID,
                [Query.equal('$id', blogId)]
            ).then(response => response.rows[0] as unknown as BlogPost)
        )

        const blogs = await Promise.all(blogPromises)
        return blogs.filter(blog => blog !== undefined) as BlogPost[]
    } catch (error) {
        console.error('Error fetching blogs by IDs:', error)
        logError(
            error instanceof Error ? error.message : String(error),
            'getBlogsByIds',
            { blogIds, blogIdsCount: blogIds.length }
        )
        return []
    }
}

/**
 * Get latest blogs (for hero section)
 */
export async function getLatestBlogs(limit = 3): Promise<BlogPost[]> {
    const cacheKey = `latest-blogs-${limit}`
    const cached = getCachedData<BlogPost[]>(cacheKey)
    if (cached) {
        return cached
    }

    try {
        const response = await tablesDB.listRows(
            APPWRITE_DATABASE_ID,
            APPWRITE_BLOGS_TABLE_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(limit)
            ]
        )
        const blogs = response.rows as unknown as BlogPost[]
        setCachedData(cacheKey, blogs)
        return blogs
    } catch (error) {
        console.error('Error fetching latest blogs:', error)
        logError(
            error instanceof Error ? error.message : String(error),
            'getLatestBlogs',
            { limit }
        )
        return []
    }
}


/**
 * Increment blog view count
 */
export async function incrementBlogViews(blogId: string): Promise<void> {
    try {
        await tablesDB.incrementRowColumn({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_BLOGS_TABLE_ID,
            rowId: blogId,
            column: 'views',
            value: 1
        })
    } catch (error) {
        console.error('Error incrementing blog views:', error)
    }
}

/**
 * Increment blog like count
 */
export async function incrementBlogLikes(blogId: string): Promise<void> {
    try {
        await tablesDB.incrementRowColumn({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_BLOGS_TABLE_ID,
            rowId: blogId,
            column: 'likes',
            value: 1
        })
    } catch (error) {
        console.error('Error incrementing blog likes:', error)
    }
}

/**
 * Decrement blog like count (dislike)
 */
export async function decrementBlogLikes(blogId: string): Promise<void> {
    try {
        await tablesDB.decrementRowColumn({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_BLOGS_TABLE_ID,
            rowId: blogId,
            column: 'likes',
            value: 1
        })
    } catch (error) {
        console.error('Error decrementing blog likes:', error)
    }
}

/**
 * Increment app download count
 */
export async function incrementAppDownloads(appId: string): Promise<void> {
    try {
        await tablesDB.incrementRowColumn({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_APP_STORE_TABLE_ID,
            rowId: appId,
            column: 'downloads',
            value: 1
        })
    } catch (error) {
        console.error('Error incrementing app downloads:', error)
    }
}

// Profile API Functions

/**
 * Get profile information
 */
export async function getProfile(): Promise<Profile | null> {
    try {
        const response = await tablesDB.listRows(
            APPWRITE_DATABASE_ID,
            APPWRITE_PROFILE_TABLE_ID,
            [Query.limit(1)]
        )
        return response.rows[0] as unknown as Profile || null
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}

// Messages API Functions

/**
 * Create a new message
 */
export async function createMessage(messageData: Omit<Message, '$id'>): Promise<Message | null> {
    try {
        const response = await tablesDB.createRow(
            APPWRITE_DATABASE_ID,
            APPWRITE_MESSAGES_TABLE_ID,
            ID.unique(),
            {
                name: messageData.name,
                email: messageData.email,
                subject: messageData.subject,
                message: messageData.message
            }
        )
        return response as unknown as Message
    } catch (error) {
        console.error('Error creating message:', error)
        return null
    }
}

// Apps API Functions

/**
 * Get all apps
 */
export async function getAllApps(): Promise<App[]> {
    try {
        const response = await tablesDB.listRows(
            APPWRITE_DATABASE_ID,
            APPWRITE_APP_STORE_TABLE_ID,
            [Query.orderDesc('$createdAt')]
        )
        return response.rows as unknown as App[]
    } catch (error) {
        console.error('Error fetching apps:', error)
        return []
    }
}
