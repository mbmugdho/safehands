'use client'

import { useState } from 'react'
import BookingForm from './BookingForm'
import { motion } from 'framer-motion'

export default function BookingClient({ service }) {
  const [billingMode, setBillingMode] = useState('hourly')

  return (
    <section className="min-h-[70vh] py-16 md:py-24">
      <div className="sh-container grid gap-10 lg:grid-cols-[1.3fr,1.1fr] items-start">
        <div>
          <p className="badge badge-info uppercase tracking-[0.18em] font-bold text-sm mb-3">
            {service.category}
          </p>

          <h1 className="text-2xl md:text-4xl font-extrabold text-brand-deep">
            Book {service.name}
          </h1>

          <p className="mt-3 text-base-content/70">
            {service.shortDescription}
          </p>

          <h2 className="mt-6 text-lg font-semibold text-brand-deep">
            What you get
          </h2>
          <p className="mt-2 text-base-content/80 leading-relaxed">
            {service.description}
          </p>

          {service.tags?.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-semibold text-brand-main">
                Included support:
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs text-base-content/80">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 rounded-full bg-base-100/80 border border-base-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 grid grid-cols-2 max-w-sm gap-4 text-sm">
            <motion.button
              type="button"
              onClick={() => setBillingMode('hourly')}
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              className={`card-glass-brand p-4 text-left cursor-pointer transition
      ${billingMode === 'hourly' ? 'card-glass-selected' : ''}`}
            >
              <p className="text-xs text-base-content/60 font-semibold">
                Hourly
              </p>
              <p className="mt-1 font-semibold text-brand-accent">
                ${service.pricePerHour}/hour
              </p>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setBillingMode('shift')}
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              className={`card-glass-brand p-4 text-left cursor-pointer transition
      ${billingMode === 'shift' ? 'card-glass-selected' : ''}`}
            >
              <p className="text-xs text-base-content/60 font-semibold">
                Day shift (8 hours)
              </p>
              <p className="mt-1 font-semibold text-brand-accent">
                ${service.pricePerDay}/day
              </p>
            </motion.button>
          </div>
        </div>

        <BookingForm service={service} billingMode={billingMode} />
      </div>
    </section>
  )
}
