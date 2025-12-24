'use client'

import { useEffect, useState } from 'react'

const LIGHT = 'safehandsLight'
const DARK = 'safehandsDark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(LIGHT)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || LIGHT
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggle = () => {
    const next = theme === LIGHT ? DARK : LIGHT
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={toggle}>
      {theme === LIGHT ? 'Dark' : 'Light'}
    </button>
  )
}
