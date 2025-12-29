'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const statusClass = {
  Completed: 'badge badge-success',
  Cancelled: 'badge badge-error',
}

export default function AdminHistoryPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

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
      console.error('Admin history load error', err)
      setError('Something went wrong. Please try again.')
      setBookings([])
    } finally {
      setLoading(false)
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
            You don&apos;t have permission to view this page.
          </p>
          <Link href="/" className="btn-sh-gradient">
            Go back home
          </Link>
        </div>
      </section>
    )
  }

  const completedBookings = bookings.filter((b) => b.status === 'Completed')

  const filteredByDate = selectedDate
    ? completedBookings.filter((b) => {
        const dateOnly = new Date(b.createdAt).toISOString().slice(0, 10)
        return dateOnly === selectedDate
      })
    : completedBookings

  const totalCount = filteredByDate.length
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginated = filteredByDate.slice(startIndex, startIndex + itemsPerPage)

  function handleDateChange(e) {
    setSelectedDate(e.target.value)
    setPage(1)
  }

  function handlePrev() {
    setPage((p) => Math.max(1, p - 1))
  }

  function handleNext() {
    setPage((p) => Math.min(totalPages, p + 1))
  }

  return (
    <section className="min-h-[70vh] py-16 md:py-24">
      <div className="sh-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="badge badge-success uppercase tracking-[0.18em] font-bold mb-4">
              Service History
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-brand-deep">
              Completed <span className="text-gradient-hero">SafeHands</span>{' '}
              services
            </h1>
            <p className="mt-2 text-base-content/70">
              Review all completed caregiving services. Filter by date to see
              how many services were provided on a specific day.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Link href="/admin" className="btn-sh-outline text-sm">
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <label className="text-base-content/70" htmlFor="history-date">
              Filter by date:
            </label>
            <input
              id="history-date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate('')}
                className="text-xs text-base-content/60 underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-sm text-base-content/70">
            Showing{' '}
            <span className="font-semibold text-brand-accent">
              {totalCount}
            </span>{' '}
            completed service{totalCount === 1 ? '' : 's'}
            {selectedDate && (
              <>
                {' '}
                on <span className="font-mono text-xs">{selectedDate}</span>
              </>
            )}
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

        {!loading && !error && completedBookings.length === 0 && (
          <div className="mt-12 text-center text-base-content/70">
            <p>No completed services yet.</p>
          </div>
        )}

        {!loading && !error && completedBookings.length > 0 && (
          <>
            {paginated.length === 0 && (
              <div className="mt-12 text-center text-base-content/70">
                <p>No completed services match this date filter.</p>
              </div>
            )}

            {paginated.length > 0 && (
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {paginated.map((b) => (
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

                    <div className="mt-5 flex justify-between items-center gap-3 text-xs">
                      <p className="text-base-content/60">
                        Booking ID:{' '}
                        <span className="font-mono text-[11px]">
                          {b.id.slice(-8)}
                        </span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4 text-sm">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-full border border-base-300 text-base-content/80 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-base-content/70">
                  Page <span className="font-semibold">{currentPage}</span> of{' '}
                  <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-full border border-base-300 text-base-content/80 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
