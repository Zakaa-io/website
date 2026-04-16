import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { serverEnv } from '@/lib/server-env'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  company: z.string().max(100, 'Company name must be 100 characters or less.').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(5000, 'Message is too long.'),
})

const transporter = nodemailer.createTransport({
  host: serverEnv.smtpHost,
  port: serverEnv.smtpPort,
  secure: serverEnv.smtpPort === 465,
  auth: {
    user: serverEnv.smtpUser,
    pass: serverEnv.smtpPass,
  },
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.format() },
      { status: 400 },
    )
  }

  const { name, email, company, message } = parsed.data

  const mailOptions = {
    from: `${name} <${serverEnv.smtpUser}>`,
    to: serverEnv.contactDestinationEmail,
    replyTo: email,
    subject: `New Contact Request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company ?? 'N/A'}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #111;">
        <h1>New Contact Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company ?? 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error)
    return NextResponse.json(
      { success: false, error: 'Unable to send contact request. Please try again later.' },
      { status: 500 },
    )
  }
}
