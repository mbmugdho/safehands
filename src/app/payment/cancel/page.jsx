import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <section className="min-h-[70vh] py-16 md:py-24 flex items-center justify-center">
      <div className="sh-container max-w-md text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep">
          Payment cancelled
        </h1>
        <p className="mt-3 text-base-content/80">
          Your payment was cancelled. No booking has been created.
        </p>
        <Link href="/my-bookings" className="btn-sh-outline mt-6">
          View my bookings
        </Link>
      </div>
    </section>
  )
}