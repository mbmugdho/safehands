export function isAdminEmail(email) {
  if (!email) return false

  const adminList = process.env.ADMIN_EMAILS || ''
  const adminEmails = adminList
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  return adminEmails.includes(email.toLowerCase())
}