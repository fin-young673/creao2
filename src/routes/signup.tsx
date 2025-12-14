import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/signup")({
	component: SignUpPage,
});

function SignUpPage() {
	const navigate = useNavigate();
	const { signup } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignup = async () => {
		setIsLoading(true);
		await signup(email, password, name);
		setIsLoading(false);
		navigate({ to: "/dashboard" });
	};

	return (
		<div className="max-w-md mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Create Account</CardTitle>
					<CardDescription>Start your giving journey</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Your name"
						/>
					</div>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
						/>
					</div>
					<div className="space-y-2">
						<Label>Password</Label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="********"
						/>
					</div>
					<Alert>
						<Shield className="size-4" />
						<AlertDescription className="text-xs">
							Payments processed securely via Stripe. We never store card details.
						</AlertDescription>
					</Alert>
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<Button className="w-full" onClick={handleSignup} disabled={isLoading}>
						{isLoading ? "Creating account..." : "Create Account"}
					</Button>
					<Link to="/signin" className="w-full">
						<Button variant="ghost" className="w-full">
							Already have an account? Sign in
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
