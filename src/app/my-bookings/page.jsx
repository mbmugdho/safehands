'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'

const statusClass = {
  Pending: 'badge badge-warning',
  Confirmed: 'badge badge-info',
  Completed: 'badge badge-success',
  Cancelled: 'badge badge-error',
}

const CLEARABLE_STATUSES = ['Completed', 'Cancelled']

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadBookings() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/bookings', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to load bookings.')
        setBookings([])
      } else {
        setBookings(data.bookings || [])
      }
    } catch (err) {
      console.error('Load bookings error', err)
      setError('Something went wrong. Please try again.')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-sh-outline mx-1',
        cancelButton: 'btn btn-error btn-sh-outline mx-1',
      },
      buttonsStyling: false,
    })

    const result = await swalWithBootstrapButtons.fire({
      title: 'Cancel this booking?',
      text: "You won't be able to revert this action.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      try {
        const res = await fetch('/api/auth/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: id }),
        })
        const data = await res.json()

        if (!res.ok) {
          await swalWithBootstrapButtons.fire({
            title: 'Cancel failed',
            text: data.error || 'Failed to cancel booking.',
            icon: 'error',
          })
          return
        }

        await swalWithBootstrapButtons.fire({
          title: 'Cancelled!',
          text: 'Your booking has been cancelled.',
          icon: 'success',
        })

        await loadBookings()
      } catch (err) {
        console.error('Cancel booking error', err)
        await swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
        })
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: 'Cancelled',
        text: 'Your booking is safe.',
        icon: 'error',
      })
    }
  }

  async function handleClearHistory() {
    const clearableIds = bookings
      .filter((b) => CLEARABLE_STATUSES.includes(b.status))
      .map((b) => b.id)

    if (clearableIds.length === 0) {
      await Swal.fire({
        title: 'Nothing to clear',
        text: 'You have no completed or cancelled bookings to remove.',
        icon: 'info',
      })
      return
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-sh-outline mx-1',
        cancelButton: 'btn btn-error btn-sh-outline mx-1',
      },
      buttonsStyling: false,
    })

    const result = await swalWithBootstrapButtons.fire({
      title: 'Clear booking history?',
      text: 'All completed and cancelled bookings will be removed from this page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear history',
      cancelButtonText: 'No, keep them',
      reverseButtons: true,
    })

    if (!result.isConfirmed) return

    try {
      
      const res = await fetch('/api/auth/bookings/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingIds: clearableIds }),
      })
      const data = await res.json()

      if (!res.ok) {
        await swalWithBootstrapButtons.fire({
          title: 'Clear failed',
          text: data.error || 'Failed to clear booking history.',
          icon: 'error',
        })
        return
      }

      await swalWithBootstrapButtons.fire({
        title: 'History cleared',
        text: 'Completed and cancelled bookings have been removed.',
        icon: 'success',
      })

      await loadBookings()
    } catch (err) {
      console.error('Clear history error', err)
      await swalWithBootstrapButtons.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
      })
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const hasClearable = bookings.some((b) =>
    CLEARABLE_STATUSES.includes(b.status)
  )

  return (
    <section className="min-h-[70vh] py-16 md:py-24">
      <div className="sh-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="badge badge-info mb-4">My Bookings</p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-brand-deep">
              Track your <span className="text-gradient-hero">SafeHands</span>{' '}
              bookings
            </h1>
            <p className="mt-2 text-base-content/70">
              View your caregiving bookings, check their status, and cancel
              pending ones. Completed and cancelled bookings can be cleared from
              this page.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            {hasClearable && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="btn-sh-outline text-xs md:text-sm"
              >
                Clear completed & cancelled
              </button>
            )}
            <Link
              href="/services"
              className="btn-sh-outline text-xs md:text-sm"
            >
              Browse more services
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

        {!loading && !error && bookings.length === 0 && (
          <div className="mt-12 text-center text-base-content/70">
            <p>You do not have any bookings yet.</p>
            <p className="mt-2">
              <Link href="/services" className="btn-sh-gradient text-sm">
                Go to services
              </Link>
            </p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {bookings.map((b) => (
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

                  {b.status === 'Pending' && (
                    <button
                      type="button"
                      onClick={() => handleCancel(b.id)}
                      className="px-3 py-1 rounded-full border border-red-300 text-red-700 hover:bg-red-50"
                    >
                      Cancel
                    </button>
                  )}

                  {b.status === 'Confirmed' && (
                    <button
                      type="button"
                      disabled
                      className="px-3 py-1 rounded-full border border-sky-300 text-sky-700 bg-sky-50 cursor-default"
                    >
                      Confirmed
                    </button>
                  )}

                  {b.status === 'Completed' && (
                    <button
                      type="button"
                      disabled
                      className="px-3 py-1 rounded-full border border-emerald-300 text-emerald-700 bg-emerald-50 cursor-default"
                    >
                      Completed
                    </button>
                  )}

                  {b.status === 'Cancelled' && (
                    <button
                      type="button"
                      disabled
                      className="px-3 py-1 rounded-full border border-rose-300 text-rose-700 bg-rose-50 cursor-default"
                    >
                      Cancelled
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
