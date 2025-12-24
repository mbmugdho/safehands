import './globals.css'
import Providers from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SafeHands',
  description: 'Trusted baby sitting & elderly care service platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="safehandsLight">
      <body className={inter.className}>
        <Providers>
          {/* Phase 2 will place Navbar/Footer outside this <main> */}
          <main className="safehands-main-bg min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
