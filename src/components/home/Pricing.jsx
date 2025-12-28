'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const PLANS = [
  {
    name: 'Hourly Care',
    price: '$15',
    unit: '/hour',
    badge: 'Flexible',
    highlight: 'Best for short visits & flexible schedules',
    features: [
      'Minimum 3 hours per booking',
      'Ideal for appointments or quick support',
      'Choose baby, elderly, or sick care',
    ],
    featured: false,
  },
  {
    name: 'Day Shift (8 hours)',
    price: '$90',
    unit: '/day',
    badge: 'Most booked',
    highlight: 'Perfect for daytime home assistance',
    features: [
      '8 hours continuous care',
      'Support with meals, medication, and mobility',
      'Suitable for both children and elderly',
    ],
    featured: true,
  },
  {
    name: 'Night Shift (8 hours)',
    price: '$105',
    unit: '/night',
    badge: 'Night care',
    highlight: 'Overnight safety & supervision',
    features: [
      '8 hours overnight monitoring',
      'Ideal for post-hospital or elderly care',
      'Emergency support & companionship',
    ],
    featured: false,
  },
  {
    name: '24/7 Live-in Care',
    price: '$650',
    unit: '/week',
    badge: 'Premium',
    highlight: 'Continuous care for complex needs',
    features: [
      'Caregiver stays with family full-time',
      'Best for high-dependency patients',
      'Rotational caregivers can be arranged',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className="relative py-5 md:py-10 ">
      <div className="sh-container text-center">
        <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">
          Transparent Pricing
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
          <span className="text-gradient-hero">Fair pricing </span> for reliable
          home care
        </h2>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          All plans are calculated per caregiver. Final cost in your booking
          will always be based on <strong>service type × duration</strong>,
          clearly shown before you confirm.
        </p>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className={`card-glass-brand p-6 flex flex-col justify-between
        cursor-pointer
        transition-shadow duration-300
        hover:shadow-2xl
        ${plan.featured ? 'ring-2 ring-primary/60' : ''}
      `}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-brand-deep">
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className="badge badge-sm badge-primary badge-outline">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-base-content/70">
                {plan.highlight}
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">
                  {plan.price}
                </span>
                <span className="text-sm text-base-content/60">
                  {plan.unit}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-left text-sm text-base-content/70">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 items-start">
                    <Check
                      size={16}
                      className={`mt-[2px] shrink-0 ${
                        plan.featured
                          ? 'text-primary drop-shadow-sm'
                          : 'text-primary/80'
                      }`}
                    />

                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href="/services"
                  className="btn btn-sh-outline w-full text-sm"
                >
                  View related services
                </Link>
                <Link
                  href="/services"
                  className="btn btn-sh-gradient w-full text-sm"
                >
                  Start a booking
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
