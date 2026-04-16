"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement authentication logic
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground tracking-tight">Zakaa</span>
              <span className="text-sm text-muted-foreground font-arabic">ذكاء</span>
            </div>
          </Link>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Intelligent IT Solutions
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Cloud, DevOps, Big Data, Security, and AI-powered tools — everything you need to transform your business infrastructure.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Cloud Infrastructure</p>
                  <p className="text-sm text-muted-foreground">On-prem and cloud solutions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">DevOps & Automation</p>
                  <p className="text-sm text-muted-foreground">Streamlined deployment pipelines</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">AI-Powered Tools</p>
                  <p className="text-sm text-muted-foreground">Coming soon — intelligent automation</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100+</p>
                <p className="text-sm text-muted-foreground">Clients</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure Infrastructure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground tracking-tight">Zakaa</span>
                <span className="text-sm text-muted-foreground font-arabic">ذكاء</span>
              </div>
            </Link>
          </div>

          {/* Secure Login Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Secure Login</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                required
                className="h-12 bg-secondary border-border focus:border-accent focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-12 bg-secondary border-border focus:border-accent focus:ring-accent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in to workspace"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground">
            {"Don't have an account? "}
            <Link 
              href="/auth/signup" 
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Sign up free →
            </Link>
          </p>

          {/* Security Badges */}
          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
