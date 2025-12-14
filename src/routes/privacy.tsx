import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-8">
			<div className="text-center space-y-4">
				<Shield className="size-12 mx-auto text-primary" />
				<h1 className="text-4xl font-bold">Privacy Policy</h1>
				<p className="text-muted-foreground">Last updated: March 2025</p>
			</div>

			<Card>
				<CardContent className="pt-6 space-y-6 prose prose-sm max-w-none dark:prose-invert">
					<section>
						<h2 className="text-2xl font-bold mb-4">Introduction</h2>
						<p>
							GiveTransparent ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy
							explains how we collect, use, disclose, and safeguard your information when you use our donation
							platform.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

						<h3 className="text-lg font-semibold mt-4 mb-2">Personal Information</h3>
						<p>When you create an account and make donations, we collect:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Name and email address</li>
							<li>Payment information (processed securely through Stripe)</li>
							<li>Donation preferences and allocation settings</li>
							<li>Communication preferences</li>
						</ul>

						<h3 className="text-lg font-semibold mt-4 mb-2">Usage Information</h3>
						<p>We automatically collect certain information about your device and how you interact with our platform:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Browser type and version</li>
							<li>IP address and location data</li>
							<li>Pages viewed and features used</li>
							<li>Time and date of visits</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
						<p>We use your information to:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Process your monthly donations</li>
							<li>Send you payment receipts and quarterly impact reports</li>
							<li>Communicate platform updates and partner stories</li>
							<li>Improve our services and user experience</li>
							<li>Comply with legal obligations and prevent fraud</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
						<p>We do NOT sell your personal information. We may share your information with:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li><strong>Stripe</strong>: Our payment processor (subject to their privacy policy)</li>
							<li><strong>Service Providers</strong>: Email services, analytics tools, hosting providers</li>
							<li><strong>Legal Requirements</strong>: When required by law or to protect our rights</li>
						</ul>
						<p className="mt-4">
							We do NOT share your personal information with our charity partners unless you explicitly opt-in.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Data Security</h2>
						<p>
							We implement industry-standard security measures to protect your information:
						</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Encryption in transit (HTTPS/TLS)</li>
							<li>Secure payment processing via Stripe (PCI DSS compliant)</li>
							<li>Regular security audits and monitoring</li>
							<li>Limited employee access to personal data</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Your Rights</h2>
						<p>You have the right to:</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							<li>Access your personal data</li>
							<li>Correct inaccurate information</li>
							<li>Request deletion of your account</li>
							<li>Opt-out of marketing communications</li>
							<li>Export your donation history</li>
						</ul>
						<p className="mt-4">
							To exercise these rights, contact us at <a href="mailto:privacy@givetransparent.org" className="text-primary hover:underline">privacy@givetransparent.org</a>
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Cookies</h2>
						<p>
							We use essential cookies to maintain your session and preferences. We do not use advertising
							or tracking cookies. You can disable cookies in your browser settings, but this may affect
							platform functionality.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
						<p>
							Our platform is not intended for users under 18. We do not knowingly collect information from
							children. If you believe we have collected information from a child, please contact us immediately.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
						<p>
							We may update this Privacy Policy from time to time. We will notify you of material changes via
							email or a prominent notice on our platform.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-2xl font-bold mb-4">Contact Us</h2>
						<p>
							If you have questions about this Privacy Policy or our data practices, contact us at:
						</p>
						<p className="mt-2">
							<strong>Email:</strong> <a href="mailto:privacy@givetransparent.org" className="text-primary hover:underline">privacy@givetransparent.org</a><br />
							<strong>Mail:</strong> GiveTransparent, Privacy Team, [Address TBD]
						</p>
					</section>
				</CardContent>
			</Card>
		</div>
	);
}
