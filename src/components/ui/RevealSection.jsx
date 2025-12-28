'use client'

import { motion } from 'framer-motion'

export default function RevealSection({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{
        duration: 1,
        ease: [0.15, .8, 0.26, .8],
      }}
    >
      {children}
    </motion.section>
  )
}
