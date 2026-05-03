import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | RAINMAKR",
  description: "RAINMAKR Terms of Service.",
  alternates: {
    canonical: "https://therainmakr.app/terms",
  },
};

export default function TermsPage() {
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
            Terms of Service
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
              Welcome to RAINMAKR, an AI-powered negotiation and escrow coordination platform (&quot;Rainmakr,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
              Rainmakr enables sellers of high-value items (typically $200 USD and above) to automate buyer interactions, price negotiations, and escrow transactions in a secure, privacy-preserving environment.
            </p>
            <p className="mb-4">
              By accessing or using Rainmakr&apos;s web app, mobile app, or related services (&quot;Services&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use (&quot;Terms&quot;).
            </p>
            <p>If you do not agree, you may not use Rainmakr.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">2. Eligibility</h2>
            <p>
              You must be 18 years or older to use Rainmakr. By using the Services, you represent and warrant that you meet this requirement and have full authority to enter into this agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">3. Platform Role</h2>
            <p className="mb-4">Rainmakr is a neutral, third-party facilitator that provides:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>AI-assisted price negotiation tools,</li>
              <li>escrow coordination and payment capture/release, and</li>
              <li>communication management between buyers and sellers.</li>
            </ul>
            <p className="mb-4">
              Rainmakr is not a buyer, seller, agent, broker, or guarantor of any item.
              Rainmakr does not:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>own, manufacture, inspect, store, or ship items,</li>
              <li>verify authenticity or legality of goods,</li>
              <li>guarantee buyer or seller performance, or</li>
              <li>provide physical delivery or logistics.</li>
            </ul>
            <p>All item information originates solely from the seller.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">4. Scope of Services</h2>
            <p className="mb-2">Rainmakr facilitates:</p>
            <ul className="list-inside list-disc space-y-1 text-gray-400">
              <li><strong className="text-gray-300">AI-Negotiation:</strong> Automated negotiation on the seller&apos;s behalf using structured data provided by the seller (including item details, pricing, and preferences).</li>
              <li><strong className="text-gray-300">Escrow Management:</strong> Secure holding of buyer funds until both parties confirm completion of an exchange.</li>
              <li><strong className="text-gray-300">Communication Privacy:</strong> Buyer-seller communications occur exclusively through the AI system until the final meetup is arranged.</li>
              <li><strong className="text-gray-300">Payment Processing:</strong> Stripe or other approved third-party providers process all payments, authorizations, and payouts.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">5. Escrow & Transaction Flow</h2>
            <p className="mb-2">
              When a buyer and the AI agent reach an agreed sale price, Rainmakr instructs the buyer to deposit funds into a secure escrow hold (Payment Intent authorization).
            </p>
            <p className="mb-2">Funds remain authorized but not captured until both parties confirm a successful exchange.</p>
            <p className="mb-2">After the in-person meetup and inspection:</p>
            <ul className="mb-2 list-inside list-disc space-y-1 text-gray-400">
              <li>Buyer taps &quot;Release Funds.&quot;</li>
              <li>Seller taps &quot;Accept Payment.&quot;</li>
            </ul>
            <p className="mb-2">
              Only when both confirmations are received are funds captured, fees deducted, and payouts issued to the seller.
            </p>
            <p>
              If either party fails to complete their part of the exchange, funds remain held until resolution or automatic release per Rainmakr&apos;s escrow policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">6. Pricing & Revenue Model</h2>
            <p className="mb-4">
              Rainmakr&apos;s platform fee is performance-based, dynamically calculated according to the seller&apos;s declared pricing parameters:
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border border-purple-500/20">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="p-3 text-left font-semibold text-purple-200">Scenario</th>
                    <th className="p-3 text-left font-semibold text-purple-200">Fee Applied</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/20">
                    <td className="p-3">Sale closes at seller&apos;s Lowest Acceptable Offer (LAO)</td>
                    <td className="p-3">10%</td>
                  </tr>
                  <tr className="border-b border-purple-500/20">
                    <td className="p-3">Sale closes at seller&apos;s Full Asking Price (AP)</td>
                    <td className="p-3">15%</td>
                  </tr>
                  <tr>
                    <td className="p-3">Sale closes between LAO and AP</td>
                    <td className="p-3">Scaled linearly (10-15%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-4"><strong className="text-gray-200">AI Enhancement Add-Ons</strong></p>
            <p className="mb-2">Sellers may optionally enable AI-powered features such as:</p>
            <ul className="mb-2 list-inside list-disc space-y-1 text-gray-400">
              <li>AI Photo Staging (visual background enhancement without altering the product),</li>
              <li>AI Description Optimization, or</li>
              <li>Premium Negotiation Mode.</li>
            </ul>
            <p className="mb-4">
              By enabling such features, sellers agree to an additional service uplift of up to 5% (e.g., 15% to 20%) to cover AI generation and compute costs.
            </p>
            <p className="mb-4">All applicable fees are shown prior to confirming a listing or payout.</p>
            <p className="mb-4"><strong className="text-gray-200">Buyer Fees</strong></p>
            <p className="mb-4">A small processing fee (typically $5 USD) may apply to buyers for escrow and transaction support.</p>
            <p>Rainmakr reserves the right to modify its fee structure, provided changes are disclosed prior to use.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">7. Taxes & Regulatory Compliance</h2>
            <p className="mb-2">Sellers are solely responsible for:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>reporting and paying any applicable taxes (sales tax, income tax, or VAT) on earnings received through Rainmakr;</li>
              <li>complying with local, state, and federal laws regarding resale, second-hand goods, or restricted items;</li>
              <li>providing accurate tax information (e.g., W-9 or 1099 details if applicable).</li>
            </ul>
            <p>Rainmakr may collect and report transaction data as required by tax authorities or financial regulators.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">8. Buyer Responsibilities</h2>
            <p className="mb-2">Buyers are responsible for:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>verifying item condition, authenticity, and suitability before releasing funds;</li>
              <li>inspecting the item during the in-person exchange;</li>
              <li>confirming receipt truthfully through the app.</li>
            </ul>
            <p>Rainmakr assumes no liability for buyer dissatisfaction once funds are released.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">9. Seller Responsibilities</h2>
            <p className="mb-2">Sellers are responsible for:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>providing truthful, accurate item descriptions;</li>
              <li>ensuring item ownership and legality;</li>
              <li>keeping photos, pricing, and disclosures up to date;</li>
              <li>delivering the item at the agreed time and location;</li>
              <li>honoring the sale once escrow funds are confirmed.</li>
            </ul>
            <p>
              Repeated failure to complete exchanges (&quot;No-Shows&quot;) may lead to account suspension or termination. Three (3) no-shows within a 12-month period may result in permanent removal.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">10. In-Person Exchanges & Safety Disclaimer</h2>
            <p className="mb-2">
              Rainmakr does not facilitate or oversee in-person meetings.
              Buyers and sellers are solely responsible for:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>choosing safe, public meetup locations;</li>
              <li>conducting themselves responsibly;</li>
              <li>verifying item condition before approving payment.</li>
            </ul>
            <p>
              Rainmakr disclaims all liability for personal injury, theft, fraud, or loss arising from meetups or communications between users.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">11. Disputes & Escrow Holds</h2>
            <p className="mb-2">In case of a dispute:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>Rainmakr may temporarily freeze funds until both parties provide documentation.</li>
              <li>If either party fails to respond within a reasonable period (typically 7 days), funds may be released based on available evidence.</li>
            </ul>
            <p className="mb-2">Chargebacks, fraud alerts, or unauthorized claims may delay payouts.</p>
            <p>Rainmakr reserves the right to cooperate with law enforcement or payment providers during investigations.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">12. Fraud, Chargebacks, and Abuse</h2>
            <p className="mb-2">
              Rainmakr may suspend, restrict, or terminate accounts if suspicious activity is detected, including:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>bypassing the platform to avoid fees,</li>
              <li>false claims, chargeback abuse, or refund manipulation,</li>
              <li>counterfeit or illegal goods,</li>
              <li>spam, harassment, or misuse of AI features.</li>
            </ul>
            <p>Funds may be withheld or forfeited pending resolution.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">13. Data & Privacy</h2>
            <p className="mb-2">
              Rainmakr collects and processes limited personal information to enable secure transactions and AI negotiation.
              See our Privacy Policy for details on:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>what data is stored (item info, negotiation logs, escrow confirmations),</li>
              <li>retention periods, and</li>
              <li>how users can request deletion.</li>
            </ul>
            <p>Rainmakr does not sell or share personal data for marketing purposes.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">14. AI Negotiation & Automation Disclosure</h2>
            <p className="mb-2">
              Rainmakr uses AI systems to negotiate, generate responses, and assist with transaction coordination.
              By using Rainmakr, you understand and consent that:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-400">
              <li>automated systems may make pricing, communication, or recommendation decisions on your behalf;</li>
              <li>AI responses are generated based on your item data and prior input;</li>
              <li>Rainmakr is not responsible for subjective outcomes (e.g., sale price, buyer sentiment, or missed opportunities).</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">15. Limitation of Liability</h2>
            <p className="mb-2">To the fullest extent permitted by law, Rainmakr and its affiliates are not liable for:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>lost profits, missed sales, or opportunity costs,</li>
              <li>personal safety incidents,</li>
              <li>fraudulent meetups,</li>
              <li>product defects,</li>
              <li>delays or failed transactions,</li>
              <li>platform downtime or AI output errors.</li>
            </ul>
            <p>
              Maximum aggregate liability shall not exceed the total fees paid by you to Rainmakr in the previous 12 months.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">16. Indemnification</h2>
            <p className="mb-2">
              You agree to indemnify, defend, and hold harmless Rainmakr, its officers, directors, employees, and partners from any claim or liability arising out of:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-400">
              <li>your use of the Services,</li>
              <li>your violation of these Terms,</li>
              <li>your sale, purchase, or misrepresentation of items, or</li>
              <li>your actions during in-person exchanges.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">17. Termination</h2>
            <p className="mb-2">Rainmakr may suspend or terminate your account at any time for:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-gray-400">
              <li>violation of these Terms,</li>
              <li>suspected fraud or abuse,</li>
              <li>repeated no-shows, or</li>
              <li>failure to respond to dispute inquiries.</li>
            </ul>
            <p>You may close your account at any time, provided all pending transactions are resolved.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">18. Changes to Terms</h2>
            <p className="mb-2">
              Rainmakr may update these Terms periodically. Material changes will be announced via email or in-app notice.
            </p>
            <p>Continued use of the Services after changes indicates acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">19. Governing Law & Dispute Resolution</h2>
            <p className="mb-4">
              These Terms are governed by the laws of the State of Florida, USA, without regard to conflict-of-law principles.
            </p>
            <p>
              Any disputes shall be resolved through binding arbitration in Miami, Florida, in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-pink-300">20. Contact Us</h2>
            <p className="mb-2">For questions about these Terms:</p>
            <p className="mb-1"><strong>Rainmakr Technologies, LLC</strong></p>
            <p className="mb-1">Miami, Florida</p>
            <p>Email: <strong className="text-pink-300">legal@therainmakr.app</strong></p>
          </section>
        </article>
      </div>
    </main>
  );
}
