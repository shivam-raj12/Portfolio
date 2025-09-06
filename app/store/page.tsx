import {ArrowLeft, Download, Smartphone, Star} from 'lucide-react'
import Link from 'next/link'
import {type App, getAllApps} from '@/lib/appwrite'
import AppCard from './AppCard'
import {TbApps} from "react-icons/tb";
import {formatDownloads} from "@/lib/blogUtils";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

async function fetchApps(): Promise<App[]> {
	try {
        return await getAllApps()
	} catch (error) {
		console.error('Error fetching apps:', error)
		return []
	}
}

export default async function Store() {
	// Force fresh data fetch
	const apps = await fetchApps()

    let totalDownloads = apps.reduce((sum, app) => sum + app.downloads, 0);

    return (
		<div className="bg-dark-950 relative overflow-hidden">
			{/* Background Effects */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
			</div>

			<header className="bg-dark-900/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 shadow-2xl">
				<div className="container-custom px-4 py-3 sm:py-6">
					{/* Mobile Layout */}
					<div className="block sm:hidden">
						<div className="flex items-center justify-between mb-3">
							<Link href="/" className="group flex items-center space-x-2 text-white hover:text-primary-400 transition-all duration-300">
								<div className="p-1.5 rounded-lg bg-dark-800/50 group-hover:bg-primary-500/20 transition-colors">
									<ArrowLeft className="w-4 h-4" />
								</div>
								<span className="text-sm font-medium">Back</span>
							</Link>
							<div className="flex items-center space-x-1.5 text-gray-400">
								<TbApps className="w-3.5 h-3.5" />
								<span className="text-xs">{apps.length} Apps</span>
							</div>
						</div>
						<div className="text-center">
							<div className="flex items-center justify-center space-x-2 mb-1">
								<div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
									<Smartphone className="w-5 h-5 text-white" />
								</div>
								<h1 className="text-lg font-bold gradient-text">My App Store</h1>
							</div>
							<p className="text-gray-400 text-xs">Discover and download my Android applications</p>
						</div>
					</div>

					{/* Desktop Layout */}
					<div className="hidden sm:flex items-center justify-between">
						<Link href="/" className="group flex items-center space-x-3 text-white hover:text-primary-400 transition-all duration-300">
							<div className="p-2 rounded-lg bg-dark-800/50 group-hover:bg-primary-500/20 transition-colors">
								<ArrowLeft className="w-5 h-5" />
							</div>
							<span className="text-lg font-semibold">Back to Portfolio</span>
						</Link>
						
						<div className="text-center">
							<div className="flex items-center justify-center space-x-3 mb-2">
								<div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
									<Smartphone className="w-8 h-8 text-white" />
								</div>
								<h1 className="text-3xl font-bold gradient-text">My App Store</h1>
							</div>
							<p className="text-gray-400 text-sm">Discover and download my Android applications</p>
						</div>
						
						<div className="flex items-center space-x-2 text-gray-400">
							<TbApps className="w-4 h-4" />
							<span className="text-sm">{apps.length} Apps</span>
						</div>
					</div>
				</div>
			</header>

			<div className="container-custom px-4 py-12">
				{apps.length === 0 ? (
					<div className="text-center py-20">
						<div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
							<Smartphone className="w-12 h-12 text-primary-400" />
						</div>
						<h3 className="text-2xl font-bold text-white mb-4">No Apps Available</h3>
						<p className="text-gray-400 max-w-md mx-auto">
							I'm currently working on some amazing apps. Check back soon for new releases!
						</p>
					</div>
				) : (
					<div className="space-y-6 sm:space-y-8">
						{/* Stats Header */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
							<div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20 backdrop-blur-sm">
								<div className="flex items-center space-x-3">
									<div className="p-2 rounded-lg bg-primary-500/20">
										<Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
									</div>
									<div>
										<div className="text-xl sm:text-2xl font-bold text-white">{apps.length}</div>
										<div className="text-xs sm:text-sm text-gray-400">Total Apps</div>
									</div>
								</div>
							</div>
							<div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent-500/10 to-accent-600/5 border border-accent-500/20 backdrop-blur-sm">
								<div className="flex items-center space-x-3">
									<div className="p-2 rounded-lg bg-accent-500/20">
										<Download className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" />
									</div>
									<div>
										<div className="text-xl sm:text-2xl font-bold text-white">{formatDownloads(totalDownloads)}</div>
										<div className="text-xs sm:text-sm text-gray-400">Total Downloads</div>
									</div>
								</div>
							</div>
							<div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
								<div className="flex items-center space-x-3">
									<div className="p-2 rounded-lg bg-green-500/20">
										<Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
									</div>
									<div>
										<div className="text-xl sm:text-2xl font-bold text-white">Free</div>
										<div className="text-xs sm:text-sm text-gray-400">All Apps</div>
									</div>
								</div>
							</div>
						</div>

						{/* Apps List */}
						<div className="space-y-6">
							{apps.map((app) => (
								<AppCard
									key={app.$id}
									appId={app.$id}
									title={app.title}
									description={app.description}
									version={app.version}
									features={app.features}
									downloadLink={app.downloadLink}
									icon={app.icon}
									size={app.size}
									downloads={app.downloads}
									info={app.info}
									info_detail={app.info_detail}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}