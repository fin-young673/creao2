import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Target, Eye, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-12">
			<div className="text-center space-y-4">
				<Badge variant="secondary" className="mb-2">
					<Heart className="size-3 mr-1" />
					Our Story
				</Badge>
				<h1 className="text-4xl font-bold">About GiveTransparent</h1>
				<p className="text-xl text-muted-foreground">
					Bringing radical transparency to charitable giving
				</p>
			</div>

			{/* Mission Section */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="size-5 text-primary" />
						Our Mission
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-lg">
						We believe every donor deserves to know exactly where their money goes and what impact it creates.
					</p>
					<p>
						GiveTransparent is a donation platform that combines monthly subscriptions with quarterly transparency
						reports. Unlike traditional charities where overhead and administrative costs are hidden, we disclose
						every fee upfront and show you exactly which partners receive your funds.
					</p>
				</CardContent>
			</Card>

			{/* How It Works Section */}
			<div>
				<h2 className="text-2xl font-bold mb-6">How It Works</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<Card>
						<CardContent className="pt-6">
							<div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
								1
							</div>
							<h3 className="font-semibold mb-2">Choose Your Plan</h3>
							<p className="text-sm text-muted-foreground">
								Set a monthly amount and customize your split across three pillars: Environment, Human Aid, and Research.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-6">
							<div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
								2
							</div>
							<h3 className="font-semibold mb-2">We Collect & Hold</h3>
							<p className="text-sm text-muted-foreground">
								Your monthly donation goes into a pool. We collect throughout the quarter and prepare quarterly payouts.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-6">
							<div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
								3
							</div>
							<h3 className="font-semibold mb-2">Quarterly Distribution</h3>
							<p className="text-sm text-muted-foreground">
								At quarter-end, we distribute funds to verified partners and publish a full transparency report.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Methodology Section */}
			<div id="methodology">
				<h2 className="text-2xl font-bold mb-6">Our Methodology</h2>
				<Card>
					<CardContent className="pt-6 space-y-6">
						<div>
							<h3 className="font-semibold mb-3 flex items-center gap-2">
								<CheckCircle2 className="size-5 text-green-600" />
								Partner Verification
							</h3>
							<p className="text-sm text-muted-foreground">
								Every partner goes through rigorous vetting including legal verification, financial audits,
								and field visits. We only work with organizations that can demonstrate measurable impact.
							</p>
						</div>

						<Separator />

						<div>
							<h3 className="font-semibold mb-3 flex items-center gap-2">
								<CheckCircle2 className="size-5 text-green-600" />
								Conversion Rate Validation
							</h3>
							<p className="text-sm text-muted-foreground">
								Partners provide conversion rates (e.g., "£1 = 5 trees planted") based on their actual operational
								costs. We verify these through quarterly reports, receipts, and third-party audits.
							</p>
						</div>

						<Separator />

						<div>
							<h3 className="font-semibold mb-3 flex items-center gap-2">
								<CheckCircle2 className="size-5 text-green-600" />
								Quarterly Reporting
							</h3>
							<p className="text-sm text-muted-foreground">
								At the end of each quarter, we publish a complete breakdown showing:
							</p>
							<ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
								<li>Total donations received</li>
								<li>Every fee collected (Stripe, platform, innovation fund)</li>
								<li>Exact amounts sent to each partner</li>
								<li>Proof of payment and partner acknowledgments</li>
							</ul>
						</div>

						<Separator />

						<div>
							<h3 className="font-semibold mb-3 flex items-center gap-2">
								<CheckCircle2 className="size-5 text-green-600" />
								Impact Estimation vs. Actuals
							</h3>
							<p className="text-sm text-muted-foreground">
								The impact numbers in your dashboard (trees planted, meals provided, etc.) are <strong>estimates</strong>
								based on partner conversion rates. We mark them clearly as estimates. Actual impact is reported by
								partners in quarterly reports with supporting evidence.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Fee Structure */}
			<div>
				<h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
				<Card>
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<div>
									<div className="font-semibold">Stripe Processing Fee</div>
									<div className="text-sm text-muted-foreground">Industry-standard payment processing</div>
								</div>
								<Badge>2.9%</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<div>
									<div className="font-semibold">Platform Operations</div>
									<div className="text-sm text-muted-foreground">Staff, servers, audits, legal compliance</div>
								</div>
								<Badge>3.5%</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<div>
									<div className="font-semibold">Innovation Fund</div>
									<div className="text-sm text-muted-foreground">New partner vetting, tech improvements</div>
								</div>
								<Badge>0.6%</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<div>
									<div className="font-semibold">Donation Pool to Partners</div>
									<div className="text-sm text-muted-foreground">Distributed quarterly to verified organizations</div>
								</div>
								<Badge variant="default" className="bg-green-600">93%</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Vision */}
			<Card className="bg-primary/5 border-primary/20">
				<CardContent className="pt-6">
					<div className="flex items-start gap-3 mb-4">
						<Eye className="size-6 text-primary shrink-0 mt-1" />
						<div>
							<h3 className="text-xl font-bold mb-2">Our Vision</h3>
							<p className="text-muted-foreground">
								We envision a world where every charitable donation is fully transparent, every impact is measurable,
								and donors can trust that their generosity creates real change. By combining technology with rigorous
								verification, we're building the future of giving.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* CTA */}
			<Card className="text-center">
				<CardContent className="pt-6">
					<h3 className="text-xl font-bold mb-2">Ready to Give Transparently?</h3>
					<p className="text-muted-foreground mb-4">
						Join our community of donors who track every penny of their giving.
					</p>
					<div className="flex gap-4 justify-center">
						<Link to="/signup">
							<Button size="lg">
								Start a Plan
								<ArrowRight className="size-4 ml-2" />
							</Button>
						</Link>
						<Link to="/impact">
							<Button size="lg" variant="outline">
								View Quarterly Reports
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
