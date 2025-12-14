import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AlertTriangle, Home, LogIn } from "lucide-react";

// Admin session check function (runs during route loading, before React renders)
function checkAdminSession(): boolean {
	return localStorage.getItem("admin_session") === "true";
}

export const Route = createFileRoute("/admin")({
	beforeLoad: ({ location }) => {
		// Allow access to /admin/login without auth check
		if (location.pathname === "/admin/login") {
			return;
		}
		// Check admin session for all other admin routes
		if (!checkAdminSession()) {
			throw redirect({
				to: "/admin/login",
			});
		}
	},
	component: AdminLayout,
	errorComponent: AdminErrorBoundary,
});

// Layout component that just renders child routes
function AdminLayout() {
	return <Outlet />;
}

// Error boundary for admin routes
function AdminErrorBoundary({ error }: { error: Error }) {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
						<AlertTriangle className="size-8 text-destructive" />
					</div>
					<CardTitle>Something went wrong</CardTitle>
					<CardDescription>
						An error occurred while loading the admin panel.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground text-center mb-4">
						{error.message || "Please try again or contact support if the problem persists."}
					</p>
				</CardContent>
				<CardFooter className="flex gap-2">
					<Link to="/" className="flex-1">
						<Button variant="outline" className="w-full">
							<Home className="size-4 mr-2" />
							Home
						</Button>
					</Link>
					<Link to="/admin/login" className="flex-1">
						<Button className="w-full">
							<LogIn className="size-4 mr-2" />
							Admin Login
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
