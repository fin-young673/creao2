import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { PillarCard } from "@/components/PillarCard";
import { PILLARS } from "@/lib/mock-data";
import { useDataStore } from "@/contexts/DataStoreContext";

export const Route = createFileRoute("/causes")({
	component: CausesPage,
});

function CausesPage() {
	const { partners } = useDataStore();

	return (
		<div className="space-y-12">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Our Three Pillars</h1>
				<p className="text-xl text-muted-foreground">
					Supporting verified partners across environment, human aid, and research
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				{Object.values(PILLARS).map((pillar) => (
					<PillarCard key={pillar.id} pillar={pillar} />
				))}
			</div>

			<Separator />

			<div>
				<h2 className="text-2xl font-bold mb-6">Our Partners</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{partners.map((partner) => (
						<Card key={partner.id}>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div>
										{partner.websiteUrl ? (
											<a
												href={partner.websiteUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:underline"
											>
												<CardTitle className="hover:text-primary transition-colors">
													{partner.name}
												</CardTitle>
											</a>
										) : (
											<CardTitle>{partner.name}</CardTitle>
										)}
										<CardDescription className="mt-1">
											{PILLARS[partner.pillar].name} &bull; {partner.region}
										</CardDescription>
									</div>
									{partner.verified && (
										<Badge variant="default">
											<Check className="size-3 mr-1" />
											Verified
										</Badge>
									)}
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-sm">{partner.mission}</p>

								<div>
									<h4 className="text-sm font-semibold mb-2">Conversion Rates</h4>
									<div className="space-y-1 text-xs text-muted-foreground">
										{partner.conversionRates.map((rate, idx) => (
											<div key={idx}>
												&bull; {rate.amount} {rate.item} {rate.unit}
											</div>
										))}
									</div>
								</div>

								<Badge variant="secondary" className="text-xs">
									Reports {partner.reportingCadence}
								</Badge>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
