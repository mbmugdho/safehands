import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/zapshift/services'
import BookingClient from './BookingClient'

export default async function BookingPage({ params }) {
  const { service_id } = await params

  const service = getServiceById(service_id)

  if (!service) {
    notFound()
  }

  return <BookingClient service={service} />
}
