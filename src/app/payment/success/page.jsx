'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState('loading') 
  const [message, setMessage] = useState('Processing your booking...')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setMessage('Missing payment session information.')
      return
    }

    async function completeCheckout() {
      try {
        const res = await fetch('/api/auth/checkout/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
        const data = await res.json()

        if (!res.ok) {
          setStatus('error')
          setMessage(data.error || 'Could not confirm your booking.')
          return
        }

        setStatus('success')
        setMessage('Payment successful! Your booking has been confirmed.')

        setTimeout(() => {
          router.replace('/my-bookings')
        }, 2000)
      } catch (err) {
        console.error('Complete checkout error', err)
        setStatus('error')
        setMessage('Something went wrong while confirming your booking.')
      }
    }

    completeCheckout()
  }, [sessionId, router])

  return (
    <section className="min-h-[70vh] py-16 md:py-24 flex items-center justify-center">
      <div className="sh-container max-w-md text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
            <p className="mt-4 text-base-content/80">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep">
              Payment successful
            </h1>
            <p className="mt-3 text-base-content/80">{message}</p>
            <p className="m-6 text-xs text-base-content/60">
              Redirecting you to your bookings...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep">
              Something went wrong
            </h1>
            <p className="mt-3 mb-4 text-base-content/80">{message}</p>
            <Link href="/my-bookings" className="btn-sh-outline mt-4">
              Go to My Bookings
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
