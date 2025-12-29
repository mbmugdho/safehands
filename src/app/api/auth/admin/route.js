import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'
import User from '@/lib/models/User' 

const VALID_STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

async function requireAdmin(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token || token.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return { token }
}

export async function GET(req) {
  const { error } = await requireAdmin(req)
  if (error) return error

  try {
    await connectDB()

    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .lean()

    const userIds = [...new Set(bookings.map((b) => String(b.userId)))]
    const users = await User.find({ _id: { $in: userIds } })
      .select('name email')
      .lean()

    const userMap = users.reduce((acc, u) => {
      acc[String(u._id)] = { name: u.name, email: u.email }
      return acc
    }, {})

    const formatted = bookings.map((b) => {
      const userInfo = userMap[String(b.userId)] || {}
      return {
        id: String(b._id),
        userName: userInfo.name || 'Unknown user',
        userEmail: userInfo.email || '',
        serviceName: b.serviceName,
        duration: `${b.durationValue} ${b.durationUnit}`,
        division: b.division,
        district: b.district,
        city: b.city,
        area: b.area,
        address: b.address,
        totalCost: b.totalCost,
        status: b.status,
        createdAt: b.createdAt,
      }
    })

    return NextResponse.json({ bookings: formatted }, { status: 200 })
  } catch (err) {
    console.error('Admin GET bookings error', err)
    return NextResponse.json(
      { error: 'Server error while fetching bookings.' },
      { status: 500 }
    )
  }
}

export async function PATCH(req) {
  const { error } = await requireAdmin(req)
  if (error) return error

  try {
    await connectDB()

    const body = await req.json()
    const { bookingId, status } = body

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'bookingId and status are required.' },
        { status: 400 }
      )
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value.' },
        { status: 400 }
      )
    }

    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found.' },
        { status: 404 }
      )
    }

    
    booking.status = status
    await booking.save()

    return NextResponse.json(
      {
        message: 'Booking status updated successfully.',
        status: booking.status,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Admin PATCH booking status error', err)
    return NextResponse.json(
      { error: 'Server error while updating booking status.' },
      { status: 500 }
    )
  }
}