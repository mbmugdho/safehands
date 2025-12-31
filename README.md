<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4ade80,100:22c55e&height=180&section=header&text=SafeHands&fontSize=50&fontColor=ffffff&animation=fadeIn&desc=Trusted%20Care%20Booking%20Platform%20(Full-Stack)&descSize=18&descAlignY=70" />
</p>

<h1 align="center">SafeHands — Trusted Care Booking Platform (Full-Stack)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

---

## 🔗 Live Links

<p align="center">
  <a href="https://safehands-ltd.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Live%20Site-Visit%20Now-brightgreen?style=for-the-badge"/>
  </a>
  <a href="https://github.com/mbmugdho/safehands-client" target="_blank">
    <img src="https://img.shields.io/badge/💻%20Client%20Repo-GitHub-blue?style=for-the-badge"/>
  </a>
</p>

| Link Type | URL |
|-----------|-----|
| 🌐 **Live Site** | [https://safehands-ltd.vercel.app](https://safehands-ltd.vercel.app) |
| 💻 **GitHub Repo** | [Repository Link](https://github.com/mbmugdho/safehands) |

---

## 📋 Project Overview

**SafeHands** is a **full-stack caregiving service platform** designed to connect families with trusted caregivers for:

- 👶 **Baby Care** – Professional babysitting services
- 👴 **Elderly Care** – Compassionate care for seniors
- 🏥 **Sick Care** – Home-based care for ill family members

Users can easily browse services, book caregivers by duration and location, pay securely via Stripe, and track their bookings. Administrators have access to a powerful dashboard to manage bookings, update statuses, and view business analytics.

> 🎯 **Goal:** Making caregiving **simple, safe, and accessible** for everyone.

---

## 🛠️ Technologies Used

<div align="center">

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,vercel" alt="Frontend"/>
</p>

| Technology | Purpose |
|------------|---------|
| Next.js 16 | App Router & SSR |
| React 19 | UI Components |
| Tailwind CSS v4 | Styling |
| DaisyUI | UI Components |
| Framer Motion | Animations |
| Swiper | Sliders |
| Recharts | Admin Charts |

### Backend
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,mongodb,vercel" alt="Backend"/>
</p>

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Backend APIs |
| NextAuth | Authentication |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Stripe | Payments |
| Nodemailer | Email Invoices |

</div>

---

## ✨ Core Features

### 👤 User Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Email/password login with NextAuth, role-based access |
| 📱 **Responsive Design** | Fully responsive across all devices |
| 🏠 **Homepage** | Hero slider, services overview, pricing, testimonials, FAQ |
| 📋 **Service Listing** | Browse all available caregiving services |
| 📄 **Service Details** | View detailed service info, pricing, and book directly |
| 📝 **Dynamic Booking** | Select duration, location, calculate costs in real-time |
| 💳 **Stripe Payments** | Secure checkout with test mode integration |
| 📧 **Email Invoices** | Automatic invoice sent after successful payment |
| 📊 **My Bookings** | Track, cancel, or clear booking history |

### 👨‍💼 Admin Features

| Feature | Description |
|---------|-------------|
| 📈 **Dashboard Analytics** | Total bookings, revenue, active bookings stats |
| 📊 **Visual Charts** | Status distribution & bookings per service |
| ✅ **Booking Management** | Confirm, complete, or cancel bookings |
| 📜 **Service History** | View completed bookings with date filters |
| 📄 **Pagination** | Efficient browsing of historical records |

---

## 📦 Dependencies

### Project Dependencies

```json
{
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "daisyui": "^5.5.14",
    "framer-motion": "^12.23.26",
    "lucide-react": "^0.562.0",
    "mongoose": "^9.0.2",
    "next": "16.1.1",
    "next-auth": "^4.24.13",
    "nodemailer": "^7.0.12",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-icons": "^5.5.0",
    "recharts": "^3.6.0",
    "stripe": "^20.1.0",
    "sweetalert2": "^11.26.17",
    "swiper": "^12.0.3"
  }
}

