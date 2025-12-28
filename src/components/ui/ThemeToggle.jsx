'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const LIGHT = 'safehandsLight'
const DARK = 'safehandsDark'
const STORAGE_KEY = 'safehands-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return LIGHT

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === LIGHT || saved === DARK) return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? DARK
    : LIGHT
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState(LIGHT)

  useEffect(() => {
    const initial = getInitialTheme()
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
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
        aria-label="Toggle theme"
        className="btn btn-ghost btn-circle w-10 h-10 opacity-0"
      />
    )
  }

  const isDark = theme === DARK

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? LIGHT : DARK)}
      className="btn btn-ghost btn-circle w-10 h-10 shrink-0 transition hover:bg-base-200"
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-sky-500" />
      )}
    </button>
  )
}
