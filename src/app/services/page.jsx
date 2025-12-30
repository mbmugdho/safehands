import Image from 'next/image'
import Link from 'next/link'
import { getServices } from '@/lib/zapshift/services'

export const metadata = {
  title: 'Services | SafeHands',
  description: 'Browse all caregiving services offered by SafeHands.',
}

export default function ServicesPage() {
  const services = getServices()

  return (
    <section className=" min-h-[70vh] py-16 md:py-24">
      <div className="sh-container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold mb-4">Care Services</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-deep">
            Find the <span className="text-gradient-hero">right care</span> for
            your family
          </h1>
          <p className="mt-4 text-base-content/70">
            Explore baby sitting, elderly care, and home support. Every service
            is designed to make caregiving simple, transparent, and trustworthy.
          </p>
        </div>

        
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="service-card relative group h-[380px] md:h-[420px] overflow-hidden rounded-3xl shadow-lg"
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#003060]/90 via-[#055c9d]/60 to-transparent group-hover:from-[#003060]/95 group-hover:via-[#0e86d4]/70 transition-colors duration-500" />

              <div className="relative z-10 h-full flex flex-col p-5 md:p-6">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-white/15 text-white/90">
                    {service.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 text-white text-[11px] font-semibold">
                    ${service.pricePerHour}/hour
                  </span>
                </div>

               
                <div className="mt-auto space-y-4">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm text-white/85 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {service.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/85">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/10 border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/85">
                      <span>Day shift (8 hours)</span>
                      <span className="px-3 py-1 rounded-full bg-black/40 text-[11px] font-semibold">
                        ${service.pricePerDay}/day
                      </span>
                    </div>

                    <div className="rounded-full bg-white/95 text-center overflow-hidden">
                      <Link
                        href={`/service/${service.id}`}
                        className="block w-full px-5 py-2.5 text-sm font-semibold text-[#003060] hover:bg-white"
                      >
                        View details & book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
