import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useDataStore } from "@/contexts/DataStoreContext";
import { type Pillar, type AdminPartner, type Partner, type PartnerStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/partners/new")({
	component: NewPartnerPage,
});

function NewPartnerPage() {
	const navigate = useNavigate();
	const { addAdminPartner, addPartner } = useDataStore();

	const [formData, setFormData] = useState({
		name: "",
		website: "",
		pillar: "" as Pillar | "",
		status: "" as PartnerStatus | "",
		region: "",
		cadence: "" as "monthly" | "quarterly" | "",
		mission: "",
		conversionRates: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name || !formData.pillar || !formData.status || !formData.region || !formData.cadence || !formData.mission || !formData.conversionRates) {
			alert("Please fill in all required fields");
			return;
		}

		const partnerId = `partner-${Date.now()}`;
		const adminPartnerId = `admin-${partnerId}`;

		// Create admin partner
		const adminPartner: AdminPartner = {
			id: adminPartnerId,
			name: formData.name,
			pillar: formData.pillar as Pillar,
			status: formData.status as PartnerStatus,
			reportingCadence: formData.cadence as "monthly" | "quarterly",
			conversionRates: formData.conversionRates,
			region: formData.region,
			createdAt: new Date().toISOString().split("T")[0],
		};

		// Parse conversion rates for public partner
		const rates = formData.conversionRates.split("|").map(rateStr => {
			const trimmed = rateStr.trim();
			const match = trimmed.match(/^(\d+(?:\.\d+)?)\s+(.+)\s+(per\s+.+)$/);
			if (match) {
				return {
					item: match[2],
					amount: parseFloat(match[1]),
					unit: match[3],
				};
			}
			return { item: trimmed, amount: 1, unit: "per £1" };
		});

		// Create public partner
		const publicPartner: Partner = {
			id: partnerId,
			name: formData.name,
			pillar: formData.pillar as Pillar,
			verified: formData.status === "verified",
			region: formData.region,
			reportingCadence: formData.cadence as "monthly" | "quarterly",
			mission: formData.mission,
			fundedActivities: [],
			reportingMethodology: "Quarterly reports and verification",
			websiteUrl: formData.website || undefined,
			conversionRates: rates,
			recentUpdates: [],
		};

		addAdminPartner(adminPartner);
		addPartner(publicPartner);

		alert("Partner created successfully! It will now appear on the Causes page.");
		navigate({ to: "/admin" });
	};

	return (
		<div className="min-h-screen bg-background p-6">
			<div className="max-w-3xl mx-auto space-y-6">
				<Button variant="ghost" onClick={() => navigate({ to: "/admin" })}>
					<ArrowLeft className="size-4 mr-2" />
					Back to Admin
				</Button>

				<Card>
					<CardHeader>
						<CardTitle>Add New Partner</CardTitle>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Partner Name</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website">Website URL</Label>
								<Input
									id="website"
									type="url"
									placeholder="https://example.org"
									value={formData.website}
									onChange={(e) => setFormData({ ...formData, website: e.target.value })}
								/>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="pillar">Pillar</Label>
									<Select
										value={formData.pillar}
										onValueChange={(v) => setFormData({ ...formData, pillar: v as Pillar })}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select pillar" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="environment">Environment</SelectItem>
											<SelectItem value="human-aid">Human Aid</SelectItem>
											<SelectItem value="research">Research</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="status">Status</Label>
									<Select
										value={formData.status}
										onValueChange={(v) => setFormData({ ...formData, status: v as PartnerStatus })}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="placeholder">Placeholder</SelectItem>
											<SelectItem value="verified">Verified</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="region">Region</Label>
									<Input
										id="region"
										placeholder="e.g., Global, Africa"
										value={formData.region}
										onChange={(e) => setFormData({ ...formData, region: e.target.value })}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="cadence">Reporting Cadence</Label>
									<Select
										value={formData.cadence}
										onValueChange={(v) => setFormData({ ...formData, cadence: v as "monthly" | "quarterly" })}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select cadence" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="monthly">Monthly</SelectItem>
											<SelectItem value="quarterly">Quarterly</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="mission">Mission Statement</Label>
								<Textarea
									id="mission"
									rows={3}
									value={formData.mission}
									onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="conversionRates">Conversion Rates</Label>
								<Input
									id="conversionRates"
									placeholder="e.g., 5 trees per £1 | 0.1 hectares per £10"
									value={formData.conversionRates}
									onChange={(e) => setFormData({ ...formData, conversionRates: e.target.value })}
									required
								/>
								<p className="text-xs text-muted-foreground">
									Example: "5 trees per £1 | 0.1 hectares per £10"
								</p>
							</div>
						</CardContent>
						<CardFooter className="flex gap-2">
							<Button type="submit">Create Partner</Button>
							<Button type="button" variant="outline" onClick={() => navigate({ to: "/admin" })}>
								Cancel
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
