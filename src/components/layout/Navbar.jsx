'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/my-bookings', label: 'My Bookings' },
]

function isActiveLink(href, pathname) {
  if (href === '/') return pathname === '/'
  if (pathname === href) return true
  if (pathname.startsWith(`${href}/`)) return true
  return false
}

function NavLinkItem({ href, label, pathname, onClick }) {
  const active = isActiveLink(href, pathname)

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="sh-navlink"
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </Link>
    </li>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navProps = useMemo(() => ({ pathname }), [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!open) return
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-base-100/50 shadow-md">
      <nav className="sh-container flex items-center justify-between py-3">
        {/*left side with logo*/}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="SafeHands Logo"
              width={36}
              height={32}
              priority
            />
            <span className="text-lg md:text-xl font-bold tracking-tight text-primary">
              SafeHands
            </span>
          </Link>
        </div>

        {/* center for desktop menu */}
        <div className="hidden lg:flex">
          <ul className="flex justify-center gap-5">
            {LINKS.map((l) => (
              <NavLinkItem
                key={l.href}
                href={l.href}
                label={l.label}
                {...navProps}
              />
            ))}
          </ul>
        </div>

        {/* right side: themetoggle+auth buttons */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="btn py-2 px-5 rounded-2xl btn-sh-gradient "
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn py-2 px-5 rounded-2xl btn-sh-gradient "
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger  on RIGHT */}
          <div className="relative lg:hidden" ref={dropdownRef}>
            <button
              type="button"
              className="btn btn-ghost btn-circle"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {open && (
              <ul className="menu menu-sm absolute right-0 mt-3 z-[60] p-3 rounded-2xl bg-base-100 shadow-lg w-64">
                {LINKS.map((l) => (
                  <NavLinkItem
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    {...navProps}
                    onClick={closeMenu}
                  />
                ))}

                <div className="m-2 flex flex-col gap-5">
                  <li className="mt-2">
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="btn py-2 px-5 rounded-2xl btn-sh-gradient w-full"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="btn py-2 px-5 rounded-2xl btn-sh-gradient w-full"
                    >
                      Get Started
                    </Link>
                  </li>
                </div>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
