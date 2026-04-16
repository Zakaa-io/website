import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center">
        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-7xl font-bold text-accent mb-2">404</h1>
          <h2 className="text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL and try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4">
            Popular Pages:
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Link 
              href="/#services"
              className="text-xs text-accent hover:underline"
            >
              Services
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link 
              href="/#about"
              className="text-xs text-accent hover:underline"
            >
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link 
              href="/#contact"
              className="text-xs text-accent hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
