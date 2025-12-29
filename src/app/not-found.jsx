import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[85vh] safehands-main-bg flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-100 h-100 relative mb-2">
          <Image
            src="/404-illustration.png"
            alt="Cute animal 404 error illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold brand-text mb-3">
          404 - Page Not Found
        </h1>
        <p className="text-base md:text-lg text-base-content/80 mb-6">
          Looks like this page got a little lost. Let's get you back to a
          safe place.
        </p>

        <Link href="/" className="btn-sh-gradient mb-3">
          Go back home
        </Link>

        {/*  Storyset */}
        <p className="mt-2 text-[11px] text-base-content/60">
          Illustration by{' '}
          <a
            href="https://storyset.com"
            target="_blank"
            rel="noreferrer"
            className="link link-primary"
          >
            Storyset
          </a>
        </p>
      </div>
    </main>
  )
}
