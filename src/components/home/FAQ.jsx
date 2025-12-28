'use client'

import { useState } from 'react'
import { ArrowBigDownDash } from 'lucide-react';

const FAQS = [
  {
    q: 'How is the total cost calculated?',
    a: 'SafeHands multiplies the service rate by your selected duration (hours or days). You will always see the total before confirming your booking.',
  },
  {
    q: 'Can I cancel a booking?',
    a: 'Yes. From the My Bookings page you can cancel a booking while it is still in Pending status. After that, cancellation rules may apply based on your provider.',
  },
  {
    q: 'Do I need an account to book?',
    a: 'Yes. You must register with your NID, name, email, and contact number to keep your bookings and caregivers secure.',
  },
  {
    q: 'What types of care can I book?',
    a: 'You can choose Baby Care, Elderly Care, or Sick People Care. Each service will have its own details and pricing on the Service Details page.',
  },
  {
    q: 'Is my information safe?',
    a: 'We only use your information for booking and communication purposes. Sensitive data like passwords are handled securely.',
  },
  {
    q: 'Will I get a booking confirmation?',
    a: 'Yes. Once you confirm a booking, you will see it in My Bookings with status Pending and receive a confirmation email (invoice feature later).',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative py-5 md:pb-20 ">
      <div className="sh-container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
            Answers to{' '}
            <span className="text-gradient-hero">common questions</span>
          </h2>
          <p className="mt-4 text-base-content/70">
            Still curious how SafeHands works? Here are some quick answers to
            get you started.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={item.q}
                className="rounded-2xl bg-base-100/80 border border-base-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm md:text-base font-semibold text-brand-deep"
                >
                  {item.q}
                  <span
                    className={`transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ArrowBigDownDash />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden px-5 pb-4 text-sm text-base-content/70 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
