import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname, search } = req.nextUrl

  const isProtected =
    pathname.startsWith('/booking') || pathname.startsWith('/my-bookings')

  // If route is not protected, continue as normal
  if (!isProtected) {
    return NextResponse.next()
  }

  // If user is NOT logged in, redirect to login with redirect param
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  // User is authenticated; allow request through
  return NextResponse.next()
}

// Apply to /booking/* and /my-bookings only
export const config = {
  matcher: ['/booking/:path*', '/my-bookings'],
}