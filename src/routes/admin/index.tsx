import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
	Trash2,
	Download,
	Upload,
	Leaf,
	Heart,
	FlaskConical,
	Moon,
	Sun,
	RotateCcw,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDataStore } from "@/contexts/DataStoreContext";
import { PILLARS, type BlogPost, type ImpactReport, type Pillar } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});

const PILLAR_ICONS = {
	environment: Leaf,
	"human-aid": Heart,
	research: FlaskConical,
};

function AdminDashboard() {
	const navigate = useNavigate();
	const { adminEmail, adminLogout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const {
		adminPartners,
		adminStats,
		payoutBatches,
		blogPosts,
		impactReports,
		deleteAdminPartner,
		addBlogPost,
		addImpactReport,
		getAllTimeStats,
		resetToDefaults,
	} = useDataStore();

	const [activeTab, setActiveTab] = useState("overview");
	const [selectedQuarter, setSelectedQuarter] = useState("Q1 2025");

	// Blog post creation dialog
	const [blogDialogOpen, setBlogDialogOpen] = useState(false);
	const [newBlogPost, setNewBlogPost] = useState({
		title: "",
		slug: "",
		category: "updates" as BlogPost["category"],
		excerpt: "",
		content: "",
		imageUrl: "",
	});

	// Impact report creation dialog
	const [reportDialogOpen, setReportDialogOpen] = useState(false);
	const [newReport, setNewReport] = useState({
		quarter: "Q1",
		year: 2025,
		dateRange: "",
		summary: "",
		highlights: "",
	});

	const handleAdminLogout = () => {
		adminLogout();
		navigate({ to: "/" });
	};

	const handleExportCSV = () => {
		const batch = payoutBatches.find(b => `${b.quarter} ${b.year}` === selectedQuarter);
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

	const handleDeletePartner = (partnerId: string, partnerName: string) => {
		if (confirm(`Delete ${partnerName}? This action cannot be undone.`)) {
			deleteAdminPartner(partnerId);
		}
	};

	const handleCreateBlogPost = () => {
		if (!newBlogPost.title || !newBlogPost.content) {
			alert("Please fill in title and content");
			return;
		}

		const post: BlogPost = {
			id: `post-${Date.now()}`,
			title: newBlogPost.title,
			slug: newBlogPost.slug || newBlogPost.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
			category: newBlogPost.category,
			excerpt: newBlogPost.excerpt || newBlogPost.content.substring(0, 150) + "...",
			content: newBlogPost.content,
			publishedDate: new Date().toISOString().split("T")[0],
			readingTime: Math.ceil(newBlogPost.content.split(" ").length / 200),
			imageUrl: newBlogPost.imageUrl || undefined,
		};

		addBlogPost(post);
		setBlogDialogOpen(false);
		setNewBlogPost({ title: "", slug: "", category: "updates", excerpt: "", content: "", imageUrl: "" });
		alert("Blog post created successfully! It will now appear on the public blog.");
	};

	const handleCreateImpactReport = () => {
		if (!newReport.summary || !newReport.highlights) {
			alert("Please fill in summary and highlights");
			return;
		}

		const report: ImpactReport = {
			id: `impact-${newReport.quarter.toLowerCase()}-${newReport.year}`,
			quarter: newReport.quarter,
			year: newReport.year,
			dateRange: newReport.dateRange || `${newReport.quarter} ${newReport.year}`,
			publishedDate: new Date().toISOString().split("T")[0],
			summary: newReport.summary,
			highlights: newReport.highlights.split("\n").filter(h => h.trim()),
			totalDonated: adminStats.donationPoolThisQuarter,
			totalPartners: adminPartners.filter(p => p.status === "verified").length,
			pillarBreakdown: [
				{ pillar: "environment" as Pillar, amount: Math.round(adminStats.donationPoolThisQuarter * 0.33), impact: "Environmental projects funded" },
				{ pillar: "human-aid" as Pillar, amount: Math.round(adminStats.donationPoolThisQuarter * 0.40), impact: "Human aid programs supported" },
				{ pillar: "research" as Pillar, amount: Math.round(adminStats.donationPoolThisQuarter * 0.27), impact: "Research initiatives funded" },
			],
		};

		addImpactReport(report);
		setReportDialogOpen(false);
		setNewReport({ quarter: "Q1", year: 2025, dateRange: "", summary: "", highlights: "" });
		alert("Impact report created successfully! It will now appear on the public Impact page.");
	};

	const handleResetData = () => {
		if (confirm("Reset all data to demo defaults? This will clear all your changes.")) {
			resetToDefaults();
			alert("Data has been reset to demo defaults.");
		}
	};

	const allTimeStats = getAllTimeStats();

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
					<Button variant="ghost" size="sm" onClick={handleResetData} className="w-full justify-start text-amber-600 hover:text-amber-700">
						<RotateCcw className="size-4 mr-2" />
						Reset Demo Data
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
									<div className="text-2xl font-bold">£{adminStats.donationPoolThisQuarter.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">This quarter</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">£{adminStats.estimatedFeesCollected.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">Est. this quarter</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Dispute Reserve</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">£{adminStats.reserveHeldForDisputes.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">Held back</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{adminStats.activeSubscribers.toLocaleString()}</div>
									<p className="text-xs text-muted-foreground mt-1">Monthly donors</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium">Next Payout</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{new Date(adminStats.nextPayoutDate).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}</div>
									<p className="text-xs text-muted-foreground mt-1">End of quarter</p>
								</CardContent>
							</Card>
						</div>

						{/* All-Time Stats */}
						<Card>
							<CardHeader>
								<CardTitle>All-Time Statistics</CardTitle>
								<CardDescription>Computed from all stored quarters and payments</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-4 gap-4">
									<div className="p-4 bg-muted rounded-lg text-center">
										<div className="text-2xl font-bold text-primary">£{allTimeStats.totalDonated.toLocaleString()}</div>
										<div className="text-sm text-muted-foreground">Total Donated</div>
									</div>
									<div className="p-4 bg-muted rounded-lg text-center">
										<div className="text-2xl font-bold">£{allTimeStats.totalFees.toLocaleString()}</div>
										<div className="text-sm text-muted-foreground">Total Fees</div>
									</div>
									<div className="p-4 bg-muted rounded-lg text-center">
										<div className="text-2xl font-bold text-green-600">£{allTimeStats.totalSentToPartners.toLocaleString()}</div>
										<div className="text-sm text-muted-foreground">Sent to Partners</div>
									</div>
									<div className="p-4 bg-muted rounded-lg text-center">
										<div className="text-2xl font-bold">{allTimeStats.totalQuarters}</div>
										<div className="text-sm text-muted-foreground">Quarters Closed</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Quick Stats by Pillar</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-3 gap-4">
									{(["environment", "human-aid", "research"] as const).map((pillar) => {
										const Icon = PILLAR_ICONS[pillar];
										const partnerCount = adminPartners.filter(p => p.pillar === pillar && p.status === "verified").length;
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
							<Link to="/admin/partners/new">
								<Button>
									<Plus className="size-4 mr-2" />
									Add Partner
								</Button>
							</Link>
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
										{adminPartners.map((partner) => {
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
															<Button variant="ghost" size="sm" title="Edit partner">
																<Edit className="size-4" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																title="Delete partner"
																onClick={() => handleDeletePartner(partner.id, partner.name)}
															>
																<Trash2 className="size-4" />
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
											{payoutBatches.map(batch => (
												<SelectItem key={batch.id} value={`${batch.quarter} ${batch.year}`}>
													{batch.quarter} {batch.year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Button
										variant="outline"
										onClick={() => {
											alert(`Simulating close for ${selectedQuarter}.\n\nIn production, this would:\n- Calculate final allocations\n- Generate payout preview\n- Prepare partner notifications`);
										}}
									>
										Simulate Close Quarter
									</Button>
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
									const batch = payoutBatches.find(b => `${b.quarter} ${b.year}` === selectedQuarter);
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
							{payoutBatches.map((batch) => (
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
									<CardDescription>Create and manage blog content ({blogPosts.length} posts)</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm mb-4">
										Publish updates, partner stories, and transparency reports.
									</p>
									<div className="text-sm text-muted-foreground mb-2">
										Recent: {blogPosts.slice(0, 3).map(p => p.title).join(", ")}
									</div>
								</CardContent>
								<CardFooter>
									<Button onClick={() => setBlogDialogOpen(true)}>
										<Plus className="size-4 mr-2" />
										Create Blog Post
									</Button>
								</CardFooter>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Impact Reports</CardTitle>
									<CardDescription>Quarterly transparency reports ({impactReports.length} reports)</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm mb-4">
										Generate and publish quarterly impact reports for donors.
									</p>
									<div className="text-sm text-muted-foreground mb-2">
										Recent: {impactReports.slice(0, 3).map(r => `${r.quarter} ${r.year}`).join(", ")}
									</div>
								</CardContent>
								<CardFooter>
									<Button onClick={() => setReportDialogOpen(true)}>
										<Plus className="size-4 mr-2" />
										Create Impact Report
									</Button>
								</CardFooter>
							</Card>
						</div>

						{/* Settings Card */}
						<Card className="border-amber-500">
							<CardHeader>
								<CardTitle>Development Settings</CardTitle>
								<CardDescription>Tools for development and testing</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between">
									<div>
										<div className="font-medium">Reset Demo Data</div>
										<div className="text-sm text-muted-foreground">
											Clear all changes and restore default demo data
										</div>
									</div>
									<Button variant="outline" onClick={handleResetData}>
										<RotateCcw className="size-4 mr-2" />
										Reset Data
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</main>

			{/* Blog Post Dialog */}
			<Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Create Blog Post</DialogTitle>
						<DialogDescription>
							This post will appear on the public blog immediately.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Title</Label>
							<Input
								value={newBlogPost.title}
								onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
								placeholder="Post title"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Category</Label>
								<Select
									value={newBlogPost.category}
									onValueChange={(v) => setNewBlogPost({ ...newBlogPost, category: v as BlogPost["category"] })}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="updates">Updates</SelectItem>
										<SelectItem value="partner-stories">Partner Stories</SelectItem>
										<SelectItem value="transparency">Transparency</SelectItem>
										<SelectItem value="methodology">Methodology</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Image URL (optional)</Label>
								<Input
									value={newBlogPost.imageUrl}
									onChange={(e) => setNewBlogPost({ ...newBlogPost, imageUrl: e.target.value })}
									placeholder="https://..."
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label>Excerpt (optional)</Label>
							<Textarea
								value={newBlogPost.excerpt}
								onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
								placeholder="Short summary..."
								rows={2}
							/>
						</div>
						<div className="space-y-2">
							<Label>Content (Markdown supported)</Label>
							<Textarea
								value={newBlogPost.content}
								onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
								placeholder="# Heading\n\nPost content..."
								rows={10}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setBlogDialogOpen(false)}>Cancel</Button>
						<Button onClick={handleCreateBlogPost}>Create Post</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Impact Report Dialog */}
			<Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Impact Report</DialogTitle>
						<DialogDescription>
							This report will appear on the public Impact page immediately.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Quarter</Label>
								<Select
									value={newReport.quarter}
									onValueChange={(v) => setNewReport({ ...newReport, quarter: v })}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Q1">Q1</SelectItem>
										<SelectItem value="Q2">Q2</SelectItem>
										<SelectItem value="Q3">Q3</SelectItem>
										<SelectItem value="Q4">Q4</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Year</Label>
								<Input
									type="number"
									value={newReport.year}
									onChange={(e) => setNewReport({ ...newReport, year: parseInt(e.target.value) })}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label>Date Range</Label>
							<Input
								value={newReport.dateRange}
								onChange={(e) => setNewReport({ ...newReport, dateRange: e.target.value })}
								placeholder="e.g., Jan 1 - Mar 31, 2025"
							/>
						</div>
						<div className="space-y-2">
							<Label>Summary</Label>
							<Textarea
								value={newReport.summary}
								onChange={(e) => setNewReport({ ...newReport, summary: e.target.value })}
								placeholder="Brief summary of the quarter..."
								rows={3}
							/>
						</div>
						<div className="space-y-2">
							<Label>Highlights (one per line)</Label>
							<Textarea
								value={newReport.highlights}
								onChange={(e) => setNewReport({ ...newReport, highlights: e.target.value })}
								placeholder="250,000 trees planted&#10;15 tonnes of plastic removed&#10;..."
								rows={5}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setReportDialogOpen(false)}>Cancel</Button>
						<Button onClick={handleCreateImpactReport}>Create Report</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
