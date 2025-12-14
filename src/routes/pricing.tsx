import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
	component: PricingPage,
});

function PricingPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-12">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Transparent Pricing</h1>
				<p className="text-xl text-muted-foreground">
					See exactly where every penny of your donation goes
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				{[
					{ name: "Starter", range: "£5-15/mo", recommended: false },
					{ name: "Standard", range: "£20-50/mo", recommended: true },
					{ name: "Custom", range: "£50+/mo", recommended: false },
				].map((tier) => (
					<Card
						key={tier.name}
						className={tier.recommended ? "border-primary shadow-lg" : ""}
					>
						<CardHeader>
							<CardTitle>{tier.name}</CardTitle>
							<CardDescription className="text-2xl font-bold">
								{tier.range}
							</CardDescription>
							{tier.recommended && (
								<Badge variant="default" className="w-fit">
									Most Popular
								</Badge>
							)}
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li className="flex gap-2">
									<Check className="size-4 text-primary shrink-0" />
									Full pillar customization
								</li>
								<li className="flex gap-2">
									<Check className="size-4 text-primary shrink-0" />
									Monthly impact updates
								</li>
								<li className="flex gap-2">
									<Check className="size-4 text-primary shrink-0" />
									Quarterly reports
								</li>
								<li className="flex gap-2">
									<Check className="size-4 text-primary shrink-0" />
									Tax receipts
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Link to="/signup" className="w-full">
								<Button className="w-full">Get Started</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Fee Breakdown</CardTitle>
					<CardDescription>Example for a £30 monthly donation</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span>Monthly Donation</span>
							<span className="font-semibold">£30.00</span>
						</div>
						<Separator />
						<div className="flex justify-between items-center text-muted-foreground text-sm">
							<span>Stripe Processing (2.9%)</span>
							<span>-£0.87</span>
						</div>
						<div className="flex justify-between items-center text-muted-foreground text-sm">
							<span>Platform Operations (3.5%)</span>
							<span>-£1.05</span>
						</div>
						<div className="flex justify-between items-center text-muted-foreground text-sm">
							<span>Innovation Fund (0.6%)</span>
							<span>-£0.18</span>
						</div>
						<Separator />
						<div className="flex justify-between items-center text-lg font-bold">
							<span>Donation Pool (93%)</span>
							<span className="text-green-600">£27.90</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Accordion type="single" collapsible>
				<AccordionItem value="faq-1">
					<AccordionTrigger>Why do you charge platform fees?</AccordionTrigger>
					<AccordionContent>
						Our 3.5% platform fee covers infrastructure costs, partner vetting,
						quarterly reporting, customer support, and ongoing transparency tools. The
						0.6% innovation fund supports adding new partners and improving our
						services.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="faq-2">
					<AccordionTrigger>When do partners receive funds?</AccordionTrigger>
					<AccordionContent>
						We distribute funds quarterly (end of March, June, September, December).
						This allows us to batch transactions efficiently and verify partner
						reporting before payouts.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="faq-3">
					<AccordionTrigger>Can I change my plan anytime?</AccordionTrigger>
					<AccordionContent>
						Yes! You can update your monthly amount or pillar percentages anytime.
						Changes apply to your next billing date.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="faq-4">
					<AccordionTrigger>What if my payment fails?</AccordionTrigger>
					<AccordionContent>
						We'll retry failed payments up to 3 times. You'll receive email
						notifications and can update your payment method in your dashboard.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
