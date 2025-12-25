import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-base-100 border-t border-base-200">
      <div className="sh-container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SafeHands logo"
              width={36}
              height={36}
            />
            <span className="text-lg font-bold text-primary">SafeHands</span>
          </div>
          <p className="mt-3 text-base-content/70 leading-relaxed">
            Trusted baby sitting & elderly care services—secure, reliable, and
            easy to book.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-base-content/70">
            <li>
              <Link className="link link-hover" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" href="/#services">
                Services
              </Link>
            </li>
            <li>
              <Link className="link link-hover" href="/my-bookings">
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-base-content/70">
            <li>Dhaka, Bangladesh</li>
            <li>Email: support@safehands.xyz</li>
            <li>Phone: +880 1XXXXXXXXX</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-200">
        <div className="sh-container py-4 text-sm text-base-content/60">
          © {year} SafeHands. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
