# Technical Writer — Website Content Review

**Reviewed repository:** https://github.com/Zakaa-io/website  
**Reviewer:** Technical Writer  
**Scope:** All user-facing content in `app/` (pages, sections, components) and site metadata in `app/layout.tsx`

---

## Findings Summary

The website has a polished visual design and a clear value proposition, but the content layer has several gaps spanning correctness, consistency, SEO, legal compliance, and content depth. Findings are grouped below with prioritized TODO tasks.

---

## 1. Grammar & Spelling (High)

### `app/sections/AIAgents.tsx`
- **TODO:** Fix missing apostrophe in AI chat message: "Ive added a guardrail" change to "I've added a guardrail"

### `app/sections/Footer.tsx`
- **TODO:** Fix social link `aria-label` values. Currently "X zakaa-ai", "LinkedIn zakaa-ai", etc. — confusing. Replace with descriptive labels: "Follow Zakaa on LinkedIn", "Follow Zakaa on X", etc.

### `app/sections/Footer.tsx`
- **TODO:** Fix bottom-nav labels: "Privacy" change to "Privacy Policy", "Terms" change to "Terms of Service". "Cookies" and "Sitemap" are acceptable as-is.

---

## 2. Content Contradictions (High)

### `app/sections/Pricing.tsx`
- **TODO:** Resolve contradiction: pricing subtitle says "All plans include 24/7 support" but the **Starter** plan feature list says "Business hours support." Either change the subtitle or change the Starter plan feature to "24/7 support."

### `app/portal/page.tsx`
- **TODO:** Fix login heading: "Admin / Client Portal Login" change to "Admin & Client Portal Login"

---

## 3. Brand Voice & Terminology (Medium)

### Footer hero statement
- **TODO:** Align footer tagline with the active, first-person voice used in Hero and Services sections. Currently: "Enterprise IT infrastructure management powered by autonomous AI agents. We build, secure, and operate the systems that power your business." — mixed voice. Recommend: "We design, deploy, and manage cloud-native infrastructure with autonomous AI agents — so your team focuses on what matters."

### Phone numbers
- **TODO:** Standardize phone number formatting across all components:
  - Footer (single number): +20 1000 292 919
  - CTA section: +20 1000 292 919 | +20 1234 522 055
  - Company Details: +20 1000 292 919 / +20 1234 522 055
  - **Recommendation:** Use consistent separator (` | `) and always show both numbers.

### Address
- **TODO:** Standardize address punctuation:
  - Footer/CTA: "5th Settlement — Cairo — Egypt" (em-dashes)
  - Company Details: "5th Settlement, Cairo, Egypt" (commas)
  - **Recommendation:** Pick one format (commas recommended) and use consistently.

### Footer "Services" column
- **TODO:** Replace footer service labels to match actual service offerings:
  - **Current:** "Cloud Infrastructure", "DevOps & CI/CD", "Security", "Networking", "Managed Hosting"
  - **Should be:** "Cloud Migration", "Managed DevOps", "Managed Security (SOC)", "FinOps & Cost Optimization", "Disaster Recovery"
  - **Also fix:** "Networking" and "Managed Hosting" are not real service pages. Remove or add corresponding pages.
  - **Also fix:** All footer service links currently point to `href="#services"`. Link each to its individual service page (e.g., `/services/cloud-migration`).

### Trust Center terminology
- **TODO:** Replace vague framework references in `app/trust/page.tsx`:
  - "SOC/ISO-style governance requirements" -> name specific standards: "SOC 2, ISO 27001, and PCI DSS"
  - "Tenant-scoped access" -> clarify what tenants means in context

---

## 4. Navigation & IA (Medium)

### Footer social links
- **TODO:** All four social media links in `app/sections/Footer.tsx` use `href="#"`. Replace with real URLs or mark as "coming soon" visually.

### Footer "Company" column
- **TODO:** "About Us" and "Careers" both link to `/company/details`. Create dedicated pages for these, or remove the misleading labels.

### Footer "Platform" column
- **TODO:** "Changelog" -> `/resources`. The Resources page is a content hub, not a changelog. Either create a real changelog page or relabel.

### Resources page
- **TODO:** "Request Download" buttons in `app/resources/page.tsx` have no `href` or `onClick`. Add download links or route handlers.

### Sitemap page
- **TODO:** `app/sitemap/page.tsx` lists raw URL paths (e.g., `/api/ops/metrics`). Replace with human-readable labels. Also remove internal-only routes from public sitemap.

---

## 5. SEO & Metadata (High)

### Per-page metadata
- **TODO:** Currently only `app/layout.tsx` has global `metadata`. All content pages (services, industries, legal, product, trust, partners, resources, docs, status, sandbox) share the same `<title>` and `<meta description>`.
  - **Action:** Add per-page `export const metadata` or implement a metadata function in `MarketingPageShell` that generates unique titles and descriptions from the `label`, `title`, and `subtitle` props.
  - **Action:** Add per-page Open Graph tags (title, description, image).

### Sitemap page
- **TODO:** Remove non-public routes from `app/sitemap/page.tsx` (`/api/*`, `/sandbox`, `/portal`, `/internal/analytics`). Keep only user-facing public pages.

---

## 6. Legal & Trust Content (High)

### Privacy Policy
- **TODO:** Expand `app/legal/privacy-policy/page.tsx` beyond 4 bullets. Add:
  - Data categories collected (contact info, usage data, etc.)
  - Data subject rights (access, rectification, deletion, portability)
  - Cookie policy cross-reference
  - Third-party processors
  - International data transfer safeguards
  - Retention schedules
  - Privacy contact (already partially present via `hello@zakaa.io`)
  - Last-updated date

### Terms of Service
- **TODO:** Expand `app/legal/terms-of-service/page.tsx` beyond 4 bullets. Add:
  - Warranty disclaimer (services provided "as-is")
  - Limitation of liability (cap on damages)
  - Termination clause
  - Governing law and jurisdiction
  - Intellectual property ownership
  - Acceptable use policy
  - Last-updated date

### Legal page consistency
- **TODO:** Standardize legal page structure. Currently Privacy, Terms, Security, Cookies, Compliance, and SLA use raw `<ul>` layouts, while Legal Details and Trust Center use `MarketingPageShell`. Choose one consistent pattern.

### Last-updated dates
- **TODO:** Add last-updated dates to all legal pages for compliance clarity.

### Cookies vs. Privacy alignment
- **TODO:** Align messaging: Cookies page mentions "Optional analytics cookies may be used" but Privacy Policy says "We collect only the minimum information required." Make these consistent — clearly state whether analytics (e.g., Plausible, GA) are used.

---

## 7. Form & Microcopy (Low)

### LeadForm
- **TODO:** Change field label "Company (optional)" -> "Company name (optional)" in `app/components/LeadForm.tsx`.

### AssessmentWizard
- **TODO:** Clarify priority selection: the label says "Select your top priorities:" but no maximum is enforced. Either add a max selector (e.g., "Select up to 3 priorities") or clarify that multiple selections are allowed.

### Error messages
- **TODO:** Improve generic error messages across components (e.g., "Could not get AI response." in `AIChatWidget.tsx`) to provide actionable guidance.

---

## 8. Content Quality (Medium)

### Case studies
- **TODO:** Expand case studies in `app/case-studies/page.tsx`. Currently 3 short blurbs (~30 words each) with no client names, no detailed metrics, no executive quotes. Recommend: add client names (with permission), detailed before/after metrics, and at least one direct quote per case.

### Partners page
- **TODO:** `app/partners/page.tsx` lists cloud providers (AWS, Azure, GCP) as "partners" and uses generic category names ("SIEM & Threat Monitoring") instead of actual partner companies. Either add real partner names/logos or relabel as "Technology Stack."

### Docs page
- **TODO:** `app/docs/page.tsx` lists API endpoints but provides no parameters, request/response schemas, or examples. Add at minimum a basic reference table for each endpoint.

### Status page
- **TODO:** `app/status/page.tsx` is fully static with hardcoded "Operational" statuses. Consider connecting to real monitoring data or clearly marking as "illustrative" / sample data.

---

## 9. Accessibility & Structure (Low)

### Terminal component
- **TODO:** `app/components/Terminal.tsx` uses ASCII tree characters (|, --) without semantic markup. Convert to `<ul>`/`<ol>` or add `aria-hidden="true"` to decorative tree characters.

### Emoji
- **TODO:** Add `aria-hidden="true"` to all decorative emoji in `AIAgents.tsx` and chat avatars in `AIChatWidget.tsx` and `AIAgents.tsx`.

### BrandLogo
- **TODO:** `app/components/BrandLogo.tsx` has `role="img"` but no `<title>` or `<desc>`. Add a `<title>Zakaa logo</title>` child to the SVG, or remove the `role="img"`.

### Language toggle
- **TODO:** `AssessmentWizard` supports EN/AR via a `language` prop, but there's no visible language toggle on any page. Add one for the multilingual feature to be usable.

---

## Priority Matrix

| Priority | Count | Key Actions |
|----------|-------|-------------|
| **High** | 7 | Fix pricing contradiction, typo, add per-page SEO metadata, expand Privacy Policy & Terms of Service |
| **Medium** | 8 | Align brand voice, fix footer service links, add last-updated dates, expand case studies, fix dead download buttons, standardize legal page layout |
| **Low** | 5 | Field label clarity, error message improvements, accessibility fixes, language toggle |
