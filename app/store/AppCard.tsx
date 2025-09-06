'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Download, Smartphone, Info } from 'lucide-react'
import DownloadButton from './DownloadButton'
import { formatSize, formatDownloads } from '@/lib/blogUtils'

export interface AppInfoProps {
  appId: string
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


export default function AppCard({ appId, title, description, version, features, downloadLink, icon, size, downloads, info, info_detail }: AppInfoProps) {
  const [showInfoPopup, setShowInfoPopup] = useState(false)
  const [currentDownloads, setCurrentDownloads] = useState(downloads)

  const handleDownloadSuccess = () => {
    setCurrentDownloads(prev => prev + 1)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
      <div className="relative rounded-2xl sm:rounded-3xl border border-dark-700/50 bg-dark-900/60 backdrop-blur-sm hover:border-primary-500/40 transition-all duration-500 p-4 sm:p-6 lg:p-8 shadow-2xl">
        
        {/* Ribbon Top Right */}
        {info && info_detail && (
          <div className="absolute top-0 right-0 z-20 overflow-visible">
            <button
              onClick={() => setShowInfoPopup(true)}
              className="group cursor-pointer"
              title="Click for more info"
            >
              <div className="relative transform rotate-12 translate-x-2 -translate-y-1">
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 shadow-lg rounded-sm
                  before:absolute before:top-full before:right-0 before:w-0 before:h-0 
                  before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent 
                  before:border-t-[6px] before:border-t-purple-500">
                  <span className="relative z-10 whitespace-nowrap">
                    {info}
                  </span>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
          {/* App Icon */}
          <div className="flex-shrink-0 relative mx-auto sm:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl sm:rounded-3xl blur-lg" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl border border-white/10 bg-dark-800/50 backdrop-blur-sm p-2">
              {icon ? (
                <img 
                  src={icon} 
                  alt={`${title} icon`} 
                  className="w-full h-full rounded-xl sm:rounded-2xl object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
              ) : null}
              <div className={`w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center ${icon ? 'hidden' : ''}`}>
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
              </div>
            </div>
          </div>

          {/* App Details */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-primary-400 transition-colors mb-2">
                  {title}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span>v{version}</span>
                  </span>
                  <span>{formatSize(size)}</span>
                  <span className="flex items-center space-x-1">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span>{formatDownloads(currentDownloads)}</span>
                  </span>

                  {/* Clickable Info Badge */}
                  {info && info_detail && (
                    <button
                      onClick={() => setShowInfoPopup(true)}
                      className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                        border border-blue-500/30 rounded-full text-blue-300 font-medium hover:bg-blue-500/30 transition"
                    >
                      <Info className="w-3 h-3 text-blue-400" />
                      <span className="text-xs">Info Available</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-center sm:justify-end mt-3 sm:mt-0 pr-2"> {/* shifted down + left */}
                <DownloadButton 
                  url={downloadLink} 
                  filename={`${title.replace(/[^a-z0-9]+/gi,'_')}.apk`}
                  appId={appId}
                  onDownloadSuccess={handleDownloadSuccess}
                />
              </div>
            </div>

            <p className="text-gray-300/90 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-center sm:text-left">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
              {features.map((f, index) => (
                <motion.span 
                  key={`${f}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary-500/15 to-accent-500/15 border border-primary-500/25 rounded-full text-xs sm:text-sm text-primary-300 font-medium backdrop-blur-sm"
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Info Popup */}
      {showInfoPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfoPopup(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md sm:max-w-lg bg-dark-900/95 backdrop-blur-xl border border-dark-700/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 sm:p-8 border-b border-dark-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border border-white/10 bg-dark-800/50 backdrop-blur-sm p-2 flex-shrink-0">
                    {icon ? (
                      <img 
                        src={icon} 
                        alt={`${title} icon`} 
                        className="w-full h-full rounded-lg sm:rounded-xl object-cover"
                      />
                    ) : (
                      <Smartphone className="w-full h-full text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        v{version}
                      </span>
                      <span>•</span>
                      <span>{formatSize(size)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-green-400" />
                        {formatDownloads(currentDownloads)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInfoPopup(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-dark-800/50 hover:bg-dark-700/50 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  {/* Info Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/25 rounded-full text-sm font-medium text-blue-300">
                    <Info className="w-4 h-4" />
                    {info}
                  </div>
                  
                  {/* Detail Text */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {info_detail}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => setShowInfoPopup(false)}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
