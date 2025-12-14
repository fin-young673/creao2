import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/admin/login")({
	component: AdminLoginPage,
});

function AdminLoginPage() {
	const navigate = useNavigate();
	const { adminLogin, isAdmin } = useAuth();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isRedirecting, setIsRedirecting] = useState(false);

	// Redirect if already admin - using useEffect to avoid render-time navigation
	useEffect(() => {
		if (isAdmin) {
			setIsRedirecting(true);
			navigate({ to: "/admin" });
		}
	}, [isAdmin, navigate]);

	// Show loading state while redirecting
	if (isRedirecting) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<div className="text-center space-y-4">
					<Loader2 className="size-8 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Redirecting to Admin Dashboard...</p>
				</div>
			</div>
		);
	}

	const handleLogin = async () => {
		if (!email.trim()) return;
		setIsLoading(true);
		// Simulate a brief delay
		await new Promise(resolve => setTimeout(resolve, 300));
		adminLogin(email);
		setIsLoading(false);
		navigate({ to: "/admin" });
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6">
				<div className="text-center">
					<Link to="/" className="font-bold text-2xl">
						Give<span className="text-primary">Transparent</span>
					</Link>
					<p className="text-muted-foreground mt-2">Admin Login</p>
				</div>

				<Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
					<AlertTriangle className="size-4 text-amber-600" />
					<AlertTitle className="text-amber-800 dark:text-amber-200">Prototype Admin Access</AlertTitle>
					<AlertDescription className="text-amber-700 dark:text-amber-300">
						No password yet. This will be replaced with secure auth before launch.
					</AlertDescription>
				</Alert>

				<Card>
					<CardHeader>
						<CardTitle>Admin Access</CardTitle>
						<CardDescription>Enter your admin email to continue</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>Admin Email</Label>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="admin@givetransparent.org"
								onKeyDown={(e) => e.key === "Enter" && handleLogin()}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button className="w-full" onClick={handleLogin} disabled={isLoading || !email.trim()}>
							{isLoading ? "Signing in..." : "Continue"}
						</Button>
						<Link to="/" className="w-full">
							<Button variant="ghost" className="w-full">
								<ArrowLeft className="size-4 mr-2" />
								Back to Site
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
