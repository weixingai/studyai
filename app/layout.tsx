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
    default: 'StudyAI.WORK：你身边的最佳AI中文学习网站',
    template: '%s | StudyAI.WORK：你身边的最佳AI中文学习网站'
  },
  description: 'StudyAI.WORK 是您的专业AI学习平台，提供最新最全的ChatGPT教程、Cursor教程、Deepseek教程等AI工具使用指南。帮助您快速掌握AI技术，提升工作效率。',
  keywords: ['chatgpt教程', 'cursor教程', 'deepseek教程', 'ai编程', 'ai学习', '人工智能教程', 'AI工具使用指南', '中文AI教程'],
  authors: [{ name: '卫星', url: 'https://www.studyai.work' }],
  creator: '卫星',
  publisher: 'StudyAI.WORK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.studyai.work',
    title: 'StudyAI.WORK：你身边的最佳AI中文学习网站',
    description: 'StudyAI.WORK 是您的专业AI学习平台，提供最新最全的ChatGPT教程、Cursor教程、Deepseek教程等AI工具使用指南。',
    siteName: 'StudyAI.WORK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyAI.WORK：你身边的最佳AI中文学习网站',
    description: 'StudyAI.WORK 是您的专业AI学习平台，提供最新最全的ChatGPT教程、Cursor教程、Deepseek教程等AI工具使用指南。',
    creator: '@studyai',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'notranslate': false,
    },
  },
  alternates: {
    canonical: 'https://www.studyai.work',
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2554723342727932" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2554723342727932"
     crossOrigin="anonymous"></script>
      </head>
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
                  <NavLink href="/chatgpt" showArrow={false}>ChatGPT教程</NavLink>
                  <NavLink href="/cursor" showArrow={false}>Cursor教程</NavLink>
                  <NavLink href="/deepseek" showArrow={false}>Deepseek教程</NavLink>
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