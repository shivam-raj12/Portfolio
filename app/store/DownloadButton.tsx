'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Check, AlertCircle } from 'lucide-react'
import { incrementAppDownloads } from '@/lib/appwrite'

export default function DownloadButton({ url, filename, appId, onDownloadSuccess }: { 
	url: string
	filename: string
	appId: string
	onDownloadSuccess?: () => void
}) {
	const [progress, setProgress] = useState<number | null>(null)
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	async function handleDownload() {
		try {
			setBusy(true)
			setProgress(0)
			setError(null)
			setSuccess(false)
			
			const api = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`
			const res = await fetch(api)
			
			if (!res.ok) {
				throw new Error(`Download failed: ${res.status}`)
			}
			
			if (!res.body) {
				throw new Error('No response body')
			}

			const reader = res.body.getReader()
			const totalHeader = res.headers.get('content-length')
			const total = totalHeader ? parseInt(totalHeader) : undefined
			let received = 0
			const chunks: BlobPart[] = []
			
			while (true) {
				const { done, value } = await reader.read()
				if (done) break
				if (value) {
					chunks.push(value)
					received += value.length
					if (total) {
						setProgress(Math.min(100, Math.round((received / total) * 100)))
					}
				}
			}
			
			const blob = new Blob(chunks, { type: 'application/vnd.android.package-archive' })
			const blobUrl = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = blobUrl
			a.download = filename
			document.body.appendChild(a)
			a.click()
			a.remove()
			URL.revokeObjectURL(blobUrl)
			
			setSuccess(true)
			
			// Increment download count in database
			try {
				await incrementAppDownloads(appId)
				// Call the callback to update UI if provided
				if (onDownloadSuccess) {
					onDownloadSuccess()
				}
			} catch (error) {
				console.error('Error incrementing download count:', error)
				// Don't show error to user as download was successful
			}
			
			// Reset success state after 2 seconds
			setTimeout(() => setSuccess(false), 2000)
		} catch (e) {
			console.error('Download error:', e)
			setError(e instanceof Error ? e.message : 'Download failed')
		} finally {
			setBusy(false)
			setProgress(null)
		}
	}

	return (
		<motion.button 
			onClick={handleDownload} 
			className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group text-sm sm:text-base"
			disabled={busy || success}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			{/* Progress bar */}
			{busy && progress !== null && (
				<div className="absolute inset-0 bg-primary-700/50 transition-all duration-300" style={{ width: `${progress}%` }} />
			)}
			
			{/* Button content */}
			<div className="relative z-10 flex items-center space-x-1 sm:space-x-2">
				{success ? (
					<>
						<Check className="w-4 h-4 sm:w-5 sm:h-5" />
						<span className="hidden sm:inline">Downloaded!</span>
						<span className="sm:hidden">Done!</span>
					</>
				) : error ? (
					<>
						<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
						<span>Retry</span>
					</>
				) : busy ? (
					<>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
						>
							<Download className="w-4 h-4 sm:w-5 sm:h-5" />
						</motion.div>
						<span className="hidden sm:inline">{progress !== null ? `${progress}%` : 'Downloading...'}</span>
						<span className="sm:hidden">{progress !== null ? `${progress}%` : '...'}</span>
					</>
				) : (
					<>
						<Download className="w-4 h-4 sm:w-5 sm:h-5" />
						<span className="hidden sm:inline">Download APK</span>
						<span className="sm:hidden">Download</span>
					</>
				)}
			</div>
			
			{/* Error message */}
			{error && (
				<motion.div 
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="absolute -bottom-8 left-0 right-0 text-xs text-red-400 text-center"
				>
					{error}
				</motion.div>
			)}
		</motion.button>
	)
}