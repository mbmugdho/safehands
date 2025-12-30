'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Sylhet',
  'Barishal',
  'Rangpur',
  'Mymensingh',
]

const SHIFT_HOURS = 8

export default function BookingForm({ service, billingMode }) {
  const router = useRouter()

  const [durationUnit, setDurationUnit] = useState('hours')
  const [durationValue, setDurationValue] = useState(1)

  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (billingMode === 'shift') {
      setDurationUnit('days')
    }
  }, [billingMode])

  const parsedDuration = Number(durationValue)

  let totalCost = 0
  if (parsedDuration > 0) {
    if (billingMode === 'hourly') {
      if (durationUnit === 'hours') {
        totalCost = parsedDuration * service.pricePerHour
      } else {
        const totalHours = parsedDuration * SHIFT_HOURS
        totalCost = totalHours * service.pricePerHour
      }
    } else {
      totalCost = parsedDuration * service.pricePerDay
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!parsedDuration || parsedDuration <= 0) {
      setError('Please enter a valid duration.')
      return
    }

    if (!division || !district || !city || !area || !address) {
      setError('Please fill in all location fields.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          billingMode, 
          durationUnit, 
          durationValue: parsedDuration,
          division,
          district,
          city,
          area,
          address,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to start payment.')
        setLoading(false)
        return
      }

      window.location = data.url
    } catch (err) {
      console.error('Checkout submit error', err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const durationSummary =
    parsedDuration > 0
      ? billingMode === 'hourly'
        ? `${parsedDuration} ${durationUnit}`
        : `${parsedDuration} day${parsedDuration > 1 ? 's' : ''} (shift)`
      : 'Select duration'

  return (
    <aside className="card-glass-brand p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-brand-deep">Booking details</h2>
      <p className="mt-1 text-sm text-base-content/70">
        Select billing type, duration, and your location. You will see the total
        before confirming.
      </p>

      <p className="mt-3 text-xs text-base-content/60">
        Selected plan:{' '}
        <span className="font-semibold text-brand-main">
          {billingMode === 'hourly' ? 'Hourly rate' : 'Shift (per day)'}
        </span>
      </p>

      {error && (
        <p className="mt-4 text-xs text-red-600 bg-red-100 rounded-full px-3 py-2">
          {error}
        </p>
      )}

      <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="text-xs font-semibold text-base-content/70 uppercase">
            Duration
          </p>

          <div className="mt-2 flex gap-2">
            {billingMode === 'hourly' && (
              <>
                <button
                  type="button"
                  onClick={() => setDurationUnit('hours')}
                  className={`flex-1 px-3 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                    durationUnit === 'hours'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-base-100/80 border-base-200 text-base-content/80'
                  }`}
                >
                  Hours
                </button>
                <button
                  type="button"
                  onClick={() => setDurationUnit('days')}
                  className={`flex-1 px-3 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                    durationUnit === 'days'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-base-100/80 border-base-200 text-base-content/80'
                  }`}
                >
                  Days
                </button>
              </>
            )}

            {billingMode === 'shift' && (
              <button
                type="button"
                className="flex-1 px-3 py-2 rounded-full text-xs font-semibold border bg-primary text-white border-primary cursor-default"
              >
                Days
              </button>
            )}
          </div>

          <input
            type="number"
            min={1}
            value={durationValue}
            onChange={(e) => setDurationValue(e.target.value)}
            className="mt-3 w-full rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder={
              billingMode === 'hourly'
                ? `Enter number of ${durationUnit}`
                : 'Enter number of days'
            }
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-base-content/70 uppercase">
            Location
          </p>

          <select
            className="mt-2 w-full rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="">Select division</option>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="mt-2 w-full rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <input
            type="text"
            className="mt-2 w-full rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            className="mt-2 w-full rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <textarea
            className="mt-2 w-full rounded-xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="Full address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="rounded-2xl bg-base-100/80 border border-base-200 px-4 py-3 text-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-base-content/60">Estimated total</p>
            <p className="mt-1 text-lg font-semibold text-brand-deep">
              {totalCost ? `$${totalCost.toFixed(2)}` : '--'}
            </p>
          </div>
          <p className="text-xs text-base-content/60 text-right">
            {durationSummary}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-sh-gradient w-full justify-center disabled:opacity-70"
        >
          {loading ? 'Creating booking...' : 'Confirm booking'}
        </button>
      </form>
    </aside>
  )
}
