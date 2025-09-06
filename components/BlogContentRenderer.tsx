'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ContentBlock {
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

interface BlogContentRendererProps {
  content: ContentBlock[]
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const renderContentBlock = (block: ContentBlock, index: number) => {
    const animationDelay = index * 0.1

    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="mb-6"
          >
            <HeadingTag className={`font-bold text-white mb-4 ${
              block.level === 1 ? 'text-3xl sm:text-4xl' :
              block.level === 2 ? 'text-2xl sm:text-3xl' :
              block.level === 3 ? 'text-xl sm:text-2xl' :
              'text-lg sm:text-xl'
            }`}>
              {block.text}
            </HeadingTag>
          </motion.div>
        )

      case 'paragraph':
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="text-gray-300 leading-relaxed mb-6 text-base sm:text-lg"
          >
            {block.text}
          </motion.p>
        )

      case 'code':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="mb-6"
          >
            <div className="relative group">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => copyToClipboard(block.code || '')}
                  className="flex items-center space-x-2 px-3 py-1 bg-dark-800/80 text-gray-300 rounded-md text-sm hover:bg-dark-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copiedCode === block.code ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <SyntaxHighlighter
                language={block.language || 'text'}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {block.code || ''}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        )

      case 'image':
        const isGif = block.src?.toLowerCase().endsWith('.gif')
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="mb-6"
          >
            <div className="relative rounded-lg overflow-hidden border border-dark-700">
              <img
                src={block.src}
                alt={block.alt || ''}
                className="w-full h-auto"
                loading="lazy"
                style={isGif ? { imageRendering: 'auto' } : {}}
              />
              {isGif && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  GIF
                </div>
              )}
              {block.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-dark-900/80 text-white p-3 text-sm">
                  {block.caption}
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'list':
        const isOrderedList = ['number', 'decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'].includes(block.style || 'bullet')
        const ListTag = isOrderedList ? 'ol' : 'ul'
        
        const getListStyle = (style?: string) => {
          switch (style) {
            case 'number':
            case 'decimal':
              return 'list-decimal'
            case 'lower-alpha':
              return 'list-[lower-alpha]'
            case 'upper-alpha':
              return 'list-[upper-alpha]'
            case 'lower-roman':
              return 'list-[lower-roman]'
            case 'upper-roman':
              return 'list-[upper-roman]'
            case 'circle':
              return 'list-[circle]'
            case 'square':
              return 'list-[square]'
            case 'disc':
            case 'bullet':
            default:
              return 'list-disc'
          }
        }
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="mb-6"
          >
            <ListTag className={`space-y-2 list-inside text-gray-300 ${getListStyle(block.style)}`}>
              {block.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ListTag>
          </motion.div>
        )

      case 'quote':
        return (
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="border-l-4 border-primary-500 pl-6 py-4 mb-6 bg-dark-800/30 rounded-r-lg"
          >
            <p className="text-gray-300 italic text-lg leading-relaxed mb-2">
              "{block.text}"
            </p>
            {block.author && (
              <cite className="text-primary-400 text-sm">— {block.author}</cite>
            )}
          </motion.blockquote>
        )

      case 'table':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className="mb-6 overflow-x-auto"
          >
            <table className="w-full border-collapse border border-dark-700 rounded-lg overflow-hidden">
              {block.headers && block.headers.length > 0 && (
                <thead>
                  <tr className="bg-dark-800">
                    {block.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="border border-dark-700 px-4 py-3 text-left text-white font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {block.rows?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? 'bg-dark-800/50' : 'bg-dark-800/30'
                    } hover:bg-dark-700/50 transition-colors`}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-dark-700 px-4 py-3 text-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {block.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center italic">
                {block.caption}
              </p>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {content.map((block, index) => renderContentBlock(block, index))}
    </div>
  )
}