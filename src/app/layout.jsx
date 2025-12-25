import './globals.css'
import Providers from './providers'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SafeHands',
  description: 'Trusted baby sitting & elderly care service platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="safehandsLight">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />

        {/* gradient only here */}
        <main className="safehands-main-bg flex-1">
          <Providers>{children}</Providers>
        </main>

        <Footer />
      </body>
    </html>
  )
}
