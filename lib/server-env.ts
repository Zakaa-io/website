const requiredServerEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_DESTINATION_EMAIL',
] as const

const missingServerEnv = requiredServerEnv.filter((key) => !process.env[key])

if (missingServerEnv.length > 0) {
  throw new Error(
    `Missing required server environment variables: ${missingServerEnv.join(', ')}.`,
  )
}

export const serverEnv = {
  smtpHost: process.env.SMTP_HOST!,
  smtpPort: Number(process.env.SMTP_PORT!),
  smtpUser: process.env.SMTP_USER!,
  smtpPass: process.env.SMTP_PASS!,
  contactDestinationEmail: process.env.CONTACT_DESTINATION_EMAIL!,
}
