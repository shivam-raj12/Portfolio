import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import OfflineIndicator from '@/components/OfflineIndicator'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shivam Raj - Android Developer',
  description: 'Experienced Android Developer with 4+ years of expertise in mobile app development, Kotlin, Java, and modern Android technologies.',
  keywords: ['Android Developer', 'Mobile App Development', 'Kotlin', 'Java', 'Android Studio', 'Portfolio'],
  authors: [{ name: 'Shivam Raj' }],
  creator: 'Shivam Raj',
  openGraph: {
    title: 'Shivam Raj - Android Developer',
    description: 'Experienced Android Developer with 4+ years of expertise in mobile app development',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <OfflineIndicator />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
