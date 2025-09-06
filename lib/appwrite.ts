import { Client, TablesDB, Query, ID } from 'appwrite'
import { 
  APPWRITE_ENDPOINT, 
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_APP_STORE_TABLE_ID,
  APPWRITE_PROFILE_TABLE_ID,
  APPWRITE_MESSAGES_TABLE_ID,
  APPWRITE_BLOGS_TABLE_ID
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
      APPWRITE_DATABASE_ID,
      APPWRITE_BLOGS_TABLE_ID,
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
    console.log('Using database:', APPWRITE_DATABASE_ID, 'table:', APPWRITE_BLOGS_TABLE_ID)
    
    const response = await tablesDB.listRows(
      APPWRITE_DATABASE_ID,
      APPWRITE_BLOGS_TABLE_ID,
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
 * Get latest blogs (for hero section)
 */
export async function getLatestBlogs(limit = 3): Promise<BlogPost[]> {
  try {
    const response = await tablesDB.listRows(
      APPWRITE_DATABASE_ID,
      APPWRITE_BLOGS_TABLE_ID,
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
