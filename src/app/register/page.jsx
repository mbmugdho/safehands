'use client'

import Link from 'next/link'
import { IdCard, User, Mail, Phone, Lock } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const body = {
      nid: formData.get('nid'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }

    if (body.password !== body.confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Registration failed.')
      setLoading(false)
      return
    }

  
    router.push(`/login?redirect=${encodeURIComponent(redirect)}`)
  }

  return (
    <section className="auth-page relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#003060] via-[#0E86D4] to-[#68BBE3]">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-xl px-4">
        <div className="rounded-3xl bg-white/10 border border-white/25 backdrop-blur-2xl shadow-2xl px-8 py-10 md:px-10 md:py-12 text-white">
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-white/60">
              Create your account
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-wide">
              Join SafeHands
            </h1>
            <p className="mt-2 text-xs text-white/80">
              Book trusted baby sitting, elderly care, and home support
              services.
            </p>
          </div>

          {error && (
            <p className="mt-4 text-xs text-center text-red-200 bg-red-500/20 rounded-full px-3 py-1">
              {error}
            </p>
          )}

          <form
            className="mt-8 grid gap-6 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-1">
              <label className="text-xs uppercase tracking-wide text-white/70">
                NID Number
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-white/40 focus-within:border-white transition-colors py-2">
                <IdCard size={16} className="text-white/80" />
                <input
                  type="text"
                  name="nid"
                  placeholder="Your NID number"
                  className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-white/60"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="text-xs uppercase tracking-wide text-white/70">
                Full Name
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-white/40 focus-within:border-white transition-colors py-2">
                <User size={16} className="text-white/80" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-white/60"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="text-xs uppercase tracking-wide text-white/70">
                Email
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-white/40 focus-within:border-white transition-colors py-2">
                <Mail size={16} className="text-white/80" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-white/60"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="text-xs uppercase tracking-wide text-white/70">
                Contact Number
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-white/40 focus-within:border-white transition-colors py-2">
                <Phone size={16} className="text-white/80" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+8801XXXXXXXXX"
                  className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-white/60"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="text-xs uppercase tracking-wide text-white/70">
                Password
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-white/40 focus-within:border-white transition-colors py-2">
                <Lock size={16} className="text-white/80" />
                <input
                  type="password"
                  name="password"
                  placeholder="*******"
                  className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-white/60"
                  autoComplete="new-password"
                  required
                />
              </div>
              <p className="mt-2 text-[11px] text-white/75">
                Must be at least 6 characters, with at least 1 uppercase and 1
                lowercase letter.
              </p>
            </div>

           
            <div className="md:col-span-1">
              <label className="text-xs uppercase tracking-wide text-white/70">
                Confirm Password
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-white/40 focus-within:border-white transition-colors py-2">
                <Lock size={16} className="text-white/80" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-white/60"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

           
            <div className="md:col-span-2 mt-4 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-sh-gradient w-full justify-center disabled:opacity-70"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
              <p className="text-xs text-center text-white/80">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
