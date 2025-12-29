import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'

const CLEARABLE_STATUSES = ['Completed', 'Cancelled']

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { bookingIds } = body || {}

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return NextResponse.json(
        { error: 'bookingIds array is required.' },
        { status: 400 }
      )
    }

    await connectDB()

    const result = await Booking.deleteMany({
      _id: { $in: bookingIds },
      userId: token.id,
      status: { $in: CLEARABLE_STATUSES },
    })

    return NextResponse.json(
      {
        message: 'Clear history successful.',
        deletedCount: result.deletedCount || 0,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Booking clear history error', err)
    return NextResponse.json(
      { error: 'Server error while clearing booking history.' },
      { status: 500 }
    )
  }
}
