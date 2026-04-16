"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="bg-secondary border-border"
                  />
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
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    required
                    className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  Send Message
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
