'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: 'Ayesha Rahman',
    role: 'Mother of 2',
    text: 'Booking a babysitter through SafeHands was fast and stress-free. The caregiver was gentle, punctual, and very professional.',
  },
  {
    name: 'Mahmudul Hasan',
    role: 'Son of elderly parent',
    text: 'We booked elderly care for my father. The caregiver was respectful and attentive—SafeHands really cares about trust.',
  },
  {
    name: 'Nabila Sultana',
    role: 'Working parent',
    text: 'The platform is simple and clear. I loved that I could see the total cost before confirming the booking.',
  },
  {
    name: 'Farhan Ahmed',
    role: 'Brother of patient',
    text: 'We needed short-term home care after surgery. SafeHands helped us find support quickly in our area.',
  },
  {
    name: 'Sara Hossain',
    role: 'Regular user',
    text: 'The experience felt safe from start to finish. I really like the idea of tracking booking status in one place.',
  },
  {
    name: 'Sara Islam',
    role: 'Regular user',
    text: 'The experience felt safe from start to finish. I really like the idea of tracking booking status in one place.',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-5 md:py-10 ">
      <div className="sh-container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
            What families{' '}
            <span className="text-gradient-hero">say about us</span>
          </h2>
          <p className="mt-4 text-base-content/70">
            Real stories from parents, children, and families who trusted
            SafeHands for baby sitting, elderly care, and home assistance.
          </p>
        </div>

        <motion.div
          className="m-10 md:m-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 18,
              stretch: 0,
              depth: 140,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="!py-8"
          >
            {reviews.map((r) => (
              <SwiperSlide
                key={r.name}
                className="!w-[260px] sm:!w-[320px] lg:!w-[360px]"
              >
                <div className="card-glass-brand h-full p-6 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1  text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}> <FaStar /> </span>
                      ))}
                    </div>
                    <span className="text-xs text-base-content/60">5.0</span>
                  </div>

                  <p className="mt-4 text-sm text-base-content/80 leading-relaxed">
                    “{r.text}”
                  </p>

                  <div className="mt-5">
                    <p className="font-semibold text-sm text-brand-deep">
                      {r.name}
                    </p>
                    <p className="text-xs text-base-content/60">{r.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
