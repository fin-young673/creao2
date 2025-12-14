import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Moon, Sun, Menu, Info, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ href: "/how-it-works", label: "How It Works" },
	{ href: "/causes", label: "Causes" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/impact", label: "Impact Reports" },
	{ href: "/blog", label: "Blog" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, logout, adminLogout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();

	const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
	const isAdminPage = location.pathname.startsWith("/admin");

	// Don't show layout for admin pages (they have their own layout)
	if (isAdminPage) {
		return <>{children}</>;
	}

	const handleLogout = () => {
		logout();
		adminLogout();
		setMobileMenuOpen(false);
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between">
					<div className="flex items-center gap-8">
						<Link to="/" className="font-bold text-xl">
							Give<span className="text-primary">Transparent</span>
						</Link>
						<nav className="hidden md:flex items-center gap-6 text-sm">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									to={link.href}
									className={cn(
										"text-muted-foreground hover:text-foreground transition-colors",
										location.pathname === link.href && "text-foreground font-medium"
									)}
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					<div className="flex items-center gap-3">
						<Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
							{theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
						</Button>

						{isAuthenticated ? (
							<div className="hidden md:flex items-center gap-2">
								<Link to="/dashboard">
									<Button variant="outline" size="sm">
										Dashboard
									</Button>
								</Link>
								<Button variant="ghost" size="sm" onClick={handleLogout}>
									Logout
								</Button>
							</div>
						) : (
							<div className="hidden md:flex items-center gap-2">
								<Link to="/signin">
									<Button variant="ghost" size="sm">
										Sign In
									</Button>
								</Link>
								<Link to="/signup">
									<Button size="sm">Get Started</Button>
								</Link>
							</div>
						)}

						{/* Mobile menu button */}
						<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="md:hidden">
									<Menu className="size-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[350px]">
								<SheetHeader>
									<SheetTitle className="text-left">
										Give<span className="text-primary">Transparent</span>
									</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col gap-4 mt-6">
									{NAV_LINKS.map((link) => (
										<Link
											key={link.href}
											to={link.href}
											onClick={() => setMobileMenuOpen(false)}
											className={cn(
												"text-muted-foreground hover:text-foreground transition-colors py-2",
												location.pathname === link.href && "text-foreground font-medium"
											)}
										>
											{link.label}
										</Link>
									))}

									<Separator className="my-2" />

									<Button
										variant="ghost"
										size="sm"
										onClick={toggleTheme}
										className="justify-start"
									>
										{theme === "dark" ? <Sun className="size-5 mr-2" /> : <Moon className="size-5 mr-2" />}
										{theme === "dark" ? "Light Mode" : "Dark Mode"}
									</Button>

									{isAuthenticated ? (
										<>
											<Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
												<Button variant="outline" size="sm" className="w-full justify-start">
													Dashboard
												</Button>
											</Link>
											<Button
												variant="ghost"
												size="sm"
												onClick={handleLogout}
												className="w-full justify-start"
											>
												Logout
											</Button>
										</>
									) : (
										<>
											<Separator className="my-2" />
											<Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
												<Button variant="ghost" size="sm" className="w-full justify-start">
													Sign In
												</Button>
											</Link>
											<Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
												<Button size="sm" className="w-full">
													Start a Plan
													<ArrowRight className="size-4 ml-2" />
												</Button>
											</Link>
										</>
									)}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 container mx-auto px-4 py-8">
				{children}
			</main>

			{/* Mobile Sticky Bottom CTA */}
			{!isAuthenticated && !isAuthPage && (
				<div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur border-t">
					<Link to="/signup">
						<Button className="w-full" size="lg">
							Start a Plan
							<ArrowRight className="size-4 ml-2" />
						</Button>
					</Link>
				</div>
			)}

			{/* Footer */}
			<footer className={cn("border-t mt-16", !isAuthenticated && !isAuthPage && "pb-20 md:pb-0")}>
				<div className="container mx-auto px-4 py-12">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<h3 className="font-bold text-lg mb-4">
								Give<span className="text-primary">Transparent</span>
							</h3>
							<p className="text-sm text-muted-foreground">
								Transparent charity subscriptions with quarterly impact reports.
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-3">Platform</h4>
							<div className="space-y-2 text-sm">
								<Link
									to="/how-it-works"
									className="block text-muted-foreground hover:text-foreground"
								>
									How It Works
								</Link>
								<Link
									to="/pricing"
									className="block text-muted-foreground hover:text-foreground"
								>
									Pricing & Fees
								</Link>
								<Link
									to="/causes"
									className="block text-muted-foreground hover:text-foreground"
								>
									Our Causes
								</Link>
							</div>
						</div>
						<div>
							<h4 className="font-semibold mb-3">Transparency</h4>
							<div className="space-y-2 text-sm">
								<Link
									to="/impact"
									className="block text-muted-foreground hover:text-foreground"
								>
									Quarterly Reports
								</Link>
								<Link
									to="/blog"
									className="block text-muted-foreground hover:text-foreground"
								>
									Blog
								</Link>
								<a href="#" className="block text-muted-foreground hover:text-foreground">
									Methodology
								</a>
							</div>
						</div>
						<div>
							<h4 className="font-semibold mb-3">Legal</h4>
							<div className="space-y-2 text-sm">
								<a href="#" className="block text-muted-foreground hover:text-foreground">
									Privacy Policy
								</a>
								<a href="#" className="block text-muted-foreground hover:text-foreground">
									Terms of Service
								</a>
								<a href="#" className="block text-muted-foreground hover:text-foreground">
									Contact
								</a>
							</div>
						</div>
					</div>

					<Separator className="my-8" />

					<div className="text-sm text-muted-foreground text-center">
						<p>&copy; 2025 GiveTransparent. All rights reserved.</p>
					</div>

					<Alert className="mt-6">
						<Info className="size-4" />
						<AlertDescription className="text-xs">
							<strong>Transparency Disclaimer:</strong> GiveTransparent is a donation platform, not
							a registered charity. We facilitate monthly subscriptions and quarterly payouts to
							verified partner organizations. All fees are disclosed upfront. Impact estimates are
							based on partner-reported conversion rates and may vary.
						</AlertDescription>
					</Alert>
				</div>
			</footer>
		</div>
	);
}
