'use client'

import Link from 'next/link'
import { Mail, Lock, User } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirect = searchParams.get('redirect') || '/'

  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(res.error)
      return
    }

    router.push(redirect)
  }

  return (
    <section className="auth-page relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#003060] via-[#0E86D4] to-[#68BBE3]">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-3xl bg-white/10 border border-white/25 backdrop-blur-2xl shadow-2xl px-8 py-10 md:px-10 md:py-12 text-white">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-white/15 flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-white/60">
              Welcome back to
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-wide">
              SafeHands Login
            </h1>
          </div>

          {error && (
            <p className="mt-4 text-xs text-center text-red-200 bg-red-500/20 rounded-full px-3 py-1">
              {error}
            </p>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
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

            <div>
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
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/80">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs border-white/60 [--chkbg:#0E86D4] [--chkfg:white]"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-sh-gradient w-full mt-2 justify-center"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-xs text-center text-white/80">
            <span>New to SafeHands? </span>
            <Link href="/register" className="font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
