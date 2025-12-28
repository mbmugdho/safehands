'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const STEPS = [
  {
    step: '01.',
    title: 'Choose a service',
    desc: 'Select Baby Care, Elderly Care, or Sick People Care based on your need.',
  },
  {
    step: '02.',
    title: 'Set duration & location',
    desc: 'Pick hours/days, your division, district, city, and area. Add your address.',
  },
  {
    step: '03.',
    title: 'Review total cost',
    desc: 'SafeHands calculates total cost from service charge x duration before you confirm.',
  },
  {
    step: '04.',
    title: 'Confirm & track status',
    desc: 'Your booking starts as Pending and you can track status from My Bookings.',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-5 md:py-10 ">
      <div className="sh-container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">How SafeHands works</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
            Book trusted care in <span className="text-gradient-hero">just a few steps</span>
          </h2>
          <p className="mt-4 text-base-content/70">
            We designed the booking flow to be clear and fast—so you spend less time on forms,
            and more time with your family.
          </p>
        </div>

        <motion.div
  className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: '-80px' }}
>
  {STEPS.map((s) => (
    <motion.div
      key={s.step}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="card-glass-brand p-6 
                 cursor-pointer 
                 transition-shadow duration-300 
                 hover:shadow-2xl"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-brand-soft">
          {s.step}
        </span>
        <h3 className="text-base md:text-lg font-semibold text-brand-deep">
          {s.title}
        </h3>
      </div>

      <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
        {s.desc}
      </p>
    </motion.div>
  ))}
</motion.div>

      </div>
    </section>
  )
}