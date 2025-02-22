import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import NavLink from './components/NavLink'
import Footer from './components/Footer'
import { FloatingAds } from './components/ads/FloatingAds'
import { floatingAdsConfig } from '@/lib/config/floating-ads'
import { Icons } from './components/shared/icons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'StudyAI.TOP：你身边的最佳AI中文学习网站',
    template: '%s | StudyAI.TOP：你身边的最佳AI中文学习网站'
  },
  description: 'tudyAI.TOP：你身边的最佳AI中文学习网站',
  keywords: ['chatgpt', 'cursor', 'deepseek', 'ai编程'],
  authors: [{ name: '卫星' }],
  creator: '卫星',
  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-green-600 font-bold text-2xl flex items-center">
                  <Icons.Logo className="w-8 h-8 mr-2 text-green-600" />
                  StudyAI
                </Link>
                <div className="flex space-x-6">
                  <NavLink href="/chatgpt">ChatGPT教程</NavLink>
                  <NavLink href="/cursor">Cursor教程</NavLink>
                  <NavLink href="/deepseek">Deepseek教程</NavLink>
                </div>
              </div>
            </nav>
          </header>

          <FloatingAds config={floatingAdsConfig} />

          <main className="flex-grow pt-16">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
} 