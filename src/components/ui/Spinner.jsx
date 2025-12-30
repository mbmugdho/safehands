import Image from 'next/image'

export default function Spinner() {
  return (
    <span className="inline-flex items-center justify-center">
      <span className="relative h-6 w-6">
        <Image
          src="/logo.png"
          alt="Loading..."
          fill
          className="object-contain animate-spin"
        />
      </span>
    </span>
  )
}