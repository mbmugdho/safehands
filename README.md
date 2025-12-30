# SafeHands – Baby Sitting & Elderly Care Service Platform

**Live demo:** [https://safehands-ltd.vercel.app/]

SafeHands is a **full-stack caregiving service platform** for booking trusted caregivers for children, elderly family members, and sick people at home. Users can browse services, book caregivers by duration and location, pay via Stripe (test mode), and track bookings. Admins can manage bookings, update statuses, and view analytics.

This project was built as a **final assignment**, focusing on making caregiving **simple, safe, and accessible**.

---

## ✨ Features

### User-Facing Features

- **Responsive UI**
  - Fully responsive across mobile, tablet, and desktop.
  - Themed UI using **Tailwind CSS v4** + **DaisyUI**, with custom SafeHands styling.

- **Home Page**
  - Hero slider with caregiving motivation.
  - About section describing the platform’s mission.
  - Services overview: Baby Care, Elderly Care, Sick Care.
  - Pricing overview (hourly, day shift, night shift, live-in).
  - “How it works” steps, testimonials, statistics, FAQ.
  - Newsletter subscription section.

- **Services**
  - `/services` – list of available services.
  - `/service/[service_id]` – service detail page:
    - Image, category, description, and tags.
    - Pricing summary.
    - “Book this service” button (redirects to login if not authenticated).

- **Authentication (NextAuth)**
  - Email + password login using Credentials provider.
  - Registration requires NID, name, email, phone, and password.
  - Password validation (≥6 chars, at least 1 uppercase + 1 lowercase).
  - Role-based access:
    - `user` – regular users
    - `admin` – admins, defined via `ADMIN_EMAILS` env variable.
  - Sessions persist across reloads.

- **Dynamic Booking Flow**
  - `/booking/[service_id]` – private route for logged-in users.
  - Booking form:
    - Billing mode: Hourly or Shift.
    - Duration: hours or days (hourly converted to 8h/day if needed).
    - Location: division, district, city, area, full address.
    - Live total cost calculation.
  - Stripe Checkout integration (test mode).
  - After payment success:
    - Booking created with status `Confirmed`.
    - Email invoice sent to user.
  - Payment cancellation redirects to `/payment/cancel`.

- **My Bookings**
  - `/my-bookings` – private route listing the logged-in user’s bookings.
  - Shows service name, duration, location, total cost, status, booking ID.
  - Actions:
    - Cancel booking if status is `Pending`.
    - Clear completed & cancelled bookings from user view.

- **404 / Not Found**
  - Custom `not-found.jsx` page with friendly “Go back home” button.

---

### Admin Features

- **Admin Dashboard**
  - `/admin` – protected, admin-only route.
  - Displays:
    - Total bookings, total revenue, active bookings.
    - Status distribution chart (Pending / Confirmed / Completed / Cancelled).
    - Bookings per service chart.
  - Active bookings list:
    - `Pending` bookings: Confirm / Cancel buttons.
    - `Confirmed` bookings: Complete button.
  - Status updates propagate to users in real-time.

- **Service History**
  - `/admin/history` – completed bookings only.
  - Filter by date.
  - Pagination for historical records.
  - Tracks daily service counts and operational performance.

- **Admin-only APIs**
  - `GET /api/auth/admin` – fetch all bookings with user info.
  - `PATCH /api/auth/admin` – update booking status (`Pending`, `Confirmed`, `Completed`, `Cancelled`).

---

### Email Invoices

- After successful payment:
  - Email invoice via **Nodemailer** (SMTP/Gmail in dev).
  - Includes service name, booking ID, date/time, duration, location, status, total cost, and link to `/my-bookings`.

---

## 🛠 Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React 19 (preview)
- Tailwind CSS v4 + DaisyUI
- Framer Motion (animations)
- Swiper (hero & testimonial sliders)
- Lucide React & react-icons (icons)
- Recharts (charts for admin)

**Backend**
- Next.js API Routes
- NextAuth (Credentials provider)
- MongoDB Atlas + Mongoose
- Stripe (test payments)
- Nodemailer (email invoices)
- SweetAlert2 (confirmation dialogs)

**Deployment**
- Vercel
- Environment variables configured for dev and prod.



