import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/signin")({
	component: SignInPage,
});

function SignInPage() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		setIsLoading(true);
		await login(email, password);
		setIsLoading(false);
		navigate({ to: "/dashboard" });
	};

	return (
		<div className="max-w-md mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Access your dashboard</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
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
						<Info className="size-4" />
						<AlertDescription className="text-xs">
							Demo: Use any email and password to sign in.
						</AlertDescription>
					</Alert>
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<Button className="w-full" onClick={handleLogin} disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign In"}
					</Button>
					<Link to="/signup" className="w-full">
						<Button variant="ghost" className="w-full">
							Don't have an account? Sign up
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
