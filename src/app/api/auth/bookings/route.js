import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'
import { getServiceById } from '@/lib/zapshift/services'


export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const bookings = await Booking.find({ userId: token.id })
      .sort({ createdAt: -1 })
      .lean()

    const formatted = bookings.map((b) => ({
      id: b._id.toString(),
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
    }))

    return NextResponse.json({ bookings: formatted }, { status: 200 })
  } catch (err) {
    console.error('Booking GET error', err)
    return NextResponse.json(
      { error: 'Server error while fetching bookings.' },
      { status: 500 }
    )
  }
}


export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()
    const {
      serviceId,
      durationValue,
      durationUnit,
      division,
      district,
      city,
      area,
      address,
    } = body

    if (
      !serviceId ||
      !durationValue ||
      !durationUnit ||
      !division ||
      !district ||
      !city ||
      !area ||
      !address
    ) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const service = getServiceById(serviceId)

    if (!service) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 })
    }

    const value = Number(durationValue)
    if (Number.isNaN(value) || value <= 0) {
      return NextResponse.json(
        { error: 'Duration must be a positive number.' },
        { status: 400 }
      )
    }

    let rate
    if (durationUnit === 'hours') {
      rate = service.pricePerHour
    } else if (durationUnit === 'days') {
      rate = service.pricePerDay
    } else {
      return NextResponse.json(
        { error: 'Invalid duration unit.' },
        { status: 400 }
      )
    }

    const totalCost = value * rate

    const booking = await Booking.create({
      userId: token.id,
      serviceId: service.id,
      serviceName: service.name,
      durationValue: value,
      durationUnit,
      division,
      district,
      city,
      area,
      address,
      totalCost,
      status: 'Pending',
    })

    return NextResponse.json(
      {
        message: 'Booking created successfully.',
        bookingId: booking._id.toString(),
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Booking create error', err)
    return NextResponse.json(
      { error: 'Server error while creating booking.' },
      { status: 500 }
    )
  }
}


export async function PATCH(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()
    const { bookingId } = body

    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId is required.' }, { status: 400 })
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      userId: token.id,
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
    }

    if (booking.status !== 'Pending') {
      return NextResponse.json(
        { error: 'Only pending bookings can be cancelled.' },
        { status: 400 }
      )
    }

    booking.status = 'Cancelled'
    await booking.save()

    return NextResponse.json(
      { message: 'Booking cancelled successfully.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Booking cancel error', err)
    return NextResponse.json(
      { error: 'Server error while cancelling booking.' },
      { status: 500 }
    )
  }
}