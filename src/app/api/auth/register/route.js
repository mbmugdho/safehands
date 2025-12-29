import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { isAdminEmail } from '@/lib/auth/isAdminEmail'

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    const { nid, name, email, phone, password } = body

    if (!nid || !name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      return NextResponse.json(
        {
          error:
            'Password must be at least 6 chars, include 1 uppercase and 1 lowercase.',
        },
        { status: 400 }
      )
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 400 }
      )
    }

    const passwordHash = await hash(password, 10)

    const role = isAdminEmail(email) ? 'admin' : 'user'

    const user = await User.create({
      nid,
      name,
      email,
      phone,
      passwordHash,
      role,
    })

    return NextResponse.json(
      {
        message: 'User registered successfully.',
        user: { id: user._id.toString(), 
          name: user.name, 
          email: user.email,
          role: user.role,},
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Register error', err)
    return NextResponse.json(
      { error: 'Server error during registration.' },
      { status: 500 }
    )
  }
}
