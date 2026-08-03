import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";


export const metadata: Metadata = generateMetadata({ label: "Legal", title: "Terms of Service", description: "Terms governing use of Zakaa services, liability, and legal rights." });
export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Legal</p>
          <h1 className="text-3xl font-bold mt-2">Terms of Service</h1>
          <p className="mt-3 text-sm text-[#94A3B8]">Last updated: August 3, 2026</p>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            These Terms of Service ("Terms") govern your access to and use of Zakaa Technology
            Solutions' services, websites, and related products. By accessing or using our
            services, you agree to be bound by these Terms.
          </p>
        </header>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            These Terms, together with any signed Master Service Agreement (MSA), Statement of
            Work (SoW), and applicable policies, constitute the entire agreement between you
            and Zakaa regarding our services. If you do not agree, you may not use our services.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">2. Services</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Zakaa services are provided under agreed commercial terms, project scope, and support
            coverage as defined in the applicable MSA and SoW. Service details, features, and
            pricing are described in the signed agreement.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">3. Client Responsibilities</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li>Provide timely access, approvals, and required information for service delivery.</li>
            <li>Designate authorized contacts for coordination and decision-making.</li>
            <li>Report security incidents through official support channels immediately.</li>
            <li>Maintain appropriate insurance, backups, and disaster recovery for your own systems.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">4. Payment Terms</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Fees are specified in the signed agreement. Payment is due within 30 days of invoice
            date unless otherwise agreed. Late payments incur interest at 1.5% per month or the
            maximum rate permitted by law, whichever is lower.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            All intellectual property rights in our services and any deliverables remain the
            property of Zakaa or its licensors. You receive a limited, non-exclusive right to
            use deliverables solely for your internal business purposes as described in the agreement.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">6. Confidentiality</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Both parties agree to protect confidential information received during the engagement
            and not disclose it to third parties except as required to perform the services or as
            required by law.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">7. Disclaimers</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." ZAKAA DISCLAIMS ALL WARRANTIES,
            EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NONINFRINGEMENT. WE DO NOT WARRANT THAT SERVICES WILL BE UNINTERRUPTED,
            ERROR-FREE, OR SECURE.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZAKAA'S TOTAL LIABILITY FOR ANY CLAIM
            ARISING OUT OF OR RELATED TO THESE TERMS OR SERVICES WILL NOT EXCEED THE AMOUNT
            PAID BY YOU FOR THE SERVICES IN THE 12 MONTHS PRECEDING THE CLAIM. WE ARE NOT
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
            INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">9. Term &amp; Termination</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            The term begins on the effective date and continues until terminated. Either party
            may terminate with 30 days' written notice for cause (including material breach or
            insolvency). Upon termination, all unpaid fees become immediately due, and each party
            will return or destroy confidential information. Sections 7, 8, 9, and 10 survive termination.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">10. Governing Law &amp; Dispute Resolution</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            These Terms are governed by the laws of Egypt, without regard to conflict of law
            principles. Any disputes shall be resolved exclusively in the courts of Cairo, Egypt.
            Before filing a claim, the parties agree to attempt resolution through good-faith
            negotiation.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">11. Changes to Terms</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            We may update these Terms. Changes are effective upon posting with an updated "Last
            updated" date. Material changes to consumer protections or payment terms will be
            communicated in advance.
          </p>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            For legal requests, privacy inquiries, or contract clarifications, contact:
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
