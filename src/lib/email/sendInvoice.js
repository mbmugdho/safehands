import nodemailer from 'nodemailer'

let transporter

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false, 
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })
  }
  return transporter
}


export async function sendInvoiceEmail({ to, booking, user }) {
  const t = getTransporter()

  const bookingDate = new Date(booking.createdAt || Date.now()).toLocaleString(
    'en-BD',
    { timeZone: 'Asia/Dhaka' }
  )
  const currency = booking.currency || 'USD'

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0e86d4;">SafeHands – Booking Invoice</h2>
      <p>Hi there ${user?.name || ''},</p>
      <p>Thank you for booking a care service with SafeHands. Here are your booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
        <tr>
          <td style="padding: 6px 0;"><strong>Service:</strong></td>
          <td style="padding: 6px 0;">${booking.serviceName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Booking ID:</strong></td>
          <td style="padding: 6px 0;">${booking._id}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Date:</strong></td>
          <td style="padding: 6px 0;">${bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Duration:</strong></td>
          <td style="padding: 6px 0;">${booking.durationValue} ${booking.durationUnit}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Location:</strong></td>
          <td style="padding: 6px 0;">
            ${booking.area || ''}, ${booking.city || ''}<br/>
            ${booking.district || ''}, ${booking.division || ''}<br/>
            ${booking.address || ''}
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Status:</strong></td>
          <td style="padding: 6px 0;">${booking.status}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; border-top: 1px solid #e5e7eb;"><strong>Total Cost:</strong></td>
          <td style="padding: 6px 0; border-top: 1px solid #e5e7eb; font-weight: 600;">
            ${booking.totalCost} ${currency}
          </td>
        </tr>
      </table>

      <p style="margin-top: 16px;">You can track this booking anytime from your <a href="${process.env.NEXTAUTH_URL}/my-bookings">My Bookings</a> page.</p>

      <p style="margin-top: 24px; font-size: 13px; color: #6b7280;">
        This is an automated email from SafeHands Care Platform.
      </p>
    </div>
  `

  await t.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `SafeHands Booking Invoice – ${booking.serviceName}`,
    html,
  })
}