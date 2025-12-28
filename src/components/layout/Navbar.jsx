'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/my-bookings', label: 'My Bookings' },
]

function isActive(href, pathname) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-base-100/50 shadow-md">
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <nav className="sh-container flex h-16 items-center justify-between">
          {/* logo & brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SafeHands" width={34} height={34} />
            <span className="text-lg tracking-[0.12em] font-extrabold">
              SafeHands
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href, pathname) ? 'page' : undefined}
                  className="sh-navlink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="btn btn-sh-gradient rounded-2xl px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-sh-gradient rounded-2xl px-4 py-2"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden btn btn-ghost btn-circle"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile  Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-[72px] z-50 w-[90%] max-w-sm rounded-2xl bg-base-100/90 shadow-xl"
          >
            <ul className="p-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={
                      isActive(l.href, pathname) ? 'page' : undefined
                    }
                    className="sh-navlink block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}

              <div className="pt-4 flex flex-col gap-2 border-t border-base-300 text-center">
                <Link
                  href="/login"
                  className="btn btn-sh-gradient w-full rounded-2xl px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sh-gradient w-full rounded-2xl px-4 py-2"
                >
                  Get Started
                </Link>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
