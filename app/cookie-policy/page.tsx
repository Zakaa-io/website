import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: 'Cookie Policy | Zakaa',
  description: 'Cookie Policy for Zakaa - How we use cookies and tracking technologies.',
}

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>

        {/* Last Updated */}
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small files of letters and numbers that are downloaded to your computer 
              when you access certain websites. Cookies are useful because they allow a website to 
              recognize a user's device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
            <p>
              We use cookies for several purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Authentication:</strong> To keep you logged into your account</li>
              <li><strong>Preferences:</strong> To remember your settings and preferences</li>
              <li><strong>Analytics:</strong> To understand how you use our website</li>
              <li><strong>Security:</strong> To protect against fraud and enhance security</li>
              <li><strong>Performance:</strong> To improve the functionality and performance of our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable 
                  core functionality such as security and network management.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Analytical Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website. 
                  We use these insights to improve user experience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Preference Cookies</h3>
                <p>
                  These cookies remember your choices to provide a personalized experience.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Cookies</h2>
            <p>
              We may allow third-party service providers to place cookies on your device. These 
              cookies are used to deliver metrics and analytics that help us understand how you 
              use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. How to Control Cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. Most browsers allow you to refuse 
              cookies and to alert you when cookies are being sent. However, blocking cookies may 
              affect your ability to use certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. More Information</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
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
