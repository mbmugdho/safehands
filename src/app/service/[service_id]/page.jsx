import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/zapshift/services'

export async function generateMetadata({ params }) {
  const { service_id } = params
  const service = getServiceById(service_id)

  if (!service) {
    return {
      title: 'Service not found | SafeHands',
      description: 'The requested caregiving service could not be found.',
    }
  }

  return {
    title: `${service.name} | SafeHands Care Service`,
    description:
      service.shortDescription ||
      (service.description ? service.description.slice(0, 150) : ''),
  }
}

export default async function ServiceDetailPage({ params }) {
  const { service_id } = await params
  const service = getServiceById(service_id)

  if (!service) {
    notFound()
  }

  return (
    <section className="min-h-[70vh] py-16 md:py-24">
      <div className="sh-container grid gap-8 lg:grid-cols-[1.4fr,1fr] items-start">
        <div>
          <div className="overflow-hidden rounded-2xl shadow-lg mb-6">
            <Image
              src={service.image}
              alt={service.name}
              width={1200}
              height={600}
              className="h-80 md:h-120 w-full object-cover"
            />
          </div>

          <span className="badge badge-info badge-outline uppercase tracking-[0.18em] font-bold text-sm mb-3">
            {service.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-brand-deep">
            {service.name}
          </h1>
          <p className="mt-3 text-base-content/70">
            {service.shortDescription}
          </p>

          <h2 className="mt-6 text-lg font-semibold text-brand-deep">
            About this service
          </h2>
          <p className="mt-2 text-base-content/80 leading-relaxed">
            {service.description}
          </p>

          {service.tags?.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-semibold text-brand-main">
                Included support:
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs text-base-content/80">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 rounded-full bg-base-100/80 border border-base-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="card-glass-brand p-6 sticky top-24">
          <h2 className="text-lg font-semibold text-brand-deep">
            Pricing summary
          </h2>
          <p className="mt-1 text-sm text-base-content/70">
            Final total depends on your selected duration and location during
            booking.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Hourly rate</span>
              <span className="font-semibold text-brand-accent">
                ${service.pricePerHour}/hour
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Day shift (8 hours)</span>
              <span className="font-semibold text-brand-accent">
                ${service.pricePerDay}/day
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href={`/booking/${service.id}`}
              className="btn btn-sh-gradient text-center w-full"
            >
              Book this service
            </Link>
            <Link
              href="/services"
              className="btn btn-sh-outline text-center w-full text-sm"
            >
              Back to all services
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
