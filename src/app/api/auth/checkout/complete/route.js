import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import Stripe from 'stripe'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'
import User from '@/lib/models/User'
import { sendInvoiceEmail } from '@/lib/email/sendInvoice'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required.' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed.' },
        { status: 400 }
      )
    }

    const metadata = session.metadata || {}

    const {
      userId,
      serviceId,
      serviceName,
      billingMode,
      durationUnit,
      durationValue,
      division,
      district,
      city,
      area,
      address,
      totalCost,
    } = metadata

    if (!userId || !serviceId || !serviceName) {
      return NextResponse.json(
        { error: 'Missing booking metadata.' },
        { status: 400 }
      )
    }

    await connectDB()

    const existing = await Booking.findOne({ stripeSessionId: sessionId })
    if (existing) {
      return NextResponse.json(
        { bookingId: existing._id.toString(), alreadyExists: true },
        { status: 200 }
      )
    }

    const numericDuration = Number(durationValue) || 0
    const numericTotalCost =
      typeof session.amount_total === 'number'
        ? session.amount_total / 100
        : Number(totalCost) || 0

    const booking = await Booking.create({
      userId,
      serviceId,
      serviceName,
      durationValue: numericDuration,
      durationUnit,
      division,
      district,
      city,
      area,
      address,
      totalCost: numericTotalCost,
      currency,
      status: 'Confirmed', 
      stripeSessionId: sessionId, 
    })

    const user = await User.findById(userId).select('name email').lean()
    if (user?.email) {
      sendInvoiceEmail({
        to: user.email,
        booking,
        user,
      }).catch((err) => {
        console.error('Failed to send invoice email:', err)
      })
    }

    return NextResponse.json(
      { bookingId: booking._id.toString(), status: booking.status },
      { status: 201 }
    )
  } catch (err) {
    console.error('Checkout complete error', err)
    return NextResponse.json(
      { error: 'Server error while completing checkout.' },
      { status: 500 }
    )
  }
}