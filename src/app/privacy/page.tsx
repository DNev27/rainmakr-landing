import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | RAINMAKR",
  description: "RAINMAKR Privacy Policy.",
  alternates: {
    canonical: "https://therainmakr.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#05050a] px-6 py-12 text-gray-200 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-medium text-pink-300 transition hover:text-pink-200"
        >
          Back to RAINMAKR
        </Link>

        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
            RAINMAKR
          </p>
          <h1 className="bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Last Updated: November 5, 2025
          </p>
        </header>

        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

        <article className="space-y-8 rounded-2xl border border-purple-500/20 bg-black/35 p-6 leading-relaxed text-gray-300 shadow-2xl shadow-purple-950/20 sm:p-8">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">1. Overview</h2>
            <p className="mb-4">
              Rainmakr Technologies, LLC (&quot;Rainmakr,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values your privacy and is committed to protecting your personal information.
            </p>
            <p className="mb-4">
              This Privacy Policy explains how we collect, use, share, and protect your information when you use the Rainmakr app, website, or related services (the &quot;Services&quot;).
            </p>
            <p>By using Rainmakr, you agree to the terms described here.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">2. Information We Collect</h2>
            <p className="mb-4">
              We collect data in three main categories: Account Data, Transaction Data, and AI Interaction Data.
            </p>

            <h3 className="mb-2 text-lg font-semibold text-purple-200">a. Account Data</h3>
            <p className="mb-2">
              Information you provide during registration or onboarding, including:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Full name, email address, and phone number</li>
              <li>Facebook or marketplace profile link (if connected)</li>
              <li>Location (ZIP code, city, or radius preferences)</li>
              <li>Identity verification or tax information (if required for payouts)</li>
            </ul>

            <h3 className="mb-2 text-lg font-semibold text-purple-200">b. Transaction Data</h3>
            <p className="mb-2">
              Collected when creating or managing listings, negotiating sales, or completing escrow transactions:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Item details (title, photos, price, condition, brand, etc.)</li>
              <li>Buyer/seller communication logs via the AI agent</li>
              <li>Payment authorization, capture, and payout information</li>
              <li>Escrow activity, meet-up confirmations, and timestamps</li>
            </ul>
            <p className="mb-4">
              Payment data (credit/debit card, bank details) are not stored by Rainmakr - they are processed securely through Stripe, our PCI-compliant payment processor.
            </p>

            <h3 className="mb-2 text-lg font-semibold text-purple-200">c. AI Interaction Data</h3>
            <p className="mb-2">When you interact with our AI agent:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Messages sent between buyers and the AI</li>
              <li>Seller input data (Lowest Acceptable Offer, price range, negotiation settings)</li>
              <li>Item images used for visual context or optional AI staging</li>
            </ul>
            <p>
              This data enables AI negotiation, fraud prevention, and performance optimization.
              Rainmakr does not use negotiation data for advertising, resale, or unrelated AI training.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">3. How We Use Your Information</h2>
            <p className="mb-2">Rainmakr processes your data to:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li><strong className="text-gray-300">Facilitate AI Negotiation:</strong> Provide automated communication between buyers and sellers.</li>
              <li><strong className="text-gray-300">Process Transactions:</strong> Authorize and release escrow payments securely.</li>
              <li><strong className="text-gray-300">Enable Dispute Resolution:</strong> Maintain records for fraud prevention and support requests.</li>
              <li><strong className="text-gray-300">Improve the Platform:</strong> Analyze anonymized data to refine pricing logic, negotiation patterns, and app features.</li>
              <li><strong className="text-gray-300">Ensure Safety and Compliance:</strong> Detect and prevent fraudulent behavior, scams, or fee evasion.</li>
              <li><strong className="text-gray-300">Support AI Staging (if enabled):</strong> Generate enhanced product imagery using AI background models without altering the product itself.</li>
            </ul>
            <p>Rainmakr does not sell, rent, or exchange personal information for marketing purposes.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">4. AI System Disclosure</h2>
            <p className="mb-4">
              Rainmakr uses artificial intelligence and automated systems to facilitate messaging, negotiation, and product enhancement features.
            </p>
            <p className="mb-2">By using Rainmakr, you consent to:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>AI-generated responses made on your behalf;</li>
              <li>AI analysis of your listing data, messages, and item photos;</li>
              <li>Use of AI tools for optional features such as AI Photo Staging or AI Description Optimization.</li>
            </ul>
            <p>
              AI models are trained only on anonymized or aggregated datasets. Individual message histories are not reused for external model training.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">5. Data Sharing</h2>
            <p className="mb-2">Rainmakr shares limited data only with:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li><strong className="text-gray-300">Payment Processors (Stripe):</strong> To authorize payments, manage escrow, and process payouts.</li>
              <li><strong className="text-gray-300">Cloud Service Providers:</strong> To securely host databases, images, and AI model interactions.</li>
              <li><strong className="text-gray-300">Law Enforcement:</strong> When required by subpoena, court order, or regulatory request.</li>
              <li><strong className="text-gray-300">Affiliates and Contractors:</strong> Who assist in providing technical or support services, bound by confidentiality agreements.</li>
            </ul>
            <p>We never sell or lease user data to advertisers or data brokers.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">6. Data Retention</h2>
            <p className="mb-4">
              We retain data only as long as necessary for transaction, support, or compliance purposes.
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border border-purple-500/20">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="p-3 text-left font-semibold text-purple-200">Data Type</th>
                    <th className="p-3 text-left font-semibold text-purple-200">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/20">
                    <td className="p-3">Negotiation logs</td>
                    <td className="p-3">30 days (unless dispute is open)</td>
                  </tr>
                  <tr className="border-b border-purple-500/20">
                    <td className="p-3">Escrow records</td>
                    <td className="p-3">7 years (for financial compliance)</td>
                  </tr>
                  <tr className="border-b border-purple-500/20">
                    <td className="p-3">Account and tax data</td>
                    <td className="p-3">7 years or until account deletion</td>
                  </tr>
                  <tr>
                    <td className="p-3">AI image processing data</td>
                    <td className="p-3">Deleted automatically after 24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Users may request deletion of personal information (see Section 11).</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">7. Security</h2>
            <p className="mb-2">
              We implement administrative, technical, and physical safeguards to protect your data, including:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Secure Stripe tokenization for all payment data</li>
              <li>Role-based access control for staff</li>
              <li>Regular security audits and penetration testing</li>
            </ul>
            <p>
              While we take every reasonable precaution, no system is 100% secure. You use the Services at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">8. Escrow and Financial Data</h2>
            <p className="mb-4">
              All escrow funds are managed through Stripe or other regulated payment partners.
              Rainmakr does not hold user funds directly.
            </p>
            <p className="mb-4">
              Rainmakr may access transaction metadata (amount, status, timestamps) but not full payment credentials.
            </p>
            <p>
              In case of chargebacks, fraud alerts, or payment disputes, Rainmakr may temporarily freeze payouts until resolution.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">9. In-Person Meetups and Safety</h2>
            <p className="mb-2">
              Rainmakr does not monitor or supervise in-person exchanges.
              You are solely responsible for selecting safe, public meeting locations.
              We recommend:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Meeting during daylight hours in monitored areas</li>
              <li>Never sharing personal information outside the app</li>
              <li>Confirming funds before transferring the item</li>
            </ul>
            <p>Rainmakr assumes no liability for events that occur during personal meetups.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">10. Children&apos;s Privacy</h2>
            <p className="mb-2">
              Rainmakr is not intended for individuals under 18 years of age.
              We do not knowingly collect personal data from minors.
            </p>
            <p>
              If you believe a minor has provided information, contact us at <strong className="text-pink-300">support@therainmakr.app</strong> for deletion.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">11. User Rights and Data Deletion</h2>
            <p className="mb-2">You may request to:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Access your stored data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated personal data</li>
            </ul>
            <p className="mb-4">
              To submit a request, email <strong className="text-pink-300">privacy@therainmakr.app</strong>.
            </p>
            <p>
              Deletion requests for financial data (escrow, tax, or transaction records) may be limited by regulatory retention laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">12. Fraud Prevention & Abuse Monitoring</h2>
            <p className="mb-2">Rainmakr employs automated systems to detect:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>marketplace bypass attempts,</li>
              <li>duplicate listings,</li>
              <li>false claims, or</li>
              <li>identity fraud.</li>
            </ul>
            <p>
              Suspicious accounts may be suspended, and related data may be retained for legal purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">13. International Users</h2>
            <p>
              Rainmakr currently operates primarily within the United States.
              If you access the Services from outside the U.S., you consent to your information being transferred to and processed in the United States.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">14. Policy Updates</h2>
            <p className="mb-2">
              Rainmakr may update this Privacy Policy from time to time.
              Changes are effective immediately upon posting to the app or website.
            </p>
            <p>Material updates will be communicated via email or in-app notice.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">15. Contact Us</h2>
            <p className="mb-2">For privacy questions or legal requests:</p>
            <p className="mb-1"><strong>Rainmakr Technologies, LLC</strong></p>
            <p className="mb-1">Miami, Florida</p>
            <p className="mb-1">Email: <strong className="text-pink-300">privacy@therainmakr.app</strong></p>
            <p>Email: <strong className="text-pink-300">support@therainmakr.app</strong></p>
          </section>
        </article>
      </div>
    </main>
  );
}
