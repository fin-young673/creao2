import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, MessageSquare, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In production, this would send to a backend API
		console.log("Contact form submission:", formData);
		setSubmitted(true);

		// Reset form after 3 seconds
		setTimeout(() => {
			setSubmitted(false);
			setFormData({ name: "", email: "", subject: "", message: "" });
		}, 3000);
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			<div className="text-center space-y-4">
				<Mail className="size-12 mx-auto text-primary" />
				<h1 className="text-4xl font-bold">Contact Us</h1>
				<p className="text-xl text-muted-foreground">
					Have questions? We're here to help.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				{/* Contact Form */}
				<Card>
					<CardHeader>
						<CardTitle>Send Us a Message</CardTitle>
						<CardDescription>
							We'll get back to you within 24 hours
						</CardDescription>
					</CardHeader>
					<CardContent>
						{submitted ? (
							<Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
								<CheckCircle2 className="size-4 text-green-600" />
								<AlertDescription className="text-green-800 dark:text-green-200">
									Thank you for your message! We'll be in touch soon.
								</AlertDescription>
							</Alert>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										value={formData.subject}
										onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										rows={5}
										value={formData.message}
										onChange={(e) => setFormData({ ...formData, message: e.target.value })}
										required
									/>
								</div>

								<Button type="submit" className="w-full">
									<MessageSquare className="size-4 mr-2" />
									Send Message
								</Button>
							</form>
						)}
					</CardContent>
				</Card>

				{/* Contact Information */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Email Support</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div>
								<div className="font-semibold text-sm">General Inquiries</div>
								<a href="mailto:hello@givetransparent.org" className="text-primary hover:underline">
									hello@givetransparent.org
								</a>
							</div>
							<div>
								<div className="font-semibold text-sm">Transparency Questions</div>
								<a href="mailto:transparency@givetransparent.org" className="text-primary hover:underline">
									transparency@givetransparent.org
								</a>
							</div>
							<div>
								<div className="font-semibold text-sm">Technical Support</div>
								<a href="mailto:support@givetransparent.org" className="text-primary hover:underline">
									support@givetransparent.org
								</a>
							</div>
							<div>
								<div className="font-semibold text-sm">Privacy & Legal</div>
								<a href="mailto:legal@givetransparent.org" className="text-primary hover:underline">
									legal@givetransparent.org
								</a>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>FAQ</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							<div>
								<div className="font-semibold">When are payouts made?</div>
								<p className="text-muted-foreground">
									At the end of each quarter: March 31, June 30, September 30, December 31.
								</p>
							</div>
							<div>
								<div className="font-semibold">Can I change my allocation?</div>
								<p className="text-muted-foreground">
									Yes, anytime from your dashboard. Changes apply to your next billing date.
								</p>
							</div>
							<div>
								<div className="font-semibold">Are donations tax-deductible?</div>
								<p className="text-muted-foreground">
									We are not a registered charity, so donations may not be tax-deductible. Consult a tax professional.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="pt-6">
							<p className="text-sm text-muted-foreground">
								<strong>Response Time:</strong> We aim to respond to all inquiries within 24 hours
								during business days (Monday-Friday). For urgent issues related to payments or
								account access, please email support@givetransparent.org.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
