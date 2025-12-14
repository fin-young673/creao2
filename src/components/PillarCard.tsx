import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type PillarInfo } from "@/lib/mock-data";
import { Leaf, Heart, FlaskConical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
	Leaf,
	Heart,
	FlaskConical,
};

interface PillarCardProps {
	pillar: PillarInfo;
	amount?: number;
	className?: string;
}

export function PillarCard({ pillar, amount, className }: PillarCardProps) {
	const Icon = iconMap[pillar.icon] || Leaf;

	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className={cn("rounded-lg p-2 bg-muted", pillar.color)}>
							<Icon className="size-6" />
						</div>
						<div>
							<CardTitle>{pillar.name}</CardTitle>
							{amount !== undefined && (
								<Badge variant="secondary" className="mt-1">
									£{amount.toFixed(2)}/month
								</Badge>
							)}
						</div>
					</div>
				</div>
				<CardDescription className="mt-2">{pillar.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<h4 className="text-sm font-semibold mb-2">Our Goals</h4>
						<ul className="space-y-1.5 text-sm text-muted-foreground">
							{pillar.goals.map((goal, idx) => (
								<li key={idx} className="flex items-start gap-2">
									<span className="mt-1.5 size-1.5 rounded-full bg-current shrink-0" />
									<span>{goal}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h4 className="text-sm font-semibold mb-2">Example Projects</h4>
						<ul className="space-y-1.5 text-sm text-muted-foreground">
							{pillar.exampleProjects.map((project, idx) => (
								<li key={idx} className="flex items-start gap-2">
									<span className="mt-1.5 size-1.5 rounded-full bg-current shrink-0" />
									<span>{project}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
