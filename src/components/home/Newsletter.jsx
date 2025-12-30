export default function Newsletter() {
  return (
    <section className="py-5 md:py-10">
      <div className="sh-container">
        <div className="relative overflow-hidden rounded-3xl bg-section-soft2 px-3 py-6 md:px-6 md:py-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#68BBE3]/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-[#0E86D4]/25 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1.4fr,1.1fr] items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft shadow-sm">
                Stay in the loop
              </p>

              <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-deep">
                Get caregiving tips & early access to{' '}
                <span className="text-gradient-hero">SafeHands slots</span>
              </h2>

              <p className="mt-3 text-sm md:text-base text-brand-soft max-w-xl">
                Subscribe to our newsletter to receive curated safety tips, new
                service updates, and priority access to trusted babysitters and
                elderly caregivers near you.
              </p>

             
            </div>

            <div className="card-glass-brand p-6 md:p-7 shadow-xl">
              <h3 className="text-base md:text-lg font-semibold text-brand-deep">
                Subscribe to SafeHands newsletter
              </h3>
              <p className="mt-1 text-xs md:text-sm text-base-content/70">
                Enter your email to receive updates. You can unsubscribe at any
                time.
              </p>

              <form className="mt-5 space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="youremail@gmail.com"
                    className="flex-1 rounded-2xl border border-base-200 bg-base-100/80 px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    className="btn-sh-gradient w-full sm:w-auto justify-center px-5 py-2 text-sm font-semibold"
                  >
                    Subscribe
                  </button>
                </div>

                <p className="text-[11px] text-base-content/60">
                  We care about your privacy. We will never share your email
                  with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
