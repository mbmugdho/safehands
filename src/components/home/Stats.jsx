'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

const stats = [
  {
    title: 'Families served',
    value: '1k+',
    desc: 'Trusted bookings completed through SafeHands.',
  },
  {
    title: 'Avg. booking time',
    value: '2 min',
    desc: 'From choosing service to confirming your booking.',
  },
  {
    title: 'Support',
    value: '24/7',
    desc: 'We are here to help around the clock.',
  },
]

export default function Stats() {
  return (
    <section className="relative py-5 md:py-10 ">
      <div className="sh-container text-center">
        <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">
          Why families trust us?
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
          <span className="text-gradient-hero"> Numbers </span> that tell the
          story
        </h2>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          SafeHands is built to be reliable, fast, and always available—so you
          can focus on your family while we take care of the details.
        </p>

        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="card-glass-brand p-6 text-left md:text-center cursor-default hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-sm font-medium text-base-content/70">
                {s.title}
              </div>

              <div className="text-3xl md:text-4xl font-bold mt-2 text-primary">
                {s.value}
              </div>

              <div className="mt-2 text-sm text-base-content/70 leading-relaxed">
                {s.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
