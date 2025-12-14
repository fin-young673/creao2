import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
	PARTNERS,
	BLOG_POSTS,
	QUARTERLY_REPORTS,
	IMPACT_REPORTS,
	PAYOUT_BATCHES,
	ADMIN_PARTNERS,
	ADMIN_STATS,
	mockPaymentHistory,
	mockImpactMetrics,
	type Partner,
	type BlogPost,
	type QuarterlyReport,
	type ImpactReport,
	type PayoutBatch,
	type AdminPartner,
	type AdminStats,
	type PaymentRecord,
	type ImpactMetric,
	type Pillar,
} from "@/lib/mock-data";

// Storage keys
const STORAGE_KEYS = {
	PARTNERS: "gt_partners",
	ADMIN_PARTNERS: "gt_admin_partners",
	BLOG_POSTS: "gt_blog_posts",
	QUARTERLY_REPORTS: "gt_quarterly_reports",
	IMPACT_REPORTS: "gt_impact_reports",
	PAYOUT_BATCHES: "gt_payout_batches",
	ADMIN_STATS: "gt_admin_stats",
	PAYMENT_HISTORY: "gt_payment_history",
	IMPACT_METRICS: "gt_impact_metrics",
	INITIALIZED: "gt_data_initialized",
} as const;

// Data store state interface
interface DataStoreState {
	partners: Partner[];
	adminPartners: AdminPartner[];
	blogPosts: BlogPost[];
	quarterlyReports: QuarterlyReport[];
	impactReports: ImpactReport[];
	payoutBatches: PayoutBatch[];
	adminStats: AdminStats;
	paymentHistory: PaymentRecord[];
	impactMetrics: ImpactMetric[];
}

// Data store context interface
interface DataStoreContextType extends DataStoreState {
	// Partner CRUD
	addPartner: (partner: Partner) => void;
	updatePartner: (id: string, partner: Partial<Partner>) => void;
	deletePartner: (id: string) => void;

	// Admin Partner CRUD
	addAdminPartner: (partner: AdminPartner) => void;
	updateAdminPartner: (id: string, partner: Partial<AdminPartner>) => void;
	deleteAdminPartner: (id: string) => void;

	// Blog CRUD
	addBlogPost: (post: BlogPost) => void;
	updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
	deleteBlogPost: (id: string) => void;

	// Impact Report CRUD
	addImpactReport: (report: ImpactReport) => void;
	updateImpactReport: (id: string, report: Partial<ImpactReport>) => void;
	deleteImpactReport: (id: string) => void;

	// Payout Batch CRUD
	addPayoutBatch: (batch: PayoutBatch) => void;
	updatePayoutBatch: (id: string, batch: Partial<PayoutBatch>) => void;

	// Payment Records
	addPaymentRecord: (payment: PaymentRecord) => void;

	// Admin Stats
	updateAdminStats: (stats: Partial<AdminStats>) => void;

	// Computed values
	getAllTimeStats: () => {
		totalDonated: number;
		totalFees: number;
		totalSentToPartners: number;
		totalQuarters: number;
	};

	// Reset data
	resetToDefaults: () => void;
}

const DataStoreContext = createContext<DataStoreContextType | null>(null);

// Helper to safely get from localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
	try {
		const stored = localStorage.getItem(key);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (e) {
		console.error(`Error reading ${key} from localStorage:`, e);
	}
	return defaultValue;
}

// Helper to safely save to localStorage
function saveToStorage<T>(key: string, value: T): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error(`Error saving ${key} to localStorage:`, e);
	}
}

// Initialize data store with defaults if not already initialized
function initializeStore(): DataStoreState {
	const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);

	if (!isInitialized) {
		// First run - seed with demo data
		const initialState: DataStoreState = {
			partners: PARTNERS,
			adminPartners: ADMIN_PARTNERS,
			blogPosts: BLOG_POSTS,
			quarterlyReports: QUARTERLY_REPORTS,
			impactReports: IMPACT_REPORTS,
			payoutBatches: PAYOUT_BATCHES,
			adminStats: ADMIN_STATS,
			paymentHistory: mockPaymentHistory,
			impactMetrics: mockImpactMetrics,
		};

		// Save all initial data
		saveToStorage(STORAGE_KEYS.PARTNERS, initialState.partners);
		saveToStorage(STORAGE_KEYS.ADMIN_PARTNERS, initialState.adminPartners);
		saveToStorage(STORAGE_KEYS.BLOG_POSTS, initialState.blogPosts);
		saveToStorage(STORAGE_KEYS.QUARTERLY_REPORTS, initialState.quarterlyReports);
		saveToStorage(STORAGE_KEYS.IMPACT_REPORTS, initialState.impactReports);
		saveToStorage(STORAGE_KEYS.PAYOUT_BATCHES, initialState.payoutBatches);
		saveToStorage(STORAGE_KEYS.ADMIN_STATS, initialState.adminStats);
		saveToStorage(STORAGE_KEYS.PAYMENT_HISTORY, initialState.paymentHistory);
		saveToStorage(STORAGE_KEYS.IMPACT_METRICS, initialState.impactMetrics);
		localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");

		return initialState;
	}

	// Load from localStorage
	return {
		partners: getFromStorage(STORAGE_KEYS.PARTNERS, PARTNERS),
		adminPartners: getFromStorage(STORAGE_KEYS.ADMIN_PARTNERS, ADMIN_PARTNERS),
		blogPosts: getFromStorage(STORAGE_KEYS.BLOG_POSTS, BLOG_POSTS),
		quarterlyReports: getFromStorage(STORAGE_KEYS.QUARTERLY_REPORTS, QUARTERLY_REPORTS),
		impactReports: getFromStorage(STORAGE_KEYS.IMPACT_REPORTS, IMPACT_REPORTS),
		payoutBatches: getFromStorage(STORAGE_KEYS.PAYOUT_BATCHES, PAYOUT_BATCHES),
		adminStats: getFromStorage(STORAGE_KEYS.ADMIN_STATS, ADMIN_STATS),
		paymentHistory: getFromStorage(STORAGE_KEYS.PAYMENT_HISTORY, mockPaymentHistory),
		impactMetrics: getFromStorage(STORAGE_KEYS.IMPACT_METRICS, mockImpactMetrics),
	};
}

export function DataStoreProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<DataStoreState>(() => initializeStore());

	// Partner CRUD
	const addPartner = useCallback((partner: Partner) => {
		setState(prev => {
			const updated = [...prev.partners, partner];
			saveToStorage(STORAGE_KEYS.PARTNERS, updated);
			return { ...prev, partners: updated };
		});
	}, []);

	const updatePartner = useCallback((id: string, updates: Partial<Partner>) => {
		setState(prev => {
			const updated = prev.partners.map(p =>
				p.id === id ? { ...p, ...updates } : p
			);
			saveToStorage(STORAGE_KEYS.PARTNERS, updated);
			return { ...prev, partners: updated };
		});
	}, []);

	const deletePartner = useCallback((id: string) => {
		setState(prev => {
			const updated = prev.partners.filter(p => p.id !== id);
			saveToStorage(STORAGE_KEYS.PARTNERS, updated);
			return { ...prev, partners: updated };
		});
	}, []);

	// Admin Partner CRUD
	const addAdminPartner = useCallback((partner: AdminPartner) => {
		setState(prev => {
			const updated = [...prev.adminPartners, partner];
			saveToStorage(STORAGE_KEYS.ADMIN_PARTNERS, updated);
			return { ...prev, adminPartners: updated };
		});
	}, []);

	const updateAdminPartner = useCallback((id: string, updates: Partial<AdminPartner>) => {
		setState(prev => {
			const updated = prev.adminPartners.map(p =>
				p.id === id ? { ...p, ...updates } : p
			);
			saveToStorage(STORAGE_KEYS.ADMIN_PARTNERS, updated);
			return { ...prev, adminPartners: updated };
		});
	}, []);

	const deleteAdminPartner = useCallback((id: string) => {
		setState(prev => {
			const updated = prev.adminPartners.filter(p => p.id !== id);
			saveToStorage(STORAGE_KEYS.ADMIN_PARTNERS, updated);
			return { ...prev, adminPartners: updated };
		});
	}, []);

	// Blog CRUD
	const addBlogPost = useCallback((post: BlogPost) => {
		setState(prev => {
			const updated = [post, ...prev.blogPosts]; // New posts first
			saveToStorage(STORAGE_KEYS.BLOG_POSTS, updated);
			return { ...prev, blogPosts: updated };
		});
	}, []);

	const updateBlogPost = useCallback((id: string, updates: Partial<BlogPost>) => {
		setState(prev => {
			const updated = prev.blogPosts.map(p =>
				p.id === id ? { ...p, ...updates } : p
			);
			saveToStorage(STORAGE_KEYS.BLOG_POSTS, updated);
			return { ...prev, blogPosts: updated };
		});
	}, []);

	const deleteBlogPost = useCallback((id: string) => {
		setState(prev => {
			const updated = prev.blogPosts.filter(p => p.id !== id);
			saveToStorage(STORAGE_KEYS.BLOG_POSTS, updated);
			return { ...prev, blogPosts: updated };
		});
	}, []);

	// Impact Report CRUD
	const addImpactReport = useCallback((report: ImpactReport) => {
		setState(prev => {
			const updated = [report, ...prev.impactReports]; // New reports first
			saveToStorage(STORAGE_KEYS.IMPACT_REPORTS, updated);
			return { ...prev, impactReports: updated };
		});
	}, []);

	const updateImpactReport = useCallback((id: string, updates: Partial<ImpactReport>) => {
		setState(prev => {
			const updated = prev.impactReports.map(r =>
				r.id === id ? { ...r, ...updates } : r
			);
			saveToStorage(STORAGE_KEYS.IMPACT_REPORTS, updated);
			return { ...prev, impactReports: updated };
		});
	}, []);

	const deleteImpactReport = useCallback((id: string) => {
		setState(prev => {
			const updated = prev.impactReports.filter(r => r.id !== id);
			saveToStorage(STORAGE_KEYS.IMPACT_REPORTS, updated);
			return { ...prev, impactReports: updated };
		});
	}, []);

	// Payout Batch CRUD
	const addPayoutBatch = useCallback((batch: PayoutBatch) => {
		setState(prev => {
			const updated = [...prev.payoutBatches, batch];
			saveToStorage(STORAGE_KEYS.PAYOUT_BATCHES, updated);
			return { ...prev, payoutBatches: updated };
		});
	}, []);

	const updatePayoutBatch = useCallback((id: string, updates: Partial<PayoutBatch>) => {
		setState(prev => {
			const updated = prev.payoutBatches.map(b =>
				b.id === id ? { ...b, ...updates } : b
			);
			saveToStorage(STORAGE_KEYS.PAYOUT_BATCHES, updated);
			return { ...prev, payoutBatches: updated };
		});
	}, []);

	// Payment Records
	const addPaymentRecord = useCallback((payment: PaymentRecord) => {
		setState(prev => {
			const updated = [payment, ...prev.paymentHistory];
			saveToStorage(STORAGE_KEYS.PAYMENT_HISTORY, updated);
			return { ...prev, paymentHistory: updated };
		});
	}, []);

	// Admin Stats
	const updateAdminStats = useCallback((updates: Partial<AdminStats>) => {
		setState(prev => {
			const updated = { ...prev.adminStats, ...updates };
			saveToStorage(STORAGE_KEYS.ADMIN_STATS, updated);
			return { ...prev, adminStats: updated };
		});
	}, []);

	// Computed values - all-time stats from stored quarters/payments
	const getAllTimeStats = useCallback(() => {
		const sentBatches = state.payoutBatches.filter(b => b.status === "sent");
		const totalSentToPartners = sentBatches.reduce((sum, b) => sum + b.totalAmount, 0);

		const totalDonated = state.paymentHistory.reduce((sum, p) => sum + p.donationPool, 0);
		const totalFees = state.paymentHistory.reduce((sum, p) =>
			sum + p.stripeFee + p.platformFee + p.innovationFund, 0
		);

		return {
			totalDonated,
			totalFees,
			totalSentToPartners,
			totalQuarters: sentBatches.length,
		};
	}, [state.payoutBatches, state.paymentHistory]);

	// Reset to defaults
	const resetToDefaults = useCallback(() => {
		// Clear the initialized flag first
		localStorage.removeItem(STORAGE_KEYS.INITIALIZED);

		// Clear all stored data
		Object.values(STORAGE_KEYS).forEach(key => {
			localStorage.removeItem(key);
		});

		// Reinitialize with defaults
		const newState = initializeStore();
		setState(newState);
	}, []);

	const contextValue: DataStoreContextType = {
		...state,
		addPartner,
		updatePartner,
		deletePartner,
		addAdminPartner,
		updateAdminPartner,
		deleteAdminPartner,
		addBlogPost,
		updateBlogPost,
		deleteBlogPost,
		addImpactReport,
		updateImpactReport,
		deleteImpactReport,
		addPayoutBatch,
		updatePayoutBatch,
		addPaymentRecord,
		updateAdminStats,
		getAllTimeStats,
		resetToDefaults,
	};

	return (
		<DataStoreContext.Provider value={contextValue}>
			{children}
		</DataStoreContext.Provider>
	);
}

export function useDataStore(): DataStoreContextType {
	const context = useContext(DataStoreContext);
	if (!context) {
		throw new Error("useDataStore must be used within a DataStoreProvider");
	}
	return context;
}

// Utility to sync both partner types when adding/updating
export function syncPartnerToAdminPartner(partner: Partner): AdminPartner {
	return {
		id: `admin-${partner.id}`,
		name: partner.name,
		pillar: partner.pillar,
		status: partner.verified ? "verified" : "placeholder",
		reportingCadence: partner.reportingCadence,
		conversionRates: partner.conversionRates.map(r => `${r.amount} ${r.item} ${r.unit}`).join(" | "),
		region: partner.region,
		createdAt: new Date().toISOString().split("T")[0],
		lastReportDate: partner.recentUpdates[0]?.date,
	};
}

export function syncAdminPartnerToPartner(adminPartner: AdminPartner, existingPartner?: Partner): Partner {
	// Parse conversion rates string back to objects
	const rates = adminPartner.conversionRates.split(" | ").map(rateStr => {
		const match = rateStr.match(/^(\d+(?:\.\d+)?)\s+(.+)\s+(per\s+.+)$/);
		if (match) {
			return {
				item: match[2],
				amount: parseFloat(match[1]),
				unit: match[3],
			};
		}
		return { item: rateStr, amount: 1, unit: "per £1" };
	});

	return {
		id: adminPartner.id.replace("admin-", ""),
		name: adminPartner.name,
		pillar: adminPartner.pillar,
		verified: adminPartner.status === "verified",
		region: adminPartner.region,
		reportingCadence: adminPartner.reportingCadence,
		mission: existingPartner?.mission || `Supporting ${adminPartner.pillar} initiatives`,
		fundedActivities: existingPartner?.fundedActivities || [],
		reportingMethodology: existingPartner?.reportingMethodology || "Quarterly reports",
		websiteUrl: existingPartner?.websiteUrl,
		conversionRates: rates,
		recentUpdates: existingPartner?.recentUpdates || [],
	};
}
