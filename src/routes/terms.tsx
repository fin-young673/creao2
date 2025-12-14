import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
	component: TermsPage,
});

function TermsPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-8">
			<div className="text-center space-y-4">
				<FileText className="size-12 mx-auto text-primary" />
				<h1 className="text-4xl font-bold">Terms of Service</h1>
				<p className="text-muted-foreground">Last updated: March 2025</p>
			</div>

			<Card>
				<CardContent className="pt-6 space-y-6 prose prose-sm max-w-none dark:prose-invert">
					<section>
						<h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
						<p>
							By accessing and using GiveTransparent ("Service", "Platform"), you agree to be bound by these
							Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use
							our Service.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Description of Service</h2>
						<p>
							GiveTransparent is a donation platform that facilitates monthly charitable giving. We are NOT
							a registered charity. We are a technology platform that:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Collects monthly subscription payments from donors</li>
							<li>Pools donations throughout each quarter</li>
							<li>Distributes pooled funds to verified charity partners at quarter-end</li>
							<li>Publishes quarterly transparency reports</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">User Accounts</h2>

						<h3 className="text-lg font-semibold mt-4 mb-2">Eligibility</h3>
						<p>
							You must be at least 18 years old to use our Service. By creating an account, you represent and
							warrant that you meet this requirement.
						</p>

						<h3 className="text-lg font-semibold mt-4 mb-2">Account Responsibilities</h3>
						<p>You are responsible for:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Maintaining the confidentiality of your account credentials</li>
							<li>All activities that occur under your account</li>
							<li>Notifying us immediately of any unauthorized use</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Subscriptions & Payments</h2>

						<h3 className="text-lg font-semibold mt-4 mb-2">Monthly Subscriptions</h3>
						<p>
							When you create a donation plan, you authorize us to charge your payment method monthly until
							you cancel. Subscriptions renew automatically on the same day each month.
						</p>

						<h3 className="text-lg font-semibold mt-4 mb-2">Payment Processing</h3>
						<p>
							All payments are processed securely through Stripe. We do not store your full payment card details.
							By providing payment information, you authorize Stripe to charge your account according to their
							terms.
						</p>

						<h3 className="text-lg font-semibold mt-4 mb-2">Fees</h3>
						<p>The following fees are deducted from your gross donation amount:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li><strong>Stripe Fee (2.9%)</strong>: Payment processing fee (non-negotiable, charged by Stripe)</li>
							<li><strong>Platform Fee (3.5%)</strong>: Covers our operations, audits, legal compliance, staff</li>
							<li><strong>Innovation Fund (0.6%)</strong>: Partner vetting, technology improvements</li>
						</ul>
						<p className="mt-4">
							93% of your donation goes to the donation pool and is distributed to verified partners quarterly.
						</p>

						<h3 className="text-lg font-semibold mt-4 mb-2">Cancellation</h3>
						<p>
							You may cancel your subscription at any time from your dashboard. Cancellations take effect at
							the end of the current billing period. No refunds are provided for partial months.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Donation Distribution</h2>
						<p>
							Donations are pooled and distributed quarterly to verified charity partners. We make reasonable
							efforts to distribute funds according to user allocation preferences, but:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Partner availability may change</li>
							<li>Some partners may reach capacity limits</li>
							<li>We reserve the right to reallocate funds to similar partners within the same pillar</li>
						</ul>
						<p className="mt-4">
							If a partner becomes unavailable, we will notify users and reallocate funds to verified alternatives.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Tax Receipts & Deductions</h2>
						<p>
							<strong>Important:</strong> Because GiveTransparent is NOT a registered charity, donations made
							through our platform may NOT be tax-deductible. We provide payment receipts for record-keeping,
							but these are NOT official charitable donation receipts for tax purposes.
						</p>
						<p className="mt-4">
							Consult a tax professional regarding deductibility in your jurisdiction.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Impact Estimates</h2>
						<p>
							Impact metrics displayed in your dashboard (e.g., "trees planted", "meals provided") are
							<strong> estimates</strong> based on partner-reported conversion rates. Actual impact may vary
							due to:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Regional cost differences</li>
							<li>Seasonal variations</li>
							<li>Partner operational changes</li>
						</ul>
						<p className="mt-4">
							We verify partner claims through quarterly reporting and audits, but cannot guarantee exact
							conversion rates.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Prohibited Activities</h2>
						<p>You may not:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Use the Service for money laundering or fraud</li>
							<li>Attempt to manipulate or game the allocation system</li>
							<li>Access other users' accounts or data</li>
							<li>Reverse engineer or scrape our platform</li>
							<li>Use the Service in violation of any applicable laws</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
						<p>
							All content, trademarks, and intellectual property on the Service are owned by GiveTransparent
							or our licensors. You may not copy, reproduce, or distribute our content without permission.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
						<p>
							THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Uninterrupted or error-free operation</li>
							<li>Specific impact outcomes from donations</li>
							<li>Partner performance or continuity</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
						<p>
							GiveTransparent and its officers, directors, and employees shall not be liable for:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Indirect, incidental, or consequential damages</li>
							<li>Partner misuse of funds (we conduct due diligence but cannot guarantee partner behavior)</li>
							<li>Losses exceeding the amount you donated in the past 12 months</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
						<p>
							Any disputes arising from these Terms will be resolved through binding arbitration in accordance
							with [Jurisdiction TBD] law. You waive the right to participate in class actions.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
						<p>
							We may update these Terms from time to time. Material changes will be communicated via email
							at least 30 days before taking effect. Continued use of the Service after changes constitutes
							acceptance.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Termination</h2>
						<p>
							We may suspend or terminate your account if you violate these Terms. Upon termination:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Your subscription will be cancelled</li>
							<li>Funds already in the donation pool will still be distributed to partners</li>
							<li>You will not receive refunds for partial months</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Contact</h2>
						<p>
							For questions about these Terms, contact us at:
						</p>
						<p className="mt-2">
							<strong>Email:</strong> <a href="mailto:legal@givetransparent.org" className="text-primary hover:underline">legal@givetransparent.org</a><br />
							<strong>Mail:</strong> GiveTransparent, Legal Department, [Address TBD]
						</p>
					</section>
				</CardContent>
			</Card>
		</div>
	);
}
