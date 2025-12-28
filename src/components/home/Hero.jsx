'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'

const slides = [
  {
    image: 'https://ik.imagekit.io/azfnpskmy/caregiver/elderly01.jpg',
    title: (
      <>
        Reliable <span className="text-gradient-hero">Elderly Care</span>
        <br />
        at Your Home
      </>
    ),
    subtitle:
      'Professional, respectful, and trusted care for your elderly family members.',
  },
  {
    image: 'https://ik.imagekit.io/azfnpskmy/caregiver/elderly02.jpg',
    title: (
      <>
        Compassionate <span className="text-gradient-hero">Home Care</span>
        <br />
        When It Matters Most
      </>
    ),
    subtitle:
      'Book trained caregivers by duration and location with transparent pricing.',
  },
  {
    image: 'https://ik.imagekit.io/azfnpskmy/caregiver/bbsitting.jpg',
    title: (
      <>
        Trusted <span className="text-gradient-hero">Baby Sitting</span>
        <br />
        for Peace of Mind
      </>
    ),
    subtitle: 'Verified babysitters ensuring safety, love, and responsibility.',
  },
]

export default function Hero() {
  const progressRef = useRef(null)

  return (
    <section className="relative h-[85vh] min-h-[540px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        onAutoplayTimeLeft={(_, __, progress) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${1 - progress})`
          }
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <ParallaxSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>


      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-white/80 text-xs"
        >
          <span>Scroll</span>
          <div className="mt-1 h-6 w-[2px] bg-white/60 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

function ParallaxSlide({ slide }) {
  return (
    <motion.div className="relative h-full" initial="hidden" animate="visible">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.image})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.2 }}
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 h-full">
        <div className="sh-container h-full flex items-center">
          <div className="max-w-2xl hero-overlay-text">
            <motion.p
              variants={fadeUp}
              className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4"
            >
              Trusted Care • SafeHands
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl font-extrabold leading-tight"
            >
              {slide.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-white/80 text-base md:text-lg"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="btn btn-sh-gradient btn-sh-gradient:hover text-white">
                Explore Services
              </Link>
              <Link
                href="/register"
                className="btn btn-sh-gradient btn-sh-gradient:hover text-white "
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/*Animation*/
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}
