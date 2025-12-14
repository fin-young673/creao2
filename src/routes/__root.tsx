import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FloatingBanner } from "@/components/FloatingBanner";
import { Layout } from "@/components/Layout";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DataStoreProvider } from "@/contexts/DataStoreContext";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	return (
		<ThemeProvider>
			<DataStoreProvider>
				<AuthProvider>
					<ErrorBoundary tagName="div" className="min-h-screen">
						<Layout>
							<Outlet />
						</Layout>
					</ErrorBoundary>
					{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
					<FloatingBanner position="bottom-left" />
				</AuthProvider>
			</DataStoreProvider>
		</ThemeProvider>
	);
}
