// Mock data for the charity subscription platform

export type Pillar = "environment" | "human-aid" | "research";

export interface PillarInfo {
	id: Pillar;
	name: string;
	description: string;
	color: string;
	icon: string;
	goals: string[];
	exampleProjects: string[];
}

export interface Partner {
	id: string;
	name: string;
	pillar: Pillar;
	verified: boolean;
	region: string;
	reportingCadence: "monthly" | "quarterly";
	mission: string;
	fundedActivities: string[];
	reportingMethodology: string;
	websiteUrl?: string;
	conversionRates: {
		item: string;
		amount: number;
		unit: string;
	}[];
	recentUpdates: {
		date: string;
		content: string;
	}[];
}

export interface DonationPlan {
	amount: number;
	environmentPercent: number;
	humanAidPercent: number;
	researchPercent: number;
}

export interface PaymentRecord {
	id: string;
	date: string;
	gross: number;
	stripeFee: number;
	platformFee: number;
	innovationFund: number;
	donationPool: number;
	status: "completed" | "pending" | "failed";
}

export interface ImpactMetric {
	label: string;
	value: number;
	unit: string;
	pillar: Pillar;
	estimated: boolean;
}

export interface QuarterlyReport {
	id: string;
	quarter: string;
	year: number;
	dateRange: string;
	totalReceived: number;
	totalFees: number;
	totalSent: number;
	pillarBreakdown: {
		pillar: Pillar;
		amount: number;
		partners: number;
	}[];
	payouts: {
		partnerId: string;
		partnerName: string;
		amount: number;
		date: string;
		proofUrl?: string;
	}[];
}

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	category: "updates" | "partner-stories" | "methodology" | "transparency";
	excerpt: string;
	content: string;
	publishedDate: string;
	readingTime: number;
	imageUrl?: string;
}

export interface UserProfile {
	id: string;
	email: string;
	name: string;
	joinedDate: string;
	emailPreferences: {
		monthlyImpact: boolean;
		quarterlyReports: boolean;
		partnerUpdates: boolean;
	};
}

// Mock data
export const PILLARS: Record<Pillar, PillarInfo> = {
	environment: {
		id: "environment",
		name: "Environment",
		description: "Protecting our planet through conservation, clean energy, and sustainable practices",
		color: "text-green-600",
		icon: "Leaf",
		goals: [
			"Reduce carbon emissions and promote clean energy",
			"Protect forests, oceans, and wildlife habitats",
			"Support sustainable agriculture and waste reduction"
		],
		exampleProjects: [
			"Reforestation initiatives planting 1M+ trees",
			"Ocean plastic cleanup operations",
			"Renewable energy infrastructure in developing regions"
		]
	},
	"human-aid": {
		id: "human-aid",
		name: "Human Aid",
		description: "Supporting communities with food security, healthcare, and education",
		color: "text-blue-600",
		icon: "Heart",
		goals: [
			"Provide emergency food aid and long-term food security",
			"Deliver healthcare services and medical supplies",
			"Support education access for underserved communities"
		],
		exampleProjects: [
			"School meal programs feeding 50K+ children daily",
			"Mobile health clinics in rural areas",
			"Clean water well construction"
		]
	},
	research: {
		id: "research",
		name: "Research",
		description: "Advancing science to solve tomorrow's challenges in health, climate, and technology",
		color: "text-purple-600",
		icon: "FlaskConical",
		goals: [
			"Fund breakthrough medical and health research",
			"Support climate science and clean tech innovation",
			"Advance accessible technology for underserved populations"
		],
		exampleProjects: [
			"Open-source medical research for rare diseases",
			"Climate modeling and prediction systems",
			"Low-cost diagnostic tools for remote areas"
		]
	}
};

export const PARTNERS: Partner[] = [
	{
		id: "partner-1",
		name: "Global Forest Alliance",
		pillar: "environment",
		verified: true,
		region: "Global",
		reportingCadence: "quarterly",
		mission: "Restoring forests and protecting biodiversity worldwide through community-led conservation",
		fundedActivities: [
			"Tree planting and forest restoration",
			"Wildlife habitat protection",
			"Community education programs"
		],
		reportingMethodology: "Quarterly satellite imagery analysis, community surveys, and third-party audits",
		websiteUrl: "https://www.globalforestalliance.org",
		conversionRates: [
			{ item: "Trees planted", amount: 5, unit: "per £1" },
			{ item: "Hectares restored", amount: 0.1, unit: "per £10" }
		],
		recentUpdates: [
			{ date: "2025-03-01", content: "Q1 2025: Planted 250,000 trees across 3 continents" },
			{ date: "2025-01-15", content: "New partnership with local communities in Indonesia" }
		]
	},
	{
		id: "partner-2",
		name: "Ocean Clean Initiative",
		pillar: "environment",
		verified: true,
		region: "Global",
		reportingCadence: "monthly",
		mission: "Removing plastic from oceans and preventing future pollution through innovation and education",
		fundedActivities: [
			"Ocean cleanup operations",
			"Beach cleanup events",
			"Plastic recycling technology development"
		],
		reportingMethodology: "Monthly collection data verified by independent marine scientists",
		websiteUrl: "https://www.oceancleaninitiative.org",
		conversionRates: [
			{ item: "Kg of plastic removed", amount: 2, unit: "per £1" },
			{ item: "Beach cleanups funded", amount: 1, unit: "per £50" }
		],
		recentUpdates: [
			{ date: "2025-03-05", content: "March cleanup removed 15 tonnes from Pacific Ocean" },
			{ date: "2025-02-20", content: "New recycling facility operational in Southeast Asia" }
		]
	},
	{
		id: "partner-3",
		name: "Feed the Future",
		pillar: "human-aid",
		verified: true,
		region: "Africa, Asia",
		reportingCadence: "quarterly",
		mission: "Ending child hunger through sustainable school meal programs and agricultural support",
		fundedActivities: [
			"School meal programs",
			"Community agriculture training",
			"Nutrition education"
		],
		reportingMethodology: "Quarterly beneficiary counts, nutritional impact studies, and local partner reports",
		websiteUrl: "https://www.feedthefuture.org",
		conversionRates: [
			{ item: "Meals provided", amount: 3, unit: "per £1" },
			{ item: "Children fed daily", amount: 1, unit: "per £10/month" }
		],
		recentUpdates: [
			{ date: "2025-03-03", content: "Now serving 75,000 children daily across 12 countries" },
			{ date: "2025-01-15", content: "Launched new agricultural training program" }
		]
	},
	{
		id: "partner-4",
		name: "Mobile Health Network",
		pillar: "human-aid",
		verified: true,
		region: "Sub-Saharan Africa",
		reportingCadence: "monthly",
		mission: "Delivering primary healthcare to remote communities through mobile clinics and telemedicine",
		fundedActivities: [
			"Mobile clinic operations",
			"Telemedicine consultations",
			"Vaccination programs"
		],
		reportingMethodology: "Monthly patient records, health outcome tracking, and field reports",
		websiteUrl: "https://www.mobilehealthnetwork.org",
		conversionRates: [
			{ item: "Patients treated", amount: 1, unit: "per £5" },
			{ item: "Vaccinations administered", amount: 2, unit: "per £3" }
		],
		recentUpdates: [
			{ date: "2025-03-08", content: "Treated 12,000 patients in February across 8 mobile clinics" },
			{ date: "2025-02-25", content: "Completed vaccination drive reaching 5,000 children" }
		]
	},
	{
		id: "partner-5",
		name: "OpenMed Research",
		pillar: "research",
		verified: true,
		region: "Global",
		reportingCadence: "quarterly",
		mission: "Conducting open-source medical research for neglected tropical diseases",
		fundedActivities: [
			"Clinical trials for rare diseases",
			"Drug development research",
			"Open-access publication"
		],
		reportingMethodology: "Quarterly research output reports, peer-reviewed publications, and grant oversight",
		websiteUrl: "https://www.openmedresearch.org",
		conversionRates: [
			{ item: "Research hours funded", amount: 10, unit: "per £1" },
			{ item: "Clinical trial days", amount: 1, unit: "per £100" }
		],
		recentUpdates: [
			{ date: "2025-02-28", content: "Published breakthrough findings on malaria treatment" },
			{ date: "2025-01-10", content: "Started Phase II trials for new tropical disease drug" }
		]
	},
	{
		id: "partner-6",
		name: "Climate Tech Lab",
		pillar: "research",
		verified: true,
		region: "Global",
		reportingCadence: "quarterly",
		mission: "Developing accessible clean technology solutions for climate change mitigation",
		fundedActivities: [
			"Clean energy research",
			"Carbon capture technology",
			"Climate modeling systems"
		],
		reportingMethodology: "Quarterly technical reports, prototype testing data, and academic collaborations",
		websiteUrl: "https://www.climatetechlab.org",
		conversionRates: [
			{ item: "Research projects funded", amount: 1, unit: "per £500" },
			{ item: "Prototypes developed", amount: 1, unit: "per £2000" }
		],
		recentUpdates: [
			{ date: "2025-03-01", content: "New low-cost solar panel design completed testing" },
			{ date: "2025-01-20", content: "Carbon capture prototype shows 30% efficiency improvement" }
		]
	}
];

export const QUARTERLY_REPORTS: QuarterlyReport[] = [
	{
		id: "q4-2024",
		quarter: "Q4",
		year: 2024,
		dateRange: "Oct 1 - Dec 31, 2024",
		totalReceived: 125000,
		totalFees: 8750,
		totalSent: 116250,
		pillarBreakdown: [
			{ pillar: "environment", amount: 38750, partners: 2 },
			{ pillar: "human-aid", amount: 46500, partners: 2 },
			{ pillar: "research", amount: 31000, partners: 2 }
		],
		payouts: [
			{ partnerId: "partner-1", partnerName: "Global Forest Alliance", amount: 20000, date: "2024-12-15" },
			{ partnerId: "partner-2", partnerName: "Ocean Clean Initiative", amount: 18750, date: "2024-12-15" },
			{ partnerId: "partner-3", partnerName: "Feed the Future", amount: 25000, date: "2024-12-15" },
			{ partnerId: "partner-4", partnerName: "Mobile Health Network", amount: 21500, date: "2024-12-15" },
			{ partnerId: "partner-5", partnerName: "OpenMed Research", amount: 16000, date: "2024-12-15" },
			{ partnerId: "partner-6", partnerName: "Climate Tech Lab", amount: 15000, date: "2024-12-15" }
		]
	},
	{
		id: "q3-2024",
		quarter: "Q3",
		year: 2024,
		dateRange: "Jul 1 - Sep 30, 2024",
		totalReceived: 108000,
		totalFees: 7560,
		totalSent: 100440,
		pillarBreakdown: [
			{ pillar: "environment", amount: 33480, partners: 2 },
			{ pillar: "human-aid", amount: 40176, partners: 2 },
			{ pillar: "research", amount: 26784, partners: 2 }
		],
		payouts: [
			{ partnerId: "partner-1", partnerName: "Global Forest Alliance", amount: 17000, date: "2024-09-30" },
			{ partnerId: "partner-2", partnerName: "Ocean Clean Initiative", amount: 16480, date: "2024-09-30" },
			{ partnerId: "partner-3", partnerName: "Feed the Future", amount: 21000, date: "2024-09-30" },
			{ partnerId: "partner-4", partnerName: "Mobile Health Network", amount: 19176, date: "2024-09-30" },
			{ partnerId: "partner-5", partnerName: "OpenMed Research", amount: 14000, date: "2024-09-30" },
			{ partnerId: "partner-6", partnerName: "Climate Tech Lab", amount: 12784, date: "2024-09-30" }
		]
	}
];

export const BLOG_POSTS: BlogPost[] = [
	{
		id: "post-1",
		title: "Q4 2024 Transparency Update: Where Every Penny Went",
		slug: "q4-2024-transparency-update",
		category: "transparency",
		excerpt: "A complete breakdown of £125,000 in donations, every fee, and every partner payout this quarter.",
		content: `# Q4 2024 Transparency Update

This quarter, our community donated £125,000 to support causes across the globe. Here's exactly where every penny went.

## The Numbers

- **Total Received**: £125,000
- **Stripe Processing Fees**: £3,625 (2.9%)
- **Platform Operations**: £4,375 (3.5%)
- **Innovation Fund**: £750 (0.6%)
- **Donated to Partners**: £116,250 (93%)

## Partner Payouts

All payouts were completed on December 31st, 2024. Our six verified partners received funding to continue their critical work across environment, human aid, and research pillars.

### Environment (£38,750)
- **Global Forest Alliance**: £20,000 for reforestation across 3 continents
- **Ocean Clean Initiative**: £18,750 for ocean plastic cleanup operations

### Human Aid (£46,500)
- **Feed the Future**: £25,000 for school meal programs
- **Mobile Health Network**: £21,500 for mobile clinic operations

### Research (£31,000)
- **OpenMed Research**: £16,000 for tropical disease research
- **Climate Tech Lab**: £15,000 for clean technology development

## Impact Highlights

Thanks to our community's support:
- 250,000 trees planted
- 15 tonnes of ocean plastic removed
- 75,000 children fed daily
- 12,000 patients treated

We're proud to maintain full transparency with every donation.`,
		publishedDate: "2025-01-10",
		readingTime: 8,
		imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop"
	},
	{
		id: "post-2",
		title: "Meet Our Partner: Global Forest Alliance",
		slug: "meet-global-forest-alliance",
		category: "partner-stories",
		excerpt: "How your donations helped plant 250,000 trees this quarter across three continents.",
		content: `# Meet Our Partner: Global Forest Alliance

Since partnering with GiveTransparent in early 2023, Global Forest Alliance has expanded their reforestation efforts to unprecedented levels.

## Mission & Vision

Global Forest Alliance restores forests and protects biodiversity worldwide through community-led conservation. They work with local communities to plant native species, restore degraded land, and create sustainable livelihoods.

## Q4 2024 Impact

With £20,000 in funding from our community:
- **250,000 trees planted** across Africa, Asia, and South America
- **50 hectares** of degraded forest restored
- **15 local communities** trained in sustainable forestry

## Conversion Rates

Your donations make a real difference:
- £1 = 5 trees planted
- £10 = 0.1 hectares restored
- £100 = Support for one community member for a month

## Looking Ahead

In 2025, Global Forest Alliance plans to expand operations to three new countries and launch a carbon credit program to create additional revenue for local communities.

Visit [globalforestalliance.org](https://www.globalforestalliance.org) to learn more.`,
		publishedDate: "2025-02-15",
		readingTime: 5,
		imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop"
	},
	{
		id: "post-3",
		title: "How We Calculate Impact: Our Methodology",
		slug: "impact-calculation-methodology",
		category: "methodology",
		excerpt: "Understanding how we convert your donations into measurable impact metrics.",
		content: `# How We Calculate Impact: Our Methodology

Transparency isn't just about showing where money goes—it's about proving the impact it creates. Here's exactly how we calculate and verify the impact metrics you see in your dashboard.

## Partner-Reported Conversion Rates

Each verified partner provides conversion rates based on their operational costs:
- **Trees planted per £1**: Based on sapling costs, planting labor, and land preparation
- **Meals per £1**: Calculated from bulk food purchasing and distribution costs
- **Patients treated per £5**: Includes medical supplies, staff time, and operational costs

## Verification Process

We don't just trust the numbers—we verify them:

1. **Quarterly Reporting**: Partners submit detailed reports with receipts and documentation
2. **Third-Party Audits**: Independent auditors verify claims annually
3. **Field Verification**: Random sampling of projects with photo/video evidence
4. **Beneficiary Surveys**: Direct feedback from communities served

## Your Impact Estimates

The impact numbers in your dashboard are **estimates** because:
- Actual costs vary by location and season
- Some donations may still be in the pipeline
- Quarterly payouts mean there's a delay between donation and deployment

We always mark estimates clearly and update them to actuals in our quarterly reports.

## Fee Transparency

Every fee is disclosed upfront:
- **Stripe (2.9%)**: Payment processing (industry standard)
- **Platform Operations (3.5%)**: Staff, servers, audits, legal compliance
- **Innovation Fund (0.6%)**: New partner vetting, technology improvements

93% of every donation goes directly to partners.

## Questions?

If you have questions about our methodology, contact our transparency team at hello@givetransparent.org.`,
		publishedDate: "2025-03-01",
		readingTime: 6,
		imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop"
	},
	{
		id: "post-4",
		title: "Platform Update: New Features Coming in Q2 2025",
		slug: "q2-2025-platform-updates",
		category: "updates",
		excerpt: "Exciting new features including real-time impact tracking and partner video updates.",
		content: `# Platform Update: New Features Coming in Q2 2025

We're constantly improving GiveTransparent based on your feedback. Here's what's coming next.

## Real-Time Impact Tracking

Currently, impact updates happen quarterly. Starting in April 2025, you'll see:
- Monthly micro-updates from partners
- Real-time donation pool tracking
- Live payout countdowns

## Partner Video Updates

Partners will share short video updates showing:
- Projects in action
- Beneficiary testimonials
- Behind-the-scenes operations

## Enhanced Reporting

New quarterly report features:
- Interactive maps showing project locations
- Before/after photos of funded projects
- Detailed fee breakdowns

## Mobile App (Beta)

We're developing a mobile app for iOS and Android with:
- Push notifications for impact milestones
- Quick donation amount adjustments
- Offline access to reports

Stay tuned for updates!`,
		publishedDate: "2025-03-10",
		readingTime: 4,
		imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
	}
];

// Mock user data
export const mockUserProfile: UserProfile = {
	id: "user-1",
	email: "demo@givetransparent.org",
	name: "Demo User",
	joinedDate: "2024-01-15",
	emailPreferences: {
		monthlyImpact: true,
		quarterlyReports: true,
		partnerUpdates: false
	}
};

export const mockCurrentPlan: DonationPlan = {
	amount: 30,
	environmentPercent: 40,
	humanAidPercent: 35,
	researchPercent: 25
};

export const mockPaymentHistory: PaymentRecord[] = [
	{
		id: "pay-15",
		date: "2025-03-01",
		gross: 30,
		stripeFee: 0.87,
		platformFee: 1.05,
		innovationFund: 0.18,
		donationPool: 27.90,
		status: "completed"
	},
	{
		id: "pay-14",
		date: "2025-02-01",
		gross: 30,
		stripeFee: 0.87,
		platformFee: 1.05,
		innovationFund: 0.18,
		donationPool: 27.90,
		status: "completed"
	},
	{
		id: "pay-13",
		date: "2025-01-01",
		gross: 30,
		stripeFee: 0.87,
		platformFee: 1.05,
		innovationFund: 0.18,
		donationPool: 27.90,
		status: "completed"
	},
	{
		id: "pay-12",
		date: "2024-12-01",
		gross: 30,
		stripeFee: 0.87,
		platformFee: 1.05,
		innovationFund: 0.18,
		donationPool: 27.90,
		status: "completed"
	},
	{
		id: "pay-11",
		date: "2024-11-01",
		gross: 30,
		stripeFee: 0.87,
		platformFee: 1.05,
		innovationFund: 0.18,
		donationPool: 27.90,
		status: "completed"
	},
	{
		id: "pay-10",
		date: "2024-10-01",
		gross: 30,
		stripeFee: 0.87,
		platformFee: 1.05,
		innovationFund: 0.18,
		donationPool: 27.90,
		status: "completed"
	}
];

export const mockImpactMetrics: ImpactMetric[] = [
	{ label: "Trees Planted", value: 1250, unit: "trees", pillar: "environment", estimated: true },
	{ label: "Ocean Plastic Removed", value: 840, unit: "kg", pillar: "environment", estimated: true },
	{ label: "Meals Provided", value: 2790, unit: "meals", pillar: "human-aid", estimated: true },
	{ label: "Patients Treated", value: 186, unit: "people", pillar: "human-aid", estimated: true },
	{ label: "Research Hours Funded", value: 2790, unit: "hours", pillar: "research", estimated: true }
];

// Admin-specific data types
export type PartnerStatus = "placeholder" | "verified" | "archived";

export interface AdminPartner {
	id: string;
	name: string;
	pillar: Pillar;
	status: PartnerStatus;
	reportingCadence: "monthly" | "quarterly";
	conversionRates: string;
	region: string;
	createdAt: string;
	lastReportDate?: string;
}

export interface PayoutBatch {
	id: string;
	quarter: string;
	year: number;
	dateSent?: string;
	totalAmount: number;
	status: "draft" | "sent";
	proofUrl?: string;
	payouts: {
		partnerId: string;
		partnerName: string;
		pillar: Pillar;
		amount: number;
		notes?: string;
	}[];
}

export interface AdminStats {
	donationPoolThisQuarter: number;
	estimatedFeesCollected: number;
	reserveHeldForDisputes: number;
	activeSubscribers: number;
	nextPayoutDate: string;
}

// Admin mock data
export const ADMIN_PARTNERS: AdminPartner[] = [
	{
		id: "admin-partner-1",
		name: "Global Forest Alliance",
		pillar: "environment",
		status: "verified",
		reportingCadence: "quarterly",
		conversionRates: "5 trees per £1 | 0.1 hectares per £10",
		region: "Global",
		createdAt: "2023-01-15",
		lastReportDate: "2025-03-01"
	},
	{
		id: "admin-partner-2",
		name: "Ocean Clean Initiative",
		pillar: "environment",
		status: "verified",
		reportingCadence: "monthly",
		conversionRates: "2 kg plastic per £1 | 1 cleanup per £50",
		region: "Global",
		createdAt: "2023-03-20",
		lastReportDate: "2025-03-05"
	},
	{
		id: "admin-partner-3",
		name: "Feed the Future",
		pillar: "human-aid",
		status: "verified",
		reportingCadence: "quarterly",
		conversionRates: "3 meals per £1 | 1 child fed daily per £10/mo",
		region: "Africa, Asia",
		createdAt: "2023-02-10",
		lastReportDate: "2025-03-03"
	},
	{
		id: "admin-partner-4",
		name: "Mobile Health Network",
		pillar: "human-aid",
		status: "verified",
		reportingCadence: "monthly",
		conversionRates: "1 patient per £5 | 2 vaccinations per £3",
		region: "Sub-Saharan Africa",
		createdAt: "2023-04-05",
		lastReportDate: "2025-03-08"
	},
	{
		id: "admin-partner-5",
		name: "OpenMed Research",
		pillar: "research",
		status: "verified",
		reportingCadence: "quarterly",
		conversionRates: "10 research hours per £1 | 1 trial day per £100",
		region: "Global",
		createdAt: "2023-05-22",
		lastReportDate: "2025-02-28"
	},
	{
		id: "admin-partner-6",
		name: "Climate Tech Lab",
		pillar: "research",
		status: "verified",
		reportingCadence: "quarterly",
		conversionRates: "1 project per £500 | 1 prototype per £2000",
		region: "Global",
		createdAt: "2023-06-18",
		lastReportDate: "2025-03-01"
	},
	{
		id: "admin-partner-7",
		name: "New Hope Foundation",
		pillar: "human-aid",
		status: "placeholder",
		reportingCadence: "quarterly",
		conversionRates: "TBD - pending verification",
		region: "South America",
		createdAt: "2025-02-01"
	},
	{
		id: "admin-partner-8",
		name: "GreenTech Africa",
		pillar: "environment",
		status: "placeholder",
		reportingCadence: "monthly",
		conversionRates: "TBD - pending verification",
		region: "East Africa",
		createdAt: "2025-03-01"
	}
];

export const PAYOUT_BATCHES: PayoutBatch[] = [
	{
		id: "batch-q4-2024",
		quarter: "Q4",
		year: 2024,
		dateSent: "2024-12-31",
		totalAmount: 116250,
		status: "sent",
		proofUrl: "/proof/q4-2024.pdf",
		payouts: [
			{ partnerId: "admin-partner-1", partnerName: "Global Forest Alliance", pillar: "environment", amount: 20000 },
			{ partnerId: "admin-partner-2", partnerName: "Ocean Clean Initiative", pillar: "environment", amount: 18750 },
			{ partnerId: "admin-partner-3", partnerName: "Feed the Future", pillar: "human-aid", amount: 25000 },
			{ partnerId: "admin-partner-4", partnerName: "Mobile Health Network", pillar: "human-aid", amount: 21500 },
			{ partnerId: "admin-partner-5", partnerName: "OpenMed Research", pillar: "research", amount: 16000 },
			{ partnerId: "admin-partner-6", partnerName: "Climate Tech Lab", pillar: "research", amount: 15000 }
		]
	},
	{
		id: "batch-q3-2024",
		quarter: "Q3",
		year: 2024,
		dateSent: "2024-09-30",
		totalAmount: 100440,
		status: "sent",
		proofUrl: "/proof/q3-2024.pdf",
		payouts: [
			{ partnerId: "admin-partner-1", partnerName: "Global Forest Alliance", pillar: "environment", amount: 17000 },
			{ partnerId: "admin-partner-2", partnerName: "Ocean Clean Initiative", pillar: "environment", amount: 16480 },
			{ partnerId: "admin-partner-3", partnerName: "Feed the Future", pillar: "human-aid", amount: 21000 },
			{ partnerId: "admin-partner-4", partnerName: "Mobile Health Network", pillar: "human-aid", amount: 19176 },
			{ partnerId: "admin-partner-5", partnerName: "OpenMed Research", pillar: "research", amount: 14000 },
			{ partnerId: "admin-partner-6", partnerName: "Climate Tech Lab", pillar: "research", amount: 12784 }
		]
	},
	{
		id: "batch-q1-2025",
		quarter: "Q1",
		year: 2025,
		totalAmount: 27900,
		status: "draft",
		payouts: [
			{ partnerId: "admin-partner-1", partnerName: "Global Forest Alliance", pillar: "environment", amount: 4650, notes: "Partial - quarter in progress" },
			{ partnerId: "admin-partner-2", partnerName: "Ocean Clean Initiative", pillar: "environment", amount: 4650, notes: "Partial - quarter in progress" },
			{ partnerId: "admin-partner-3", partnerName: "Feed the Future", pillar: "human-aid", amount: 4884, notes: "Partial - quarter in progress" },
			{ partnerId: "admin-partner-4", partnerName: "Mobile Health Network", pillar: "human-aid", amount: 4883, notes: "Partial - quarter in progress" },
			{ partnerId: "admin-partner-5", partnerName: "OpenMed Research", pillar: "research", amount: 4416, notes: "Partial - quarter in progress" },
			{ partnerId: "admin-partner-6", partnerName: "Climate Tech Lab", pillar: "research", amount: 4417, notes: "Partial - quarter in progress" }
		]
	}
];

export const ADMIN_STATS: AdminStats = {
	donationPoolThisQuarter: 27900,
	estimatedFeesCollected: 2100,
	reserveHeldForDisputes: 500,
	activeSubscribers: 1250,
	nextPayoutDate: "2025-03-31"
};

// Public Impact Reports (used by both public and admin)
export interface ImpactReport {
	id: string;
	quarter: string;
	year: number;
	dateRange: string;
	publishedDate: string;
	summary: string;
	highlights: string[];
	totalDonated: number;
	totalPartners: number;
	pillarBreakdown: {
		pillar: Pillar;
		amount: number;
		impact: string;
	}[];
}

export const IMPACT_REPORTS: ImpactReport[] = [
	{
		id: "impact-q4-2024",
		quarter: "Q4",
		year: 2024,
		dateRange: "Oct 1 - Dec 31, 2024",
		publishedDate: "2025-01-10",
		summary: "Our strongest quarter yet, with over £116,000 distributed to 6 verified partners across all three pillars.",
		highlights: [
			"250,000 trees planted across 3 continents",
			"15 tonnes of ocean plastic removed",
			"75,000 children fed daily through school meal programs",
			"12,000 patients treated via mobile health clinics"
		],
		totalDonated: 116250,
		totalPartners: 6,
		pillarBreakdown: [
			{ pillar: "environment", amount: 38750, impact: "Environmental partners reported 250,000 trees planted and 15 tonnes of plastic removed." },
			{ pillar: "human-aid", amount: 46500, impact: "Human aid partners expanded programs to serve 75,000 children and 12,000 patients." },
			{ pillar: "research", amount: 31000, impact: "Research partners published 3 peer-reviewed papers and advanced 2 clinical trials." }
		]
	},
	{
		id: "impact-q3-2024",
		quarter: "Q3",
		year: 2024,
		dateRange: "Jul 1 - Sep 30, 2024",
		publishedDate: "2024-10-10",
		summary: "Strong growth quarter with new partner onboarding and expanded reach in all pillars.",
		highlights: [
			"210,000 trees planted through reforestation programs",
			"12 tonnes of ocean plastic removed",
			"60,000 children fed daily",
			"10,000 patients treated"
		],
		totalDonated: 100440,
		totalPartners: 6,
		pillarBreakdown: [
			{ pillar: "environment", amount: 33480, impact: "Reforestation and ocean cleanup programs exceeded targets by 15%." },
			{ pillar: "human-aid", amount: 40176, impact: "School meal programs expanded to 5 new regions." },
			{ pillar: "research", amount: 26784, impact: "OpenMed published breakthrough findings on malaria treatment." }
		]
	}
];
