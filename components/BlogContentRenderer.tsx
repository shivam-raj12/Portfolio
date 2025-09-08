'use client'

import {motion} from 'framer-motion'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {Copy, Check} from 'lucide-react'
import {useState} from 'react'
import {logError} from '@/lib/appwrite'

interface ContentBlock {
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

interface BlogContentRendererProps {
    content: ContentBlock[]
}

export default function BlogContentRenderer({content}: BlogContentRendererProps) {
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

    // Safe array check and fallback
    const safeArray = (arr: any, fallback: any[] = []): any[] => {
        if (Array.isArray(arr)) return arr
        console.warn('Expected array but got:', typeof arr, arr)
        return fallback
    }

    // Safe string check and fallback
    const safeString = (str: any, fallback: string = ''): string => {
        if (typeof str === 'string') return str
        console.warn('Expected string but got:', typeof str, str)
        return fallback
    }

// Error boundary component for individual blocks
    const ErrorFallback = ({error, blockIndex}: { error: string, blockIndex: number }) => (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="text-red-400 font-medium mb-1">Content Error</h4>
                    <p className="text-red-300 text-sm">{error}</p>
                    <p className="text-red-400 text-xs mt-1">Block #{blockIndex + 1}</p>
                </div>
            </div>
        </motion.div>
    )

    // Content is already validated in parseBlogContent, but add extra safety
    const validatedContent = Array.isArray(content) ? content : []

    const renderContentBlock = (block: ContentBlock, index: number) => {
        try {
            const animationDelay = index * 0.1

            // Validate block exists and has required properties
            if (!block || typeof block !== 'object') {
                return <ErrorFallback error="Invalid content block" blockIndex={index}/>
            }

            if (!block.type || typeof block.type !== 'string') {
                return <ErrorFallback error="Content block missing type" blockIndex={index}/>
            }

            switch (block.type) {
                case 'heading':
                    const headingText = safeString(block.text, 'Untitled')
                    const headingLevel = Math.max(1, Math.min(6, block.level || 2))
                    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements
                    return (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
                            className="mb-6"
                        >
                            <HeadingTag className={`font-bold text-white mb-4 ${
                                headingLevel === 1 ? 'text-3xl sm:text-4xl' :
                                    headingLevel === 2 ? 'text-2xl sm:text-3xl' :
                                        headingLevel === 3 ? 'text-xl sm:text-2xl' :
                                            'text-lg sm:text-xl'
                            }`}>
                                {headingText}
                            </HeadingTag>
                        </motion.div>
                    )

                case 'paragraph':
                    const paragraphText = safeString(block.text, 'Empty paragraph')
                    const parts = paragraphText.split(/(`[^`]+`)/g);
                    return (
                        <motion.p
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
                            className="text-gray-300 leading-relaxed mb-6 text-base sm:text-lg"
                        >
                            {parts.map((part, i) => {
                                if (part.startsWith("`") && part.endsWith("`")) {
                                    // Inline code
                                    return (
                                        <code
                                            key={i}
                                            className="inline-block px-2 py-1 bg-dark-800 text-gray-200 rounded-md text-sm font-mono border border-dark-700"
                                        >
                                            {part.slice(1, -1)}
                                        </code>
                                    );
                                } else {
                                    // For non-code parts, handle bold text
                                    const boldParts = part.split(/(\*[^*]+\*)/g); // split by *bold*
                                    return boldParts.map((subPart, j) => {
                                        if (subPart.startsWith("*") && subPart.endsWith("*")) {
                                            return (
                                                <strong key={j} className="font-bold">
                                                    {subPart.slice(1, -1)}
                                                </strong>
                                            );
                                        }
                                        return <span key={j}>{subPart}</span>;
                                    });
                                }
                            })}
                        </motion.p>
                    )

                case 'code':
                    return (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
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
                                                <Check className="w-4 h-4 text-green-400"/>
                                                <span className="text-green-400">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4"/>
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
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
                            className="mb-6"
                        >
                            <div className="relative rounded-lg overflow-hidden border border-dark-700">
                                <img
                                    src={block.src}
                                    alt={block.alt || ''}
                                    className="w-full h-auto"
                                    loading="lazy"
                                    style={isGif ? {imageRendering: 'auto'} : {}}
                                />
                                {isGif && (
                                    <div
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                        GIF
                                    </div>
                                )}
                                {block.caption && (
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-dark-900/80 text-white p-3 text-sm">
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

                    // Safe array handling for list items
                    const listItems = safeArray(block.items, ['No items available']);

                    return (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
                            className="mb-6"
                        >
                            <ListTag className={`space-y-2 list-inside text-gray-300 ${getListStyle(block.style)}`}>
                                {listItems.map((item, itemIndex) => {
                                    const itemText = safeString(item, 'Empty item');

                                    // Split by inline code first
                                    const codeParts = itemText.split(/(`[^`]+`)/g);

                                    return (
                                        <li key={itemIndex} className="leading-relaxed">
                                            {codeParts.map((part, i) => {
                                                if (part.startsWith("`") && part.endsWith("`")) {
                                                    return (
                                                        <code
                                                            key={i}
                                                            className="inline-block px-1 py-0.5 bg-dark-800 text-gray-200 rounded-md text-sm font-mono border border-dark-700"
                                                        >
                                                            {part.slice(1, -1)}
                                                        </code>
                                                    );
                                                } else {
                                                    // Split by single asterisk for bold text
                                                    const boldParts = part.split(/(\*[^*]+\*)/g);
                                                    return boldParts.map((subPart, j) => {
                                                        if (subPart.startsWith("*") && subPart.endsWith("*")) {
                                                            return (
                                                                <strong key={j} className="font-bold">
                                                                    {subPart.slice(1, -1)}
                                                                </strong>
                                                            );
                                                        }
                                                        return <span key={j}>{subPart}</span>;
                                                    });
                                                }
                                            })}
                                        </li>
                                    );
                                })}
                            </ListTag>
                        </motion.div>
                    );


                case 'quote':
                    return (
                        <motion.blockquote
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
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
                    const tableHeaders = safeArray(block.headers, [])
                    const tableRows = safeArray(block.rows, [])
                    const tableCaption = safeString(block.caption, '')

                    return (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
                            className="mb-6 overflow-x-auto"
                        >
                            <table className="w-full border-collapse border border-dark-700 rounded-lg overflow-hidden">
                                {tableHeaders.length > 0 && (
                                    <thead>
                                    <tr className="bg-dark-800">
                                        {tableHeaders.map((header, headerIndex) => (
                                            <th
                                                key={headerIndex}
                                                className="border border-dark-700 px-4 py-3 text-left text-white font-semibold"
                                            >
                                                {safeString(header, 'Header')}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                )}
                                <tbody>
                                {tableRows.map((row, rowIndex) => {
                                    const safeRow = safeArray(row, [])
                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={`${
                                                rowIndex % 2 === 0 ? 'bg-dark-800/50' : 'bg-dark-800/30'
                                            } hover:bg-dark-700/50 transition-colors`}
                                        >
                                            {safeRow.map((cell, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className="border border-dark-700 px-4 py-3 text-gray-300"
                                                >
                                                    {safeString(cell, '')}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            {tableCaption && (
                                <p className="text-sm text-gray-500 mt-2 text-center italic">
                                    {tableCaption}
                                </p>
                            )}
                        </motion.div>
                    )

                case 'inlineCode':
                    const inlineCodeText = safeString(block.text, 'code')
                    return (
                        <motion.code
                            key={index}
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3, delay: animationDelay}}
                            className="inline-block px-2 py-1 bg-dark-800 text-primary-400 rounded-md text-sm font-mono border border-dark-700"
                        >
                            {inlineCodeText}
                        </motion.code>
                    )

                case 'link':
                    const linkUrl = safeString(block.url, '#')
                    const linkText = safeString(block.text, 'Link')
                    const isExternal = block.isExternal || block.target === '_blank'

                    // Validate URL for security
                    if (linkUrl.startsWith('javascript:') || linkUrl.startsWith('data:')) {
                        return <ErrorFallback error="Unsafe link blocked for security" blockIndex={index}/>
                    }

                    return (
                        <motion.a
                            key={index}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: animationDelay}}
                            href={linkUrl}
                            target={block.target || (isExternal ? '_blank' : '_self')}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center text-primary-400 hover:text-primary-300 underline underline-offset-2 decoration-primary-500/50 hover:decoration-primary-400 transition-all duration-200"
                        >
                            {linkText}
                            {isExternal && (
                                <svg
                                    className="w-3 h-3 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            )}
                        </motion.a>
                    )

                case 'blockLink':
                    const blockLinkUrl = safeString(block.url, '#')
                    const blockLinkText = safeString(block.text, 'Link')
                    const blockLinkDescription = safeString(block.description, '')
                    const isBlockExternal = block.isExternal || block.target === '_blank'

                    // Validate URL for security
                    if (blockLinkUrl.startsWith('javascript:') || blockLinkUrl.startsWith('data:')) {
                        return <ErrorFallback error="Unsafe block link blocked for security" blockIndex={index}/>
                    }

                    return (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: animationDelay}}
                            className="mb-6"
                        >
                            <a
                                href={blockLinkUrl}
                                target={block.target || (isBlockExternal ? '_blank' : '_self')}
                                rel={isBlockExternal ? 'noopener noreferrer' : undefined}
                                className="block group relative bg-gradient-to-r from-dark-800/50 to-dark-900/50 border border-dark-700/50 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 mb-2">
                                            {blockLinkText}
                                        </h3>
                                        {blockLinkDescription && (
                                            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
                                                {blockLinkDescription}
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        className="flex items-center space-x-2 text-primary-400 group-hover:text-primary-300 transition-colors duration-200">
                  <span className="text-sm font-medium">
                    {isBlockExternal ? 'Visit' : 'Read More'}
                  </span>
                                        <svg
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                            </a>
                        </motion.div>
                    )

                default:
                    return <ErrorFallback error={`Unknown content type: ${block.type}`} blockIndex={index}/>
            }
        } catch (error) {
            console.error(`Error rendering content block at index ${index}:`, error)

            // Log error to Appwrite for debugging
            logError(
                error instanceof Error ? error.message : String(error),
                'renderContentBlock',
                {
                    blockIndex: index,
                    blockType: block?.type || 'unknown',
                    blockData: block
                }
            )

            return <ErrorFallback error="Failed to render content block" blockIndex={index}/>
        }
    }

    return (
        <div className="space-y-6">
            {validatedContent.map((block, index) => renderContentBlock(block, index))}
        </div>
    )
}