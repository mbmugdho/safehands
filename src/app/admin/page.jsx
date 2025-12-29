'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const statusClass = {
  Pending: 'badge badge-warning',
  Confirmed: 'badge badge-info',
  Completed: 'badge badge-success',
  Cancelled: 'badge badge-error',
}

export default function AdminDashboardPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const isAdmin = session?.user?.role === 'admin'

  async function loadBookings() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/admin', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to load bookings.')
        setBookings([])
      } else {
        setBookings(data.bookings || [])
      }
    } catch (err) {
      console.error('Admin load bookings error', err)
      setError('Something went wrong. Please try again.')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(bookingId, newStatus) {
    setUpdatingId(bookingId)
    setError('')

    try {
      const res = await fetch('/api/auth/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to update booking status.')
        return
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      )
    } catch (err) {
      console.error('Admin update status error', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    if (sessionStatus === 'authenticated' && isAdmin) {
      loadBookings()
    } else if (sessionStatus === 'authenticated' && !isAdmin) {
      setLoading(false)
    }
  }, [sessionStatus, isAdmin])

  if (sessionStatus === 'loading') {
    return (
      <section className="min-h-[70vh] py-16 md:py-24 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </section>
    )
  }

  if (!isAdmin) {
    return (
      <section className="min-h-[70vh] py-16 md:py-24">
        <div className="sh-container text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep mb-2">
            Admin access only
          </h1>
          <p className="text-base-content/70 mb-4">
            You do not have permission to view this page.
          </p>
          <Link href="/" className="btn-sh-gradient">
            Go back home
          </Link>
        </div>
      </section>
    )
  }

  const activeBookings = bookings.filter(
    (b) => b.status === 'Pending' || b.status === 'Confirmed'
  )

  return (
    <section className="min-h-[70vh] py-16 md:py-24">
      <div className="sh-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="badge badge-info uppercase tracking-[0.18em] font-bold mb-4">
              Admin Dashboard
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-brand-deep">
              Manage <span className="text-gradient-hero">SafeHands</span>{' '}
              bookings
            </h1>
            <p className="mt-2 text-base-content/70">
              Review incoming bookings, confirm or cancel them, and complete
              finished services. Completed services move to history.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap justify-end">
            <Link href="/admin/history" className="btn-sh-outline text-sm">
              View history
            </Link>
            <Link href="/" className="btn-sh-outline text-sm">
              Go to Home
            </Link>
          </div>
        </div>

        {loading && (
          <div className="mt-10 flex justify-center">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-xl bg-red-100 border border-red-300 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && activeBookings.length === 0 && (
          <div className="mt-12 text-center text-base-content/70">
            <p>No pending or confirmed bookings right now.</p>
          </div>
        )}

        {!loading && !error && activeBookings.length > 0 && (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {activeBookings.map((b) => (
              <article
                key={b.id}
                className="card-glass-brand p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base md:text-lg font-semibold text-brand-deep">
                      {b.serviceName}
                    </h2>
                    <span
                      className={
                        statusClass[b.status] ||
                        'badge badge-outline badge-sm text-xs'
                      }
                    >
                      {b.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-base-content/70">
                    {b.userName} ({b.userEmail})
                  </p>

                  <p className="mt-1 text-xs text-base-content/60">
                    {new Date(b.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-4 text-xs">
                    <p className="text-base-content/60">Duration</p>
                    <p className="font-semibold text-brand-main">
                      {b.duration}
                    </p>
                    <p className="mt-1 text-base-content/70">
                      Total:{' '}
                      <span className="font-semibold text-brand-accent">
                        $
                        {typeof b.totalCost === 'number'
                          ? b.totalCost.toFixed(2)
                          : b.totalCost}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 text-xs text-base-content/70">
                    <p className="text-base-content/60">Location</p>
                    <p>
                      {b.area}, {b.city}, {b.district}, {b.division}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-base-content/60">
                      Booking ID:{' '}
                      <span className="font-mono text-[11px]">
                        {b.id.slice(-8)}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {b.status === 'Pending' && (
                      <>
                        <button
                          type="button"
                          disabled={updatingId === b.id}
                          onClick={() => handleStatusChange(b.id, 'Confirmed')}
                          className={`px-3 py-1 rounded-full border text-xs transition border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 ${
                            updatingId === b.id ? 'opacity-60 cursor-wait' : ''
                          }`}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === b.id}
                          onClick={() => handleStatusChange(b.id, 'Cancelled')}
                          className={`px-3 py-1 rounded-full border text-xs transition border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 ${
                            updatingId === b.id ? 'opacity-60 cursor-wait' : ''
                          }`}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {b.status === 'Confirmed' && (
                      <button
                        type="button"
                        disabled={updatingId === b.id}
                        onClick={() => handleStatusChange(b.id, 'Completed')}
                        className={`px-3 py-1 rounded-full border text-xs transition border-sky-300 text-sky-700 bg-sky-50 hover:bg-sky-100 ${
                          updatingId === b.id ? 'opacity-60 cursor-wait' : ''
                        }`}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
