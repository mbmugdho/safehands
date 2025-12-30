import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import Stripe from 'stripe'
import { getServiceById } from '@/lib/zapshift/services'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      serviceId,
      billingMode,
      durationUnit,
      durationValue,
      division,
      district,
      city,
      area,
      address,
    } = body

    if (
      !serviceId ||
      !billingMode ||
      !durationUnit ||
      !durationValue ||
      !division ||
      !district ||
      !city ||
      !area ||
      !address
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
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

    let totalCost = 0
    if (billingMode === 'hourly') {
      if (durationUnit === 'hours') {
        totalCost = value * service.pricePerHour
      } else if (durationUnit === 'days') {
        const SHIFT_HOURS = 8
        totalCost = value * SHIFT_HOURS * service.pricePerHour
      } else {
        return NextResponse.json(
          { error: 'Invalid duration unit.' },
          { status: 400 }
        )
      }
    } else if (billingMode === 'shift') {
      if (durationUnit !== 'days') {
        return NextResponse.json(
          { error: 'Shift bookings must use days.' },
          { status: 400 }
        )
      }
      totalCost = value * service.pricePerDay
    } else {
      return NextResponse.json(
        { error: 'Invalid billing mode.' },
        { status: 400 }
      )
    }

    if (totalCost <= 0) {
      return NextResponse.json(
        { error: 'Calculated total cost is invalid.' },
        { status: 400 }
      )
    }

    const successUrl = `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXTAUTH_URL}/payment/cancel`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', 
            product_data: {
              name: service.name,
              description: `${billingMode === 'hourly' ? 'Hourly' : 'Shift'} booking - ${value} ${durationUnit}`,
            },
            unit_amount: Math.round(totalCost * 100), 
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: token.id,
        serviceId: service.id,
        serviceName: service.name,
        billingMode,
        durationUnit,
        durationValue: String(value),
        division,
        district,
        city,
        area,
        address,
        totalCost: String(totalCost),
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (err) {
    console.error('Stripe checkout create error', err)
    return NextResponse.json(
      { error: 'Server error while creating checkout session.' },
      { status: 500 }
    )
  }
}