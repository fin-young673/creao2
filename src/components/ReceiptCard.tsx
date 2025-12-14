import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { type PaymentRecord } from "@/lib/mock-data";

interface ReceiptCardProps {
	payment: PaymentRecord;
	className?: string;
}

export function ReceiptCard({ payment, className }: ReceiptCardProps) {
	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div>
						<CardTitle>Payment Receipt</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							{new Date(payment.date).toLocaleDateString("en-GB", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
					<Badge
						variant={
							payment.status === "completed"
								? "default"
								: payment.status === "pending"
									? "secondary"
									: "destructive"
						}
					>
						{payment.status}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Gross Amount</span>
							<span className="font-medium">£{payment.gross.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-muted-foreground">
							<span>Stripe Processing Fee (2.9%)</span>
							<span>-£{payment.stripeFee.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-muted-foreground">
							<span>Platform Operations (3.5%)</span>
							<span>-£{payment.platformFee.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-muted-foreground">
							<span>Innovation Fund (0.6%)</span>
							<span>-£{payment.innovationFund.toFixed(2)}</span>
						</div>
						<div className="h-px bg-border my-2" />
						<div className="flex justify-between font-semibold text-base">
							<span>Donation Pool</span>
							<span className="text-green-600 dark:text-green-400">
								£{payment.donationPool.toFixed(2)}
							</span>
						</div>
					</div>
					<Button variant="outline" className="w-full" size="sm">
						<Download className="size-4 mr-2" />
						Download Receipt
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
