import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { isAdminEmail } from '@/lib/auth/isAdminEmail'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials

        await connectDB()
        // IMPORTANT: do NOT use .lean() here, we may want to update role
        const user = await User.findOne({ email })

        if (!user) {
          throw new Error('Invalid email or password')
        }

        const isValid = await compare(password, user.passwordHash)
        if (!isValid) {
          throw new Error('Invalid email or password')
        }

        // Ensure role matches ADMIN_EMAILS (env is the source of truth)
        const shouldBeAdmin = isAdminEmail(user.email)
        if (shouldBeAdmin && user.role !== 'admin') {
          user.role = 'admin'
          await user.save()
        } else if (!shouldBeAdmin && user.role === 'admin') {
          // Optional: downgrade if email removed from ADMIN_EMAILS
          user.role = 'user'
          await user.save()
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || 'user',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // When user logs in (credentials or Google)
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email

        // If role came from authorize (credentials)
        if (user.role) {
          token.role = user.role
        } else if (user.email) {
          // For Google or any other provider, derive role from env emails
          token.role = isAdminEmail(user.email) ? 'admin' : 'user'
        }
      }

      // Fallback: ensure token.role always exists
      if (!token.role) {
        token.role = 'user'
      }

      return token
    },
    async session({ session, token }) {
      if (!session.user) session.user = {}

      if (token?.id) {
        session.user.id = token.id
      }
      if (token?.email) {
        session.user.email = token.email
      }
      if (token?.role) {
        session.user.role = token.role
      } else {
        session.user.role = 'user'
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
