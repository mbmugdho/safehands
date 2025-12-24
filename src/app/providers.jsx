'use client'

import PageTransition from '@/components/animation/PageTransition'

export default function Providers({ children }) {
  return <PageTransition>{children}</PageTransition>
}
