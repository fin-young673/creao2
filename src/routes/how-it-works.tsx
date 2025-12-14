import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
	component: HowItWorksPage,
});

function HowItWorksPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-12">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">How It Works</h1>
				<p className="text-xl text-muted-foreground">
					Complete transparency from your donation to partner impact
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Money Flow</CardTitle>
					<CardDescription>Track your donation every step of the way</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[
							{
								step: 1,
								title: "You Subscribe",
								desc: "Choose your monthly amount and split across pillars",
							},
							{
								step: 2,
								title: "Stripe Processes",
								desc: "Secure payment with 2.9% processing fee",
							},
							{
								step: 3,
								title: "Platform Operations",
								desc: "3.5% covers infrastructure, reporting, and support",
							},
							{
								step: 4,
								title: "Innovation Fund",
								desc: "0.6% funds new partner vetting and tools",
							},
							{
								step: 5,
								title: "Donation Pool",
								desc: "93% goes to your selected pillars",
							},
							{
								step: 6,
								title: "Quarterly Payouts",
								desc: "Partners receive funds and report impact",
							},
							{
								step: 7,
								title: "Your Dashboard",
								desc: "See verified outcomes and download reports",
							},
						].map((item) => (
							<div key={item.step} className="flex gap-4 items-start">
								<div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
									{item.step}
								</div>
								<div>
									<h3 className="font-semibold">{item.title}</h3>
									<p className="text-sm text-muted-foreground">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<div className="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>What We Are</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm">
							<li className="flex gap-2">
								<CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
								A transparent donation platform
							</li>
							<li className="flex gap-2">
								<CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
								Partner vetting and reporting system
							</li>
							<li className="flex gap-2">
								<CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
								Impact tracking and verification
							</li>
							<li className="flex gap-2">
								<CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
								Quarterly fund distribution
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>What We're Not</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm">
							<li className="flex gap-2">
								<AlertCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
								Not a charity ourselves
							</li>
							<li className="flex gap-2">
								<AlertCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
								Not providing direct services
							</li>
							<li className="flex gap-2">
								<AlertCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
								Not guaranteeing specific outcomes
							</li>
							<li className="flex gap-2">
								<AlertCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
								Not an investment or savings product
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
