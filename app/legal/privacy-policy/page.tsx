import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";


export const metadata: Metadata = generateMetadata({ label: "Legal", title: "Privacy Policy", description: "Zakaa privacy policy covering data collection, usage, rights, and retention." });
export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Legal</p>
          <h1 className="text-3xl font-bold mt-2">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[#94A3B8]">Last updated: August 3, 2026</p>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            Zakaa Technology Solutions ("Zakaa", "we", "us", or "our") processes client and
            visitor data strictly for service delivery, support, security, and contractual
            obligations. This Privacy Policy describes what information we collect, how we use
            it, and your rights.
          </p>
        </header>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            We collect only the minimum information required to operate our services:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li><strong>Account &amp; Contact Data:</strong> Name, work email, company name, and phone number when you submit a lead form, schedule an assessment, or register for portal access.</li>
            <li><strong>Usage Data:</strong> Page views, clicks, session duration, and feature interactions collected via essential cookies and analytics tags.</li>
            <li><strong>Operational Data:</strong> Infrastructure metrics, alert events, and operational logs when you use our managed services.</li>
            <li><strong>Communication Data:</strong> Messages you send through our AI chat assistant, assessment wizard, or support channels.</li>
            <li><strong>Security Data:</strong> IP addresses, device identifiers, and authentication events for security monitoring and fraud prevention.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li>Account management, communication, and service delivery.</li>
            <li>Security monitoring, threat detection, and incident response.</li>
            <li>Analytics and performance improvement of our website and services.</li>
            <li>Personalization of your experience and AI assistant interactions.</li>
            <li>Compliance with legal and contractual obligations.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] pb-0">
          <h2 className="text-xl font-semibold p-6">3. Legal Basis for Processing</h2>
          <p className="mt-0 px-6 text-sm text-[#94A3B8]">
            When applicable under data protection law, our legal bases for processing are:
          </p>
          <ul className="list-disc space-y-2 pl-5 px-6 pb-6 text-sm text-[#CBD5E1]">
            <li><strong>Contract:</strong> To perform services under a signed agreement.</li>
            <li><strong>Legitimate interests:</strong> For security, fraud prevention, and service improvement.</li>
            <li><strong>Consent:</strong> Where you have opted in (e.g., optional analytics cookies).</li>
            <li><strong>Legal obligation:</strong> To comply with applicable laws and regulations.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">4. Data Sharing &amp; Disclosure</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            We do not sell your data. We share information only with:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li><strong>Service providers:</strong> Third parties who assist with hosting, analytics, payment processing, and customer support. They are contractually bound to confidentiality.</li>
            <li><strong>Legal compliance:</strong> When required by law, regulation, or valid legal process.</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, subject to this Policy.</li>
            <li><strong>Your consent:</strong> With your explicit permission for specific purposes.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">5. Data Retention</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            We retain data for as long as necessary to fulfill the purposes described in this Policy, or as required by contract or law:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li>Lead and contact data: up to 24 months from last interaction, unless a longer retention is required by law.</li>
            <li>Operational and log data: up to 13 months, unless needed for security investigations.</li>
            <li>Session authentication data: automatically expires based on configured session lifetime.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">6. Your Rights</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li>Request access to or correction of your personal data.</li>
            <li>Request deletion of your personal data (subject to legal and contractual limitations).</li>
            <li>Object to or restrict certain processing activities.</li>
            <li>Request data portability in a structured, machine-readable format.</li>
            <li>Lodge a complaint with a supervisory data protection authority.</li>
          </ul>
          <p className="mt-3 text-sm text-[#94A3B8]">
            To exercise any of these rights, contact us at{" "}
            <a className="text-[#60A5FA] hover:underline" href="mailto:hello@zakaa.io">
              hello@zakaa.io
            </a>
            . Please include your company name and contract reference where applicable.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">7. Cookies &amp; Tracking</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            We use essential cookies for session continuity, security, and basic site experience.
            Optional analytics cookies help us understand aggregated usage trends. See our{" "}
            <a className="text-[#60A5FA] hover:underline" href="/legal/cookies">
              Cookie Policy
            </a>{" "}
            for details and how to manage your preferences.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">8. International Data Transfers</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            Data may be transferred to and processed in countries outside your residence,
            including Egypt and the European Union. We implement appropriate safeguards
            (such as standard contractual clauses) where required by law.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">9. Security</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            We implement industry-standard technical and organizational measures including
            encryption in transit and at rest, role-based access controls, and regular
            security assessments. Data is accessed strictly on a need-to-know basis by
            authorized personnel.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">10. Changes to This Policy</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            We may update this Privacy Policy. When we do, we will revise the "Last updated"
            date above and, where appropriate, notify you via email or our website.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            For questions about this Privacy Policy or to exercise your data rights, contact:
          </p>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            Email:{" "}
            <a className="text-[#60A5FA] hover:underline" href="mailto:hello@zakaa.io">
              hello@zakaa.io
            </a>
            <br />
            Phone: +20 1000 292 919 | +20 1234 522 055
            <br />
            Address: 5th Settlement, Cairo, Egypt
          </p>
        </section>
      </div>
    </main>
  );
}
