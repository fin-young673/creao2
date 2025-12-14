// Simple client-side PDF generation using jsPDF-like approach
// This is a minimal implementation for demonstration purposes

export interface ReceiptData {
	id: string;
	date: string;
	gross: number;
	stripeFee: number;
	platformFee: number;
	innovationFund: number;
	donationPool: number;
	planName: string;
	userName: string;
}

export interface QuarterReportData {
	quarter: string;
	year: number;
	totalAmount: number;
	payouts: {
		partnerName: string;
		pillar: string;
		amount: number;
	}[];
}

/**
 * Generates a simple text-based PDF for payment receipts
 */
export function generateReceiptPDF(receipt: ReceiptData): void {
	const content = `
GIVETRANSPARENT PAYMENT RECEIPT
================================

Receipt ID: ${receipt.id}
Date: ${new Date(receipt.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
User: ${receipt.userName}
Plan: ${receipt.planName}

PAYMENT BREAKDOWN
-----------------
Gross Amount:        £${receipt.gross.toFixed(2)}

Fees:
  Stripe Fee (2.9%): £${receipt.stripeFee.toFixed(2)}
  Platform Fee (3.5%): £${receipt.platformFee.toFixed(2)}
  Innovation Fund (0.6%): £${receipt.innovationFund.toFixed(2)}
  Total Fees:        £${(receipt.stripeFee + receipt.platformFee + receipt.innovationFund).toFixed(2)}

Donation Pool:       £${receipt.donationPool.toFixed(2)}

This amount will be distributed to verified partners at the end of the quarter.

Thank you for your transparent giving!

---
GiveTransparent
https://givetransparent.org
support@givetransparent.org
	`.trim();

	downloadTextAsPDF(content, `receipt-${receipt.id}.pdf`);
}

/**
 * Generates a quarterly payout report PDF
 */
export function generateQuarterReportPDF(report: QuarterReportData): void {
	const content = `
GIVETRANSPARENT QUARTERLY PAYOUT REPORT
========================================

Quarter: ${report.quarter} ${report.year}
Total Distributed: £${report.totalAmount.toLocaleString()}

PARTNER ALLOCATIONS
-------------------

${report.payouts.map(p =>
	`${p.partnerName} (${p.pillar})
  Amount: £${p.amount.toLocaleString()}`
).join('\n\n')}

TOTAL: £${report.totalAmount.toLocaleString()}

PROOF & RECEIPTS
----------------
All partner payouts have been completed via bank transfer.
Transaction receipts and partner acknowledgments are on file.

For verification questions, contact: transparency@givetransparent.org

---
This is an official GiveTransparent transparency report.
All data is verified and auditable.

GiveTransparent
https://givetransparent.org
	`.trim();

	downloadTextAsPDF(content, `payout-report-${report.quarter}-${report.year}.pdf`);
}

/**
 * Downloads text content as a PDF file (simplified approach using text encoding)
 * In a real app, you'd use a library like jsPDF or pdfmake
 */
function downloadTextAsPDF(content: string, filename: string): void {
	// Create a simple blob with the text content
	// For a real PDF, you'd use a proper PDF library
	// This creates a text file with .pdf extension for demo purposes
	const blob = new Blob([content], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();

	// Cleanup
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

/**
 * Opens a PDF in a new tab
 */
export function viewPDFInNewTab(content: string, title: string): void {
	const blob = new Blob([content], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	window.open(url, '_blank');

	// Note: In production, you'd want to clean this up after the window closes
	// For now, we'll let the browser handle it
}
