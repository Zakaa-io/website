import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft } from "lucide-react"

export const metadata = {
  title: 'Blog | Zakaa',
  description: 'Read our latest articles on cloud computing, DevOps, security, and IT solutions. Zakaa Blog.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header spacing */}
      <div className="h-20" />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Blog
          </h1>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-accent font-medium">Coming Soon</span>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Stay tuned for insightful articles on cloud infrastructure, DevOps practices, 
            security best practices, and IT innovations. Coming very soon!
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <a href="mailto:info@zakaa.io">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                Stay Updated
              </Button>
            </a>
          </div>

          {/* Email note */}
          <p className="text-sm text-muted-foreground">
            Want updates? Subscribe by emailing{" "}
            <a href="mailto:info@zakaa.io" className="text-accent hover:underline">
              info@zakaa.io
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
