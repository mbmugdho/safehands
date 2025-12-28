export default function BookingPage({ params }) {
  return (
    <div className="sh-container py-10">
      <h1 className="text-2xl font-bold">Booking for: {params.service_id}</h1>
      <p>This is a protected page. You should only see it when logged in.</p>
    </div>
  )
}