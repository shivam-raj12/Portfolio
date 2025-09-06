import { Client, TablesDB, Query, ID } from 'appwrite'
import { 
  APPWRITE_ENDPOINT, 
  APPWRITE_PROJECT_ID, 
  DB_PORTFOLIO,
  DB_PORTFOLIO_ID,
  COL_APPS,
  COL_PROFILE,
  COL_MESSAGES,
  COL_BLOGS
} from './variables'

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

export const tablesDB = new TablesDB(client)

// Database and Table IDs
export const BLOGS_DATABASE_ID = DB_PORTFOLIO  // 'portfolio' for blogs
export const OTHER_DATABASE_ID = DB_PORTFOLIO_ID  // '68b8266e001d4f873a52' for other tables
export const BLOGS_TABLE_ID = COL_BLOGS
export const PROFILE_TABLE_ID = COL_PROFILE
export const MESSAGES_TABLE_ID = COL_MESSAGES
export const APPS_TABLE_ID = COL_APPS

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
  $sequence: number
  $createdAt: string
  $updatedAt: string
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'code' | 'image' | 'list' | 'quote' | 'table'
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
 * Parse blog content from JSON string
 */
export function parseBlogContent(content: string): ContentBlock[] {
  try {
    return JSON.parse(content)
  } catch (error) {
    console.error('Error parsing blog content:', error)
    // Return a simple paragraph with the content as fallback
    return [{
      type: 'paragraph',
      text: content
    }]
  }
}

// API Functions

/**
 * Get all published blogs with pagination
 */
export async function getPublishedBlogs(limit = 10, offset = 0): Promise<BlogPost[]> {
  try {
    const response = await tablesDB.listRows(
      BLOGS_DATABASE_ID,
      BLOGS_TABLE_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
        Query.offset(offset)
      ]
    )
    return response.rows as unknown as BlogPost[]
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Decode URL-encoded slug (spaces become %20 in URLs)
    const decodedSlug = decodeURIComponent(slug)
    console.log('getBlogBySlug called with:', slug)
    console.log('Decoded slug:', decodedSlug)
    console.log('Using database:', BLOGS_DATABASE_ID, 'table:', BLOGS_TABLE_ID)
    
    const response = await tablesDB.listRows(
      BLOGS_DATABASE_ID,
      BLOGS_TABLE_ID,
      [Query.equal('slug', decodedSlug)]
    )
    
    console.log('Query response:', response)
    console.log('Number of rows found:', response.rows.length)
    
    return response.rows[0] as unknown as BlogPost || null
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogById(blogId: string): Promise<BlogPost | null> {
  try {
    const response = await tablesDB.listRows(
      BLOGS_DATABASE_ID,
      BLOGS_TABLE_ID,
      [Query.equal('$id', blogId)]
    )
    return response.rows[0] as unknown as BlogPost || null
  } catch (error) {
    console.error('Error fetching blog by ID:', error)
    return null
  }
}

/**
 * Search blogs by title, excerpt, or tags
 */
export async function searchBlogs(searchTerm: string, limit = 10): Promise<BlogPost[]> {
  try {
    const response = await tablesDB.listRows(
      BLOGS_DATABASE_ID,
      BLOGS_TABLE_ID,
      [
        Query.or([
          Query.search('title', searchTerm),
          Query.search('excerpt', searchTerm),
          Query.search('content', searchTerm)
        ]),
        Query.limit(limit)
      ]
    )
    return response.rows as unknown as BlogPost[]
  } catch (error) {
    console.error('Error searching blogs:', error)
    return []
  }
}

/**
 * Get blogs by tag
 */
export async function getBlogsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  try {
    const response = await tablesDB.listRows(
      BLOGS_DATABASE_ID,
      BLOGS_TABLE_ID,
      [
        Query.contains('tags', tag),
        Query.limit(limit)
      ]
    )
    return response.rows as unknown as BlogPost[]
  } catch (error) {
    console.error('Error fetching blogs by tag:', error)
    return []
  }
}

/**
 * Get latest blogs (for hero section)
 */
export async function getLatestBlogs(limit = 3): Promise<BlogPost[]> {
  try {
    const response = await tablesDB.listRows(
      BLOGS_DATABASE_ID,
      BLOGS_TABLE_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(limit)
      ]
    )
    return response.rows as unknown as BlogPost[]
  } catch (error) {
    console.error('Error fetching latest blogs:', error)
    return []
  }
}


/**
 * Increment blog view count
 */
export async function incrementBlogViews(blogId: string): Promise<void> {
  try {
    await tablesDB.incrementRowColumn({
      databaseId: BLOGS_DATABASE_ID,
      tableId: BLOGS_TABLE_ID,
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
      databaseId: BLOGS_DATABASE_ID,
      tableId: BLOGS_TABLE_ID,
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
      databaseId: BLOGS_DATABASE_ID,
      tableId: BLOGS_TABLE_ID,
      rowId: blogId,
      column: 'likes',
      value:  1
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
      databaseId: OTHER_DATABASE_ID,
      tableId: APPS_TABLE_ID,
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
      OTHER_DATABASE_ID,
      PROFILE_TABLE_ID,
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
      OTHER_DATABASE_ID,
      MESSAGES_TABLE_ID,
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
      OTHER_DATABASE_ID,
      APPS_TABLE_ID,
      [Query.orderDesc('$createdAt')]
    )
    return response.rows as unknown as App[]
  } catch (error) {
    console.error('Error fetching apps:', error)
    return []
  }
}
