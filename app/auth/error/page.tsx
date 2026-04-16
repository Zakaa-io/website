"use client"

import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Authentication Error
        </h1>
        <p className="text-muted-foreground mb-8">
          Something went wrong during the authentication process. 
          Please try again or contact support if the problem persists.
        </p>

        {/* Error Details */}
        <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-8 text-left">
          <p className="text-xs text-muted-foreground">
            <strong>Error Code:</strong> AUTH_CALLBACK_ERROR
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <strong>Time:</strong> {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/auth" className="w-full">
            <Button className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Try Again
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">
            Still having issues?
          </p>
          <a 
            href="mailto:info@zakaa.io" 
            className="text-accent hover:underline text-sm"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  )
}
