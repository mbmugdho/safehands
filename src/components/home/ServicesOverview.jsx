'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const items = [
  {
    title: 'Baby Care',
    desc: 'Experienced babysitters for infants and kids. Safe, playful, and attentive support.',
  },
  {
    title: 'Elderly Care',
    desc: 'Daily assistance, companionship, and monitoring for older family members.',
  },
  {
    title: 'Sick People Care',
    desc: 'Home-based support for patients—special care and gentle help at home.',
  },
]

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

export default function ServicesOverview() {
  return (
    <section id="services" className="relative py-5 md:py-10 ">
      <div className="sh-container text-center">
        <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">
          Our Services
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
          Care that <span className="text-gradient-hero">fits your family</span>
        </h2>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          From infants to elderly, SafeHands provides verified caregivers for
          every stage of life. Choose a service, book easily, and enjoy peace of
          mind.
        </p>

        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {items.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="card-glass-brand p-6 flex flex-col justify-between 
                 cursor-pointer transition-shadow duration-300 
                 hover:shadow-2xl"
            >
              <h3 className="text-lg md:text-xl font-semibold text-brand-deep">
                {s.title}
              </h3>

              <p className="mt-2 text-base-content/70">{s.desc}</p>

              <div className="mt-4 flex gap-2 justify-between">
                <Link href="/services" className="btn btn-sh-outline">
                  Details
                </Link>

                <Link href="/services" className="btn btn-sm btn-sh-gradient">
                  Book
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
