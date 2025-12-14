import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type Pillar, PILLARS } from "@/lib/mock-data";

interface PercentageSplitterProps {
	environmentPercent: number;
	humanAidPercent: number;
	researchPercent: number;
	onPercentagesChange: (env: number, human: number, research: number) => void;
	className?: string;
}

export function PercentageSplitter({
	environmentPercent,
	humanAidPercent,
	researchPercent,
	onPercentagesChange,
	className,
}: PercentageSplitterProps) {
	const [env, setEnv] = useState(environmentPercent);
	const [human, setHuman] = useState(humanAidPercent);
	const [res, setRes] = useState(researchPercent);

	// Sync with props
	useEffect(() => {
		setEnv(environmentPercent);
		setHuman(humanAidPercent);
		setRes(researchPercent);
	}, [environmentPercent, humanAidPercent, researchPercent]);

	const total = env + human + res;

	const handleEnvChange = (value: number[]) => {
		const newEnv = value[0];
		const remaining = 100 - newEnv;
		const ratio = human / (human + res || 1);
		const newHuman = Math.round(remaining * ratio);
		const newRes = 100 - newEnv - newHuman;
		setEnv(newEnv);
		setHuman(newHuman);
		setRes(newRes);
		onPercentagesChange(newEnv, newHuman, newRes);
	};

	const handleHumanChange = (value: number[]) => {
		const newHuman = value[0];
		const remaining = 100 - newHuman;
		const ratio = env / (env + res || 1);
		const newEnv = Math.round(remaining * ratio);
		const newRes = 100 - newHuman - newEnv;
		setEnv(newEnv);
		setHuman(newHuman);
		setRes(newRes);
		onPercentagesChange(newEnv, newHuman, newRes);
	};

	const handleResChange = (value: number[]) => {
		const newRes = value[0];
		const remaining = 100 - newRes;
		const ratio = env / (env + human || 1);
		const newEnv = Math.round(remaining * ratio);
		const newHuman = 100 - newRes - newEnv;
		setEnv(newEnv);
		setHuman(newHuman);
		setRes(newRes);
		onPercentagesChange(newEnv, newHuman, newRes);
	};

	const handleInputChange = (pillar: Pillar, valueStr: string) => {
		const value = parseInt(valueStr) || 0;
		const clamped = Math.max(0, Math.min(100, value));

		if (pillar === "environment") {
			const remaining = 100 - clamped;
			const ratio = human / (human + res || 1);
			const newHuman = Math.round(remaining * ratio);
			const newRes = 100 - clamped - newHuman;
			setEnv(clamped);
			setHuman(newHuman);
			setRes(newRes);
			onPercentagesChange(clamped, newHuman, newRes);
		} else if (pillar === "human-aid") {
			const remaining = 100 - clamped;
			const ratio = env / (env + res || 1);
			const newEnv = Math.round(remaining * ratio);
			const newRes = 100 - clamped - newEnv;
			setEnv(newEnv);
			setHuman(clamped);
			setRes(newRes);
			onPercentagesChange(newEnv, clamped, newRes);
		} else {
			const remaining = 100 - clamped;
			const ratio = env / (env + human || 1);
			const newEnv = Math.round(remaining * ratio);
			const newHuman = 100 - clamped - newEnv;
			setEnv(newEnv);
			setHuman(newHuman);
			setRes(clamped);
			onPercentagesChange(newEnv, newHuman, clamped);
		}
	};

	return (
		<div className={cn("space-y-6", className)}>
			{/* Environment */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label className="text-base font-medium">{PILLARS.environment.name}</Label>
					<div className="flex items-center gap-2">
						<Input
							type="number"
							min={0}
							max={100}
							value={env}
							onChange={(e) => handleInputChange("environment", e.target.value)}
							className="w-16 text-center"
						/>
						<span className="text-sm text-muted-foreground">%</span>
					</div>
				</div>
				<Slider value={[env]} onValueChange={handleEnvChange} min={0} max={100} step={1} />
			</div>

			{/* Human Aid */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label className="text-base font-medium">{PILLARS["human-aid"].name}</Label>
					<div className="flex items-center gap-2">
						<Input
							type="number"
							min={0}
							max={100}
							value={human}
							onChange={(e) => handleInputChange("human-aid", e.target.value)}
							className="w-16 text-center"
						/>
						<span className="text-sm text-muted-foreground">%</span>
					</div>
				</div>
				<Slider value={[human]} onValueChange={handleHumanChange} min={0} max={100} step={1} />
			</div>

			{/* Research */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label className="text-base font-medium">{PILLARS.research.name}</Label>
					<div className="flex items-center gap-2">
						<Input
							type="number"
							min={0}
							max={100}
							value={res}
							onChange={(e) => handleInputChange("research", e.target.value)}
							className="w-16 text-center"
						/>
						<span className="text-sm text-muted-foreground">%</span>
					</div>
				</div>
				<Slider value={[res]} onValueChange={handleResChange} min={0} max={100} step={1} />
			</div>

			{/* Total indicator */}
			<div
				className={cn(
					"rounded-lg border p-3 text-center font-medium",
					total === 100
						? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
						: "border-destructive bg-destructive/10 text-destructive"
				)}
			>
				Total: {total}% {total === 100 ? "✓" : `(must equal 100%)`}
			</div>
		</div>
	);
}
