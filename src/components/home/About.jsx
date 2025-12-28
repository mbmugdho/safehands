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

export default function About() {
  return (
    <section className="relative py-5 md:py-10 ">
      <div className="sh-container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">
            Why SafeHands?
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Care that feels <span className="text-gradient-hero">human</span>,
            not complicated
          </h2>

          <p className="mt-5 text-base-content/70 text-base md:text-lg leading-relaxed">
            SafeHands makes caregiving simple, secure, and accessible. From baby
            sitting to elderly assistance and special care — book trusted help
            at your home, on your terms.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="card-glass-brand p-6 cursor-pointer 
               transition-shadow duration-300 
               hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold">Safety-first</h3>
            <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
              Verified caregivers, clear profiles, and transparent booking —
              trust is baked in, not promised.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="card-glass-brand p-6 cursor-pointer 
               transition-shadow duration-300 
               hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold">Simple & Fast</h3>
            <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
              Choose service, duration, location — confirm. No clutter, no
              confusion.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="card-glass-brand p-6 cursor-pointer 
               transition-shadow duration-300 
               hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold">Accessible for Everyone</h3>
            <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
              Designed mobile-first and works beautifully on phones, tablets,
              and desktops.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
