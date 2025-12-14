import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ImpactChartProps {
	data: { name: string; value: number; color: string }[];
	title?: string;
}

export function ImpactChart({ data }: ImpactChartProps) {
	const chartConfig: ChartConfig = data.reduce(
		(acc, item) => ({
			...acc,
			[item.name]: {
				label: item.name,
				color: item.color,
			},
		}),
		{} as ChartConfig
	);

	return (
		<ChartContainer config={chartConfig} className="h-[250px]">
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={90}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
