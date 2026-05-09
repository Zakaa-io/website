"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Mail, ArrowLeft, CheckCircle, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const formatSupabaseError = (error: { message?: string; status?: number; name?: string; details?: string } | null) =>
    error
      ? [
          error.message ?? "An unexpected error occurred",
          error.status ? `status ${error.status}` : undefined,
          error.name,
          error.details,
        ]
          .filter(Boolean)
          .join(" • ")
      : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const productionBaseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zakaa.io'
    const redirectTo = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL
      ? `${process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL}?next=/auth/reset-password`
      : `${productionBaseUrl}/auth/callback?next=/auth/reset-password`

    console.log('Forgot-password redirect URL:', { redirectTo, productionBaseUrl, envRedirect: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL })

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })

      setIsLoading(false)

      if (error) {
        console.error("Supabase resetPasswordForEmail error", error)
        setError(formatSupabaseError(error))
      } else {
        setIsSuccess(true)
      }
    } catch (caught) {
      console.error("Supabase resetPasswordForEmail exception", caught)
      setError(caught instanceof Error ? caught.message : String(caught))
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary/30 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 border border-foreground/20 rounded-full" />
          <div className="absolute bottom-40 right-10 w-96 h-96 border border-foreground/20 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-foreground/20 rounded-full" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">Z</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">Zakaa</span>
              <span className="text-muted-foreground text-sm block font-arabic">ذكاء</span>
            </div>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Secure Account Recovery
            </h1>
            <p className="text-muted-foreground text-lg">
              We take security seriously. Follow the simple steps to regain access to your account.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-foreground font-medium">Enter Your Email</h3>
                <p className="text-muted-foreground text-sm">Provide the email associated with your account</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-foreground font-medium">Check Your Inbox</h3>
                <p className="text-muted-foreground text-sm">We&apos;ll send you a secure reset link</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-foreground font-medium">Create New Password</h3>
                <p className="text-muted-foreground text-sm">Set a strong, unique password for your account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-sm">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Encrypted Links</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">Z</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">Zakaa</span>
                <span className="text-muted-foreground text-sm block font-arabic">ذكاء</span>
              </div>
            </Link>
          </div>

          {/* Back Link */}
          <Link 
            href="/auth" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to login</span>
          </Link>

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Forgot password?</h2>
                <p className="text-muted-foreground">
                  No worries, we&apos;ll send you reset instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border focus:border-accent h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
                <p className="text-muted-foreground">
                  We sent a password reset link to
                </p>
                <p className="text-foreground font-medium">{email}</p>
              </div>
              <p className="text-muted-foreground text-sm">
                Didn&apos;t receive the email?{" "}
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    setEmail("")
                  }}
                  className="text-accent hover:underline"
                >
                  Click to resend
                </button>
              </p>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
