"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  company: z.string().max(100, 'Company name must be 100 characters or less.').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(5000, 'Message is too long.'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null)

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          name: data.name,
          email: data.email,
          company: data.company || '',
          message: data.message,
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      )

      setSubmitted(true)
      reset()
    } catch (error) {
      setServerError('Unable to send message. Please try again later.')
      console.error('Contact form submission failed:', error)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Info */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">Contact Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Get in touch with our team to discuss how we can help accelerate your 
              digital transformation journey.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email us at</p>
                  <a href="mailto:info@zakaa.io" className="text-foreground hover:text-accent transition-colors">
                    info@zakaa.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Call us at</p>
                  <a href="tel:+201000292919" className="text-foreground hover:text-accent transition-colors">
                    +2 01000292919
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Visit us at</p>
                  <p className="text-foreground">
                    Tech Hub, Innovation District<br />
                    Dubai, UAE
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="p-8 rounded-2xl border border-border bg-card">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground max-w-sm">
                  We&apos;ve received your message and will get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-secondary border-border"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-2">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="bg-secondary border-border"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-2">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your Company"
                    className="bg-secondary border-border"
                    {...register('company')}
                  />
                  {errors.company && (
                    <p className="text-xs text-destructive mt-2">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-2">{errors.message.message}</p>
                  )}
                </div>

                {serverError && (
                  <p className="text-sm text-destructive text-center">{serverError}</p>
                )}

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
