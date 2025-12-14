import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, FlaskConical, CheckCircle2, Download, FileText } from "lucide-react";
import { PILLARS, type PayoutBatch } from "@/lib/mock-data";
import { generateQuarterReportPDF } from "@/lib/pdf-utils";
import { useDataStore } from "@/contexts/DataStoreContext";

export const Route = createFileRoute("/impact")({
	component: ImpactPage,
});

const PILLAR_ICONS = {
	environment: Leaf,
	"human-aid": Heart,
	research: FlaskConical,
};

function ImpactPage() {
	const { impactReports, payoutBatches } = useDataStore();

	const handleDownloadPDF = (batch: PayoutBatch) => {
		generateQuarterReportPDF({
			quarter: batch.quarter,
			year: batch.year,
			totalAmount: batch.totalAmount,
			payouts: batch.payouts.map(p => ({
				partnerName: p.partnerName,
				pillar: PILLARS[p.pillar].name,
				amount: p.amount,
			})),
		});
	};

	const handleViewProof = (batch: PayoutBatch) => {
		// In production, this would open the actual proof PDF
		// For now, we'll generate and open the same PDF
		generateQuarterReportPDF({
			quarter: batch.quarter,
			year: batch.year,
			totalAmount: batch.totalAmount,
			payouts: batch.payouts.map(p => ({
				partnerName: p.partnerName,
				pillar: PILLARS[p.pillar].name,
				amount: p.amount,
			})),
		});
	};

	return (
		<div className="max-w-4xl mx-auto space-y-12">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Impact Reports</h1>
				<p className="text-xl text-muted-foreground">
					Public quarterly transparency reports showing exactly where funds went
				</p>
			</div>

			{/* Quarterly Reports */}
			<div className="space-y-6">
				{impactReports.map((report) => {
					return (
						<Card key={report.id}>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div>
										<CardTitle>
											{report.quarter} {report.year} Impact Report
										</CardTitle>
										<CardDescription>{report.dateRange}</CardDescription>
									</div>
									<Badge variant="secondary">Published {new Date(report.publishedDate).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-6">
								<p className="text-sm text-muted-foreground">{report.summary}</p>

								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
									<div className="p-4 bg-muted rounded-lg">
										<div className="text-2xl font-bold text-primary">
											£{report.totalDonated.toLocaleString()}
										</div>
										<div className="text-sm text-muted-foreground">Sent to Partners</div>
									</div>
									<div className="p-4 bg-muted rounded-lg">
										<div className="text-2xl font-bold">
											{report.totalPartners}
										</div>
										<div className="text-sm text-muted-foreground">Partners Funded</div>
									</div>
									<div className="p-4 bg-muted rounded-lg col-span-2 md:col-span-1">
										<div className="text-2xl font-bold">
											{report.highlights.length}
										</div>
										<div className="text-sm text-muted-foreground">Key Achievements</div>
									</div>
								</div>

								<div>
									<h4 className="font-semibold mb-3">Highlights</h4>
									<ul className="space-y-2">
										{report.highlights.map((highlight, idx) => (
											<li key={idx} className="flex gap-2 text-sm">
												<CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
												{highlight}
											</li>
										))}
									</ul>
								</div>

								<Separator />

								<div>
									<h4 className="font-semibold mb-3">Pillar Breakdown</h4>
									<div className="space-y-4">
										{report.pillarBreakdown.map((pb) => {
											const Icon = PILLAR_ICONS[pb.pillar];
											return (
												<div key={pb.pillar} className="flex items-start gap-3">
													<Icon className={`size-5 ${PILLARS[pb.pillar].color} shrink-0 mt-0.5`} />
													<div className="flex-1">
														<div className="flex justify-between items-center mb-1">
															<span className="font-medium">{PILLARS[pb.pillar].name}</span>
															<span className="font-semibold">£{pb.amount.toLocaleString()}</span>
														</div>
														<p className="text-sm text-muted-foreground">{pb.impact}</p>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Payout Log Placeholder */}
			<div>
				<h2 className="text-2xl font-bold mb-6">Payout Log</h2>
				<Card>
					<CardHeader>
						<CardTitle>Verified Payouts</CardTitle>
						<CardDescription>Historical record of all partner payouts</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{payoutBatches.filter(b => b.status === "sent").map((batch) => (
								<div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
									<div className="flex-1">
										<div className="font-medium">{batch.quarter} {batch.year}</div>
										<div className="text-sm text-muted-foreground">
											Sent {batch.dateSent ? new Date(batch.dateSent).toLocaleDateString("en-GB") : "Pending"}
										</div>
									</div>
									<div className="text-right">
										<div className="font-semibold mb-2">£{batch.totalAmount.toLocaleString()}</div>
										<Badge variant="default" className="mb-3">
											<CheckCircle2 className="size-3 mr-1" />
											Verified
										</Badge>
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleDownloadPDF(batch)}
											>
												<Download className="size-3 mr-1" />
												Download PDF
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleViewProof(batch)}
											>
												<FileText className="size-3 mr-1" />
												View Proof
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* CTA */}
			<Card className="bg-primary/5 border-primary/20">
				<CardContent className="pt-6 text-center">
					<h3 className="text-xl font-bold mb-2">Join Our Transparent Community</h3>
					<p className="text-muted-foreground mb-4">
						Start your giving journey and see your impact in our next quarterly report.
					</p>
					<Link to="/signup">
						<Button size="lg">Start a Plan</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
