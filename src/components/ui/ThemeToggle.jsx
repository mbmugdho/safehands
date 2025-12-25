'use client'

import { useEffect, useState } from 'react'

const LIGHT = 'safehandsLight'
const DARK = 'safehandsDark'
const STORAGE_KEY = 'safehands-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return LIGHT
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === LIGHT || saved === DARK) return saved
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? DARK : LIGHT
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState(LIGHT)

  useEffect(() => {
    const t = getInitialTheme()
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme, mounted])

  if (!mounted) {
    return (
      <button
        type="button"
        className="btn btn-ghost btn-circle"
        disabled
        aria-label="Toggle theme"
      />
    )
  }

  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === DARK ? LIGHT : DARK))}
    >
      {theme === DARK ? 'Light' : 'Dark'}
    </button>
  )
}
