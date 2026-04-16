import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: 'Privacy Policy | Zakaa',
  description: 'Privacy Policy for Zakaa - How we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header spacing */}
      <div className="h-20" />

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>

        {/* Last Updated */}
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              Zakaa ("we," "us," "our," or "Company") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may 
              collect on the Site includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personal Data: Name, email address, phone number, and other contact information</li>
              <li>Usage Data: Browser type, IP address, pages visited, and time spent on pages</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, 
              efficient, and customized experience. Specifically, we may use information collected 
              about you via the Site to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fulfill your requests for services</li>
              <li>Respond to your inquiries</li>
              <li>Monitor and analyze Site usage</li>
              <li>Send promotional and marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your 
              personal information. However, no method of transmission over the Internet or method 
              of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@zakaa.io" className="text-accent hover:underline">
                privacy@zakaa.io
              </a>
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
