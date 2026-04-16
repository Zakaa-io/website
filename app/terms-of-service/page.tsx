import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: 'Terms of Service | Zakaa',
  description: 'Terms of Service for Zakaa - Legal terms and conditions for using our services.',
}

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>

        {/* Last Updated */}
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information 
              or software) on Zakaa's website for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose, or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Site</li>
              <li>Transferring the materials to another person or "mirroring" the materials</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer</h2>
            <p>
              The materials on Zakaa's website are provided on an 'as is' basis. Zakaa makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or 
              other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitations</h2>
            <p>
              In no event shall Zakaa or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising 
              out of the use or inability to use the materials on Zakaa's website, even if Zakaa or 
              an authorized representative has been notified orally or in writing of the possibility 
              of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Zakaa's website could include technical, typographical, or 
              photographic errors. Zakaa does not warrant that any of the materials on its website are 
              accurate, complete, or current. Zakaa may make changes to the materials contained on its 
              website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Links</h2>
            <p>
              Zakaa has not reviewed all of the sites linked to its website and is not responsible 
              for the contents of any such linked site. The inclusion of any link does not imply 
              endorsement by Zakaa of the site. Use of any such linked website is at the user's 
              own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Modifications</h2>
            <p>
              Zakaa may revise these terms of service for its website at any time without notice. 
              By using this website, you are agreeing to be bound by the then current version of 
              these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws 
              of the UAE, and you irrevocably submit to the exclusive jurisdiction of the courts 
              in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@zakaa.io" className="text-accent hover:underline">
                legal@zakaa.io
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
