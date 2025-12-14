import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type UserProfile, mockUserProfile } from "@/lib/mock-data";

interface AuthContextType {
	user: UserProfile | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	adminEmail: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	signup: (email: string, password: string, name: string) => Promise<void>;
	adminLogin: (email: string) => void;
	adminLogout: () => void;
	checkAdminSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = "admin_session";
const ADMIN_EMAIL_KEY = "admin_email";

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [isAdminUser, setIsAdminUser] = useState(false);
	const [adminEmail, setAdminEmail] = useState<string | null>(null);

	// Check for existing admin session on mount
	useEffect(() => {
		const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
		const storedAdminEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
		if (adminSession === "true" && storedAdminEmail) {
			setIsAdminUser(true);
			setAdminEmail(storedAdminEmail);
		}
	}, []);

	const login = async (email: string, _password: string) => {
		// Mock login - in production this would call an API
		await new Promise((resolve) => setTimeout(resolve, 500));
		setUser({ ...mockUserProfile, email });
	};

	const logout = () => {
		setUser(null);
	};

	const signup = async (email: string, _password: string, name: string) => {
		// Mock signup - in production this would call an API
		await new Promise((resolve) => setTimeout(resolve, 500));
		setUser({ ...mockUserProfile, email, name, joinedDate: new Date().toISOString() });
	};

	const adminLogin = (email: string) => {
		// Mock admin login - stores session in localStorage
		// NO PASSWORD - this is a placeholder for prototype
		localStorage.setItem(ADMIN_SESSION_KEY, "true");
		localStorage.setItem(ADMIN_EMAIL_KEY, email);
		setIsAdminUser(true);
		setAdminEmail(email);
	};

	const adminLogout = () => {
		localStorage.removeItem(ADMIN_SESSION_KEY);
		localStorage.removeItem(ADMIN_EMAIL_KEY);
		setIsAdminUser(false);
		setAdminEmail(null);
	};

	const checkAdminSession = () => {
		return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isAdmin: isAdminUser,
				adminEmail,
				login,
				logout,
				signup,
				adminLogin,
				adminLogout,
				checkAdminSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
