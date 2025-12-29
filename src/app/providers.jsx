'use client'

import PageTransition from '@/components/animation/PageTransition'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <PageTransition>{children}</PageTransition>
    </SessionProvider>
  ) 
}
