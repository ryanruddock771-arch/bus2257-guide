import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'BUS 2257E — The Honest Guide | Western University',
  description:
    'An upper-year student\'s honest advice on Western University\'s BUS 2257E — Financial and Managerial Accounting. Covering the Midterm, Midyear, Feasibility Project, Final, and Participation.',
  openGraph: {
    title: 'BUS 2257E — The Honest Guide',
    description: 'Honest advice on Western\'s BUS 2257E from an upper-year Ivey student.',
    siteName: 'BUS 2257E Guide',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
