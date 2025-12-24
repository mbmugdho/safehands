import ThemeToggle from '@/components/ui/ThemeToggle'

export default function HomePage() {
  return (
    <section className="sh-container py-12">
      <div className="rounded-box bg-base-200 p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-primary">SafeHands</h1>
          <ThemeToggle />
        </div>

        <p className="mt-2 text-base-content/80">
          Baby Sitting & Elderly Care Service Platform
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn btn-primary">Book Now</button>
          <button className="btn btn-secondary">Explore Services</button>
          <button className="btn btn-outline">Learn More</button>
        </div>

        <div className="safehands-test-bg mt-8 rounded-box p-6">
          <p className="font-semibold text-base-content">
            Test gradient section (SafeHands palette)
          </p>
        </div>
      </div>
    </section>
  )
}
