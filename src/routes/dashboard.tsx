import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Info, Download, Loader2 } from "lucide-react";
import { PercentageSplitter } from "@/components/PercentageSplitter";
import { ImpactChart } from "@/components/ImpactChart";
import { ReceiptCard } from "@/components/ReceiptCard";
import { useAuth } from "@/contexts/AuthContext";
import {
	mockCurrentPlan,
	mockPaymentHistory,
	mockImpactMetrics,
	type DonationPlan,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const [plan, setPlan] = useState<DonationPlan>(mockCurrentPlan);
	const [isRedirecting, setIsRedirecting] = useState(false);

	// Redirect if not authenticated - using useEffect to avoid render-time navigation
	useEffect(() => {
		if (!isAuthenticated) {
			setIsRedirecting(true);
			navigate({ to: "/signin" });
		}
	}, [isAuthenticated, navigate]);

	// Show loading state while redirecting
	if (isRedirecting || !isAuthenticated) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<div className="text-center space-y-4">
					<Loader2 className="size-8 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Redirecting to Sign In...</p>
				</div>
			</div>
		);
	}

	const updatePlan = (env: number, human: number, research: number) => {
		setPlan({ ...plan, environmentPercent: env, humanAidPercent: human, researchPercent: research });
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
				<p className="text-muted-foreground">Track your impact and manage your plan</p>
			</div>

			<Tabs defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="plan">My Plan</TabsTrigger>
					<TabsTrigger value="payments">Payments</TabsTrigger>
					<TabsTrigger value="impact">Impact</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-6 mt-6">
					<div className="grid md:grid-cols-4 gap-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">Lifetime Donated</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">£334.80</div>
								<p className="text-xs text-muted-foreground mt-1">Donation pool only</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">Total Fees Paid</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">£25.20</div>
								<p className="text-xs text-muted-foreground mt-1">All fees combined</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">Sent to Partners</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-green-600">£334.80</div>
								<p className="text-xs text-muted-foreground mt-1">Quarterly payouts</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">Current Plan</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">£{plan.amount}/mo</div>
								<p className="text-xs text-muted-foreground mt-1">3 pillars active</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Your Impact (Estimated)</CardTitle>
								<CardDescription>Based on lifetime donations</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								{mockImpactMetrics.map((metric, idx) => (
									<div key={idx} className="flex items-center justify-between">
										<span className="text-sm">{metric.label}</span>
										<div className="flex items-center gap-2">
											<span className="font-semibold">
												{metric.value} {metric.unit}
											</span>
											<Badge variant="secondary" className="text-xs">
												<Info className="size-3" />
											</Badge>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Current Split</CardTitle>
								<CardDescription>Your monthly allocation</CardDescription>
							</CardHeader>
							<CardContent>
								<ImpactChart
									data={[
										{
											name: "Environment",
											value: plan.environmentPercent,
											color: "hsl(142 76% 36%)",
										},
										{
											name: "Human Aid",
											value: plan.humanAidPercent,
											color: "hsl(221 83% 53%)",
										},
										{
											name: "Research",
											value: plan.researchPercent,
											color: "hsl(271 81% 56%)",
										},
									]}
								/>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Quarter Progress</CardTitle>
							<CardDescription>Q1 2025: Jan 1 - Mar 31</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<div className="flex justify-between text-sm mb-2">
									<span>Days Elapsed</span>
									<span className="font-medium">13 / 90 days</span>
								</div>
								<Progress value={14} />
							</div>
							<div className="grid grid-cols-3 gap-4 text-center text-sm">
								<div>
									<div className="font-semibold">£27.90</div>
									<div className="text-muted-foreground">Collected</div>
								</div>
								<div>
									<div className="font-semibold">£195.30</div>
									<div className="text-muted-foreground">Expected</div>
								</div>
								<div>
									<div className="font-semibold">Mar 31</div>
									<div className="text-muted-foreground">Payout Date</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="plan" className="space-y-6 mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Manage Your Plan</CardTitle>
							<CardDescription>
								Changes apply to your next billing date
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

							<Alert>
								<Info className="size-4" />
								<AlertDescription>
									Next billing date: February 1, 2025
								</AlertDescription>
							</Alert>
						</CardContent>
						<CardFooter>
							<Button className="w-full">Save Changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="payments" className="space-y-6 mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Payment History</CardTitle>
							<CardDescription>Your donation receipts</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Date</TableHead>
										<TableHead>Gross</TableHead>
										<TableHead>Fees</TableHead>
										<TableHead>Donation Pool</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Receipt</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{mockPaymentHistory.map((payment) => (
										<TableRow key={payment.id}>
											<TableCell>
												{new Date(payment.date).toLocaleDateString("en-GB")}
											</TableCell>
											<TableCell>£{payment.gross.toFixed(2)}</TableCell>
											<TableCell className="text-muted-foreground">
												£
												{(
													payment.stripeFee +
													payment.platformFee +
													payment.innovationFund
												).toFixed(2)}
											</TableCell>
											<TableCell className="font-semibold text-green-600">
												£{payment.donationPool.toFixed(2)}
											</TableCell>
											<TableCell>
												<Badge
													variant={
														payment.status === "completed" ? "default" : "secondary"
													}
												>
													{payment.status}
												</Badge>
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="sm">
													<Download className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<div className="grid md:grid-cols-3 gap-4">
						{mockPaymentHistory.slice(0, 3).map((payment) => (
							<ReceiptCard key={payment.id} payment={payment} />
						))}
					</div>
				</TabsContent>

				<TabsContent value="impact" className="space-y-6 mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Impact Timeline</CardTitle>
							<CardDescription>Your monthly contributions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{mockPaymentHistory.map((payment, idx) => (
									<div key={payment.id} className="flex gap-4">
										<div className="flex flex-col items-center">
											<div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
												{idx + 1}
											</div>
											{idx < mockPaymentHistory.length - 1 && (
												<div className="w-px h-full bg-border mt-2" />
											)}
										</div>
										<div className="flex-1 pb-8">
											<div className="font-semibold">
												{new Date(payment.date).toLocaleDateString("en-GB", {
													month: "long",
													year: "numeric",
												})}
											</div>
											<div className="text-sm text-muted-foreground mt-1">
												Contributed £{payment.donationPool.toFixed(2)} to donation pool
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="settings" className="space-y-6 mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Profile Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>Name</Label>
								<Input defaultValue={user?.name} />
							</div>
							<div className="space-y-2">
								<Label>Email</Label>
								<Input defaultValue={user?.email} />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Email Preferences</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">Monthly Impact Updates</div>
									<div className="text-sm text-muted-foreground">
										Receive monthly impact summaries
									</div>
								</div>
								<input type="checkbox" defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">Quarterly Reports</div>
									<div className="text-sm text-muted-foreground">
										Get notified when reports are published
									</div>
								</div>
								<input type="checkbox" defaultChecked />
							</div>
						</CardContent>
					</Card>

					<Card className="border-destructive">
						<CardHeader>
							<CardTitle className="text-destructive">Danger Zone</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium mb-2">Cancel Subscription</h4>
									<p className="text-sm text-muted-foreground mb-4">
										This will stop all future payments. Your current quarter donations
										will still be sent to partners.
									</p>
									<Button variant="destructive">Cancel Subscription</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
