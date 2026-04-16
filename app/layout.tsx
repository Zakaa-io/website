import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'Zakaa | ذكاء - Intelligent IT Solutions',
  description: 'Zakaa provides intelligent IT solutions including cloud services, DevOps, Big Data, security, programming, and AI tools. Your trusted technology partner.',
  keywords: ['IT services', 'cloud computing', 'DevOps', 'Big Data', 'cybersecurity', 'AI', 'programming', 'hosting'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${ibmPlexArabic.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
