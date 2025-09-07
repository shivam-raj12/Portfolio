# Blog Content Structure

This document outlines the supported content types for blog posts in JSON format.

## Content Types Supported

### 1. Heading
```json
{
  "type": "heading",
  "level": 1,
  "text": "Your Heading Text"
}
```
- `level`: 1-6 (h1 to h6)
- `text`: The heading content

### 2. Paragraph
```json
{
  "type": "paragraph",
  "text": "Your paragraph text here..."
}
```
- `text`: The paragraph content

### 3. Code Block
```json
{
  "type": "code",
  "language": "javascript",
  "code": "console.log('Hello World');"
}
```
- `language`: Programming language for syntax highlighting
- `code`: The code content

### 4. Inline Code
```json
{
  "type": "inlineCode",
  "text": "console.log('Hello World')"
}
```
- `text`: The inline code content

### 5. Image
```json
{
  "type": "image",
  "src": "https://example.com/image.jpg",
  "alt": "Image description",
  "caption": "Optional caption"
}
```
- `src`: Image URL
- `alt`: Alternative text for accessibility
- `caption`: Optional image caption

### 6. List
```json
{
  "type": "list",
  "style": "bullet",
  "items": ["Item 1", "Item 2", "Item 3"]
}
```
- `style`: "bullet", "number", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman", "circle", "square", "disc"
- `items`: Array of list items

### 7. Quote
```json
{
  "type": "quote",
  "text": "Quote text here",
  "author": "Author name"
}
```
- `text`: The quote content
- `author`: Optional author name

### 8. Table
```json
{
  "type": "table",
  "headers": ["Header 1", "Header 2", "Header 3"],
  "rows": [
    ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
    ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
  ],
  "caption": "Optional table caption"
}
```
- `headers`: Array of column headers
- `rows`: Array of arrays representing table rows
- `caption`: Optional table caption

### 9. Inline Link
```json
{
  "type": "link",
  "text": "Click here",
  "url": "https://example.com",
  "isExternal": true,
  "target": "_blank"
}
```
- `text`: Link text
- `url`: Link destination
- `isExternal`: Boolean indicating if it's an external link
- `target`: "_blank" for new tab, "_self" for same tab

### 10. Block Link (Full-width link)
```json
{
  "type": "blockLink",
  "text": "Read More About This Topic",
  "url": "https://example.com",
  "isExternal": true,
  "target": "_blank",
  "description": "Optional description text"
}
```
- `text`: Link text
- `url`: Link destination
- `isExternal`: Boolean indicating if it's an external link
- `target`: "_blank" for new tab, "_self" for same tab
- `description`: Optional description text

## Security Features

- All external links automatically include `rel="noopener noreferrer"` for security
- Links are validated to prevent data leakage
- External links are clearly marked with an icon

## Error Handling

- Malformed JSON content is gracefully handled
- Fallback content is displayed if parsing fails
- Console errors are logged for debugging
- The website never crashes due to content parsing issues

## Database Fields

### BlogPost Interface
```typescript
interface BlogPost {
  $id: string
  title: string
  slug: string
  excerpt: string
  content: string // JSON string that needs to be parsed
  readTime: number
  tags: string[]
  views: number
  likes: number
  featuredImage?: string
  relatedBlog?: string // ID of the related blog (next part)
  suggestedReading?: string[] // Array of blog IDs for suggested reading
  partNumber?: number // Part number of this blog (1, 2, 3, etc.)
  $sequence: number
  $createdAt: string
  $updatedAt: string
}
```

## Example Complete Blog Content

```json
[
  {
    "type": "heading",
    "level": 1,
    "text": "Getting Started with React"
  },
  {
    "type": "paragraph",
    "text": "React is a powerful JavaScript library for building user interfaces. In this tutorial, we'll explore the basics."
  },
  {
    "type": "code",
    "language": "javascript",
    "code": "function App() {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n}"
  },
  {
    "type": "paragraph",
    "text": "You can also use inline code like `useState` hook for state management."
  },
  {
    "type": "inlineCode",
    "text": "useState"
  },
  {
    "type": "paragraph",
    "text": "For more information, check out the official documentation."
  },
  {
    "type": "link",
    "text": "React Documentation",
    "url": "https://reactjs.org/docs",
    "isExternal": true,
    "target": "_blank"
  },
  {
    "type": "blockLink",
    "text": "Complete React Tutorial",
    "url": "https://example.com/react-tutorial",
    "isExternal": true,
    "target": "_blank",
    "description": "A comprehensive guide to mastering React development"
  },
  {
    "type": "quote",
    "text": "The best way to learn React is by building projects.",
    "author": "React Team"
  }
]
```