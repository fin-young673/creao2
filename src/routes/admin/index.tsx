import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	LayoutDashboard,
	Users,
	CreditCard,
	FileText,
	Settings,
	LogOut,
	AlertTriangle,
	Plus,
	Edit,
	Archive,
	Download,
	Upload,
	Leaf,
	Heart,
	FlaskConical,
	Moon,
	Sun,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
	ADMIN_PARTNERS,
	ADMIN_STATS,
	PAYOUT_BATCHES,
	PILLARS,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});

// Type alias for navigation
type NavigateTo = "/" | "/admin" | "/admin/login";

const PILLAR_ICONS = {
	environment: Leaf,
	"human-aid": Heart,
	research: FlaskConical,
};

function AdminDashboard() {
	const navigate = useNavigate();
	const { adminEmail, adminLogout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [activeTab, setActiveTab] = useState("overview");
	const [selectedQuarter, setSelectedQuarter] = useState("Q1 2025");

	const handleAdminLogout = () => {
		adminLogout();
		navigate({ to: "/" });
	};

	const handleExportCSV = () => {
		const batch = PAYOUT_BATCHES.find(b => `${b.quarter} ${b.year}` === selectedQuarter);
		if (!batch) return;

		const csvContent = [
			["Partner", "Pillar", "Amount", "Notes"].join(","),
			...batch.payouts.map(p => [
				`"${p.partnerName}"`,
				p.pillar,
				p.amount,
				`"${p.notes || ""}"`
			].join(","))
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `payout-report-${batch.quarter}-${batch.year}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="min-h-screen bg-background flex">
			{/* Sidebar */}
			<aside className="w-64 border-r bg-muted/30 p-4 hidden md:flex flex-col">
				<div className="mb-8">
					<Link to="/" className="font-bold text-xl">
						Give<span className="text-primary">Transparent</span>
					</Link>
					<p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
				</div>

				<nav className="flex-1 space-y-1">
					<button
						onClick={() => setActiveTab("overview")}
						className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
					>
						<LayoutDashboard className="size-4" />
						Overview
					</button>
					<button
						onClick={() => setActiveTab("partners")}
						className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "partners" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
					>
						<Users className="size-4" />
						Partners
					</button>
					<button
						onClick={() => setActiveTab("allocations")}
						className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "allocations" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
					>
						<CreditCard className="size-4" />
						Allocations & Payouts
					</button>
					<button
						onClick={() => setActiveTab("payout-log")}
						className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "payout-log" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
					>
						<FileText className="size-4" />
						Payout Log
					</button>
					<button
						onClick={() => setActiveTab("content")}
						className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "content" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
					>
						<Settings className="size-4" />
						Content
					</button>
				</nav>

				<div className="space-y-2 pt-4 border-t">
					<div className="text-xs text-muted-foreground px-3">
						Signed in as: {adminEmail}
					</div>
					<Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start">
						{theme === "dark" ? <Sun className="size-4 mr-2" /> : <Moon className="size-4 mr-2" />}
						{theme === "dark" ? "Light Mode" : "Dark Mode"}
					</Button>
					<Button variant="ghost" size="sm" onClick={handleAdminLogout} className="w-full justify-start text-destructive hover:text-destructive">
						<LogOut className="size-4 mr-2" />
						Admin Logout
					</Button>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-6 overflow-auto">
				{/* Prototype Banner */}
				<Alert className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
					<AlertTriangle className="size-4 text-amber-600" />
					<AlertTitle className="text-amber-800 dark:text-amber-200">Prototype Admin Access</AlertTitle>
					<AlertDescription className="text-amber-700 dark:text-amber-300">
						No password yet. This will be replaced with secure auth before launch.
					</AlertDescription>
				</Alert>

				{/* Mobile Nav */}
				<div className="md:hidden mb-6">
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid w-full grid-cols-5">
							<TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
							<TabsTrigger value="partners" className="text-xs">Partners</TabsTrigger>
							<TabsTrigger value="allocations" className="text-xs">Payouts</TabsTrigger>
							<TabsTrigger value="payout-log" className="text-xs">Log</TabsTrigger>
							<TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* Overview Tab */}
				{activeTab === "overview" && (
					<div className="space-y-6">
						<div>
							<h1 className="text-2xl font-bold">Admin Overview</h1>
							<p className="text-muted-foreground">Platform metrics and status</p>
						</div>

						<div className="grid md:grid-cols-5 gap-4">
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Donation Pool (Q)</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">£{ADMIN_STATS.donationPoolThisQuarter.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">This quarter</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">£{ADMIN_STATS.estimatedFeesCollected.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">Est. this quarter</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Dispute Reserve</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">£{ADMIN_STATS.reserveHeldForDisputes.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">Held back</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{ADMIN_STATS.activeSubscribers.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">Monthly donors</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Next Payout</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{new Date(ADMIN_STATS.nextPayoutDate).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}</div>
									<p className="text-xs text-muted-foreground mt-1">End of quarter</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Quick Stats by Pillar</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-3 gap-4">
									{(["environment", "human-aid", "research"] as const).map((pillar) => {
										const Icon = PILLAR_ICONS[pillar];
										const partnerCount = ADMIN_PARTNERS.filter(p => p.pillar === pillar && p.status === "verified").length;
										return (
											<div key={pillar} className="flex items-center gap-3 p-4 border rounded-lg">
												<Icon className={`size-8 ${PILLARS[pillar].color}`} />
												<div>
													<div className="font-semibold">{PILLARS[pillar].name}</div>
													<div className="text-sm text-muted-foreground">{partnerCount} verified partners</div>
												</div>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Partners Tab */}
				{activeTab === "partners" && (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold">Partner Management</h1>
								<p className="text-muted-foreground">Manage verified and placeholder partners</p>
							</div>
							<Button>
								<Plus className="size-4 mr-2" />
								Add Partner
							</Button>
						</div>

						<Card>
							<CardContent className="pt-6">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Partner</TableHead>
											<TableHead>Pillar</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Reporting</TableHead>
											<TableHead>Conversion Rates</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{ADMIN_PARTNERS.map((partner) => {
											const Icon = PILLAR_ICONS[partner.pillar];
											return (
												<TableRow key={partner.id}>
													<TableCell>
														<div>
															<div className="font-medium">{partner.name}</div>
															<div className="text-xs text-muted-foreground">{partner.region}</div>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															<Icon className={`size-4 ${PILLARS[partner.pillar].color}`} />
															{PILLARS[partner.pillar].name}
														</div>
													</TableCell>
													<TableCell>
														<Badge variant={partner.status === "verified" ? "default" : partner.status === "placeholder" ? "secondary" : "outline"}>
															{partner.status}
														</Badge>
													</TableCell>
													<TableCell className="capitalize">{partner.reportingCadence}</TableCell>
													<TableCell className="text-xs max-w-[200px] truncate">{partner.conversionRates}</TableCell>
													<TableCell>
														<div className="flex gap-1">
															<Button variant="ghost" size="sm">
																<Edit className="size-4" />
															</Button>
															<Button variant="ghost" size="sm">
																<Archive className="size-4" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Allocations Tab */}
				{activeTab === "allocations" && (
					<div className="space-y-6">
						<div>
							<h1 className="text-2xl font-bold">Allocations & Payouts</h1>
							<p className="text-muted-foreground">Quarter close and payout preview</p>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Quarter Close Panel</CardTitle>
								<CardDescription>Select a quarter to view or simulate payout</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-4">
									<Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
										<SelectTrigger className="w-48">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Q1 2025">Q1 2025</SelectItem>
											<SelectItem value="Q4 2024">Q4 2024</SelectItem>
											<SelectItem value="Q3 2024">Q3 2024</SelectItem>
										</SelectContent>
									</Select>
									<Button variant="outline">Simulate Close Quarter</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle>Payout Preview: {selectedQuarter}</CardTitle>
										<CardDescription>Estimated distribution to partners</CardDescription>
									</div>
									<Button variant="outline" onClick={handleExportCSV}>
										<Download className="size-4 mr-2" />
										Export CSV
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{(() => {
									const batch = PAYOUT_BATCHES.find(b => `${b.quarter} ${b.year}` === selectedQuarter);
									if (!batch) return <p className="text-muted-foreground">No data for selected quarter</p>;

									return (
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Partner</TableHead>
													<TableHead>Pillar</TableHead>
													<TableHead className="text-right">Amount</TableHead>
													<TableHead>Notes</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{batch.payouts.map((payout) => {
													const Icon = PILLAR_ICONS[payout.pillar];
													return (
														<TableRow key={payout.partnerId}>
															<TableCell className="font-medium">{payout.partnerName}</TableCell>
															<TableCell>
																<div className="flex items-center gap-2">
																	<Icon className={`size-4 ${PILLARS[payout.pillar].color}`} />
																	{PILLARS[payout.pillar].name}
																</div>
															</TableCell>
															<TableCell className="text-right font-semibold">£{payout.amount.toLocaleString()}</TableCell>
															<TableCell className="text-muted-foreground text-sm">{payout.notes || "-"}</TableCell>
														</TableRow>
													);
												})}
												<TableRow className="bg-muted/50">
													<TableCell colSpan={2} className="font-bold">Total</TableCell>
													<TableCell className="text-right font-bold">£{batch.totalAmount.toLocaleString()}</TableCell>
													<TableCell />
												</TableRow>
											</TableBody>
										</Table>
									);
								})()}
							</CardContent>
						</Card>
					</div>
				)}

				{/* Payout Log Tab */}
				{activeTab === "payout-log" && (
					<div className="space-y-6">
						<div>
							<h1 className="text-2xl font-bold">Payout Log</h1>
							<p className="text-muted-foreground">Historical record of all payout batches</p>
						</div>

						<div className="space-y-4">
							{PAYOUT_BATCHES.map((batch) => (
								<Card key={batch.id}>
									<CardHeader>
										<div className="flex items-center justify-between">
											<div>
												<CardTitle>{batch.quarter} {batch.year}</CardTitle>
												<CardDescription>
													{batch.dateSent ? `Sent ${new Date(batch.dateSent).toLocaleDateString("en-GB")}` : "Draft - Not yet sent"}
												</CardDescription>
											</div>
											<div className="text-right">
												<div className="text-xl font-bold">£{batch.totalAmount.toLocaleString()}</div>
												<Badge variant={batch.status === "sent" ? "default" : "secondary"}>
													{batch.status}
												</Badge>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-4">
											{batch.proofUrl && (
												<Button variant="outline" size="sm">
													<FileText className="size-4 mr-2" />
													View Proof
												</Button>
											)}
											{batch.status === "draft" && (
												<Button variant="outline" size="sm" disabled>
													<Upload className="size-4 mr-2" />
													Attach Proof
												</Button>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* Content Tab */}
				{activeTab === "content" && (
					<div className="space-y-6">
						<div>
							<h1 className="text-2xl font-bold">Content Management</h1>
							<p className="text-muted-foreground">Create and manage public content</p>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle>Blog Posts</CardTitle>
									<CardDescription>Create and manage blog content</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm mb-4">
										Publish updates, partner stories, and transparency reports.
									</p>
								</CardContent>
								<CardFooter>
									<Button>
										<Plus className="size-4 mr-2" />
										Create Blog Post
									</Button>
								</CardFooter>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Impact Reports</CardTitle>
									<CardDescription>Quarterly transparency reports</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm mb-4">
										Generate and publish quarterly impact reports for donors.
									</p>
								</CardContent>
								<CardFooter>
									<Button>
										<Plus className="size-4 mr-2" />
										Create Impact Report
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
