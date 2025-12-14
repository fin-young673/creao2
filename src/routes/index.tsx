import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Leaf,
	Heart,
	FlaskConical,
	Info,
	Download,
	Shield,
	DollarSign,
	BarChart3,
	ArrowRight,
	Sparkles,
} from "lucide-react";
import { PercentageSplitter } from "@/components/PercentageSplitter";
import {
	mockCurrentPlan,
	mockImpactMetrics,
	type DonationPlan,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const [plan, setPlan] = useState<DonationPlan>(mockCurrentPlan);

	const updatePlan = (env: number, human: number, research: number) => {
		setPlan({ ...plan, environmentPercent: env, humanAidPercent: human, researchPercent: research });
	};

	const calculateSplit = (amount: number) => {
		const stripeFee = amount * 0.029;
		const platformFee = amount * 0.035;
		const innovationFund = amount * 0.006;
		const donationPool = amount - stripeFee - platformFee - innovationFund;
		return { stripeFee, platformFee, innovationFund, donationPool };
	};

	const split = calculateSplit(plan.amount);

	return (
		<div className="space-y-16">
			{/* Hero Section */}
			<section className="text-center space-y-6 py-12">
				<Badge variant="secondary" className="mb-2">
					<Sparkles className="size-3 mr-1" />
					100% Transparent Giving
				</Badge>
				<h1 className="text-5xl font-bold tracking-tight">
					Give Monthly.
					<br />
					<span className="text-primary">Track Every Penny.</span>
				</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Customize your monthly donation across three pillars. See exactly where your
					money goes with quarterly reports and full fee transparency.
				</p>
				<div className="flex gap-4 justify-center pt-4">
					<Link to="/signup">
						<Button size="lg">
							Start Giving
							<ArrowRight className="size-4 ml-2" />
						</Button>
					</Link>
					<Link to="/how-it-works">
						<Button size="lg" variant="outline">
							How It Works
						</Button>
					</Link>
				</div>
			</section>

			{/* Interactive Plan Builder */}
			<section className="max-w-5xl mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold mb-2">Build Your Monthly Plan</h2>
					<p className="text-muted-foreground">
						Customize your giving across three impact pillars
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<Card>
						<CardHeader>
							<CardTitle>Customize Your Split</CardTitle>
							<CardDescription>
								Adjust percentages across pillars (must total 100%)
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label>Monthly Amount: £{plan.amount}</Label>
								<Slider
									value={[plan.amount]}
									onValueChange={(v) => setPlan({ ...plan, amount: v[0] })}
									min={10}
									max={100}
									step={5}
								/>
							</div>

							<Separator />

							<PercentageSplitter
								environmentPercent={plan.environmentPercent}
								humanAidPercent={plan.humanAidPercent}
								researchPercent={plan.researchPercent}
								onPercentagesChange={updatePlan}
							/>
						</CardContent>
					</Card>

					<Card className="border-primary/50">
						<CardHeader>
							<CardTitle>Your Impact Preview</CardTitle>
							<CardDescription>Estimated monthly outcomes</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3 text-sm">
								<div className="flex justify-between items-center">
									<span className="flex items-center gap-2">
										<Leaf className="size-4 text-green-600" />
										Environment
									</span>
									<span className="font-semibold">
										£{((split.donationPool * plan.environmentPercent) / 100).toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="flex items-center gap-2">
										<Heart className="size-4 text-blue-600" />
										Human Aid
									</span>
									<span className="font-semibold">
										£{((split.donationPool * plan.humanAidPercent) / 100).toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="flex items-center gap-2">
										<FlaskConical className="size-4 text-purple-600" />
										Research
									</span>
									<span className="font-semibold">
										£{((split.donationPool * plan.researchPercent) / 100).toFixed(2)}
									</span>
								</div>

								<Separator />

								<div className="text-xs text-muted-foreground space-y-1">
									<div className="flex justify-between">
										<span>Stripe Fee (2.9%)</span>
										<span>£{split.stripeFee.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>Platform Ops (3.5%)</span>
										<span>£{split.platformFee.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>Innovation (0.6%)</span>
										<span>£{split.innovationFund.toFixed(2)}</span>
									</div>
								</div>

								<Alert>
									<Info className="size-4" />
									<AlertDescription className="text-xs">
										Example estimates based on partner conversion rates. Actual impact
										varies.
									</AlertDescription>
								</Alert>
							</div>
						</CardContent>
						<CardFooter>
							<Link to="/signup" className="w-full">
								<Button className="w-full">Subscribe Now</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</section>

			{/* Trust Strip */}
			<section className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
				<Card className="text-center">
					<CardContent className="pt-6">
						<Shield className="size-8 mx-auto mb-2 text-primary" />
						<h3 className="font-semibold">Stripe Secure</h3>
						<p className="text-xs text-muted-foreground mt-1">Bank-level encryption</p>
					</CardContent>
				</Card>
				<Card className="text-center">
					<CardContent className="pt-6">
						<BarChart3 className="size-8 mx-auto mb-2 text-primary" />
						<h3 className="font-semibold">Quarterly Reports</h3>
						<p className="text-xs text-muted-foreground mt-1">Full transparency</p>
					</CardContent>
				</Card>
				<Card className="text-center">
					<CardContent className="pt-6">
						<DollarSign className="size-8 mx-auto mb-2 text-primary" />
						<h3 className="font-semibold">Fee Breakdown</h3>
						<p className="text-xs text-muted-foreground mt-1">See every penny</p>
					</CardContent>
				</Card>
				<Card className="text-center">
					<CardContent className="pt-6">
						<Download className="size-8 mx-auto mb-2 text-primary" />
						<h3 className="font-semibold">Tax Receipts</h3>
						<p className="text-xs text-muted-foreground mt-1">Monthly downloads</p>
					</CardContent>
				</Card>
			</section>

			{/* Featured Impact */}
			<section>
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold mb-2">Recent Impact</h2>
					<p className="text-muted-foreground">Q4 2024 highlights from our community</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{mockImpactMetrics.slice(0, 3).map((metric, idx) => (
						<Card key={idx}>
							<CardContent className="pt-6 text-center">
								<div className="text-4xl font-bold text-primary mb-2">
									{metric.value.toLocaleString()}
								</div>
								<div className="text-sm font-medium">{metric.label}</div>
								<Badge variant="secondary" className="mt-2 text-xs">
									<Info className="size-3 mr-1" />
									Estimated
								</Badge>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="text-center py-12 bg-muted/30 -mx-4 px-4 rounded-lg">
				<h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
				<p className="text-muted-foreground mb-6 max-w-xl mx-auto">
					Join thousands of donors who track every penny of their giving.
					Start your transparent donation journey today.
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
							View Impact Reports
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
