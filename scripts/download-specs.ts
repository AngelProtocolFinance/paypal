#!/usr/bin/env tsx

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPECS_DIR = join(__dirname, "..", "specs");
const BASE_URL =
	"https://raw.githubusercontent.com/paypal/paypal-rest-api-specifications/main/openapi";

// List of all PayPal OpenAPI specification files
const SPEC_FILES = [
	"checkout_orders_v2.json",
	"payments_payment_v2.json",
	"billing_subscriptions_v1.json",
	// "invoicing_v2.json",
	// "payments_payouts_batch_v1.json",
	// "vault_payment_tokens_v3.json",
	// "customer_disputes_v1.json",
	// "customer_partner_referrals_v2.json",
	"catalogs_products_v1.json",
	// "shipping_shipment_tracking_v1.json",
	// "payment-experience_web_experience_profiles_v1.json",
	// "reporting_transactions_v1.json",
	"notifications_webhooks_v1.json",
];

async function downloadSpec(filename: string): Promise<boolean> {
	const url = `${BASE_URL}/${filename}`;
	console.log(`Downloading ${filename}...`);

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.text();
		const outputPath = join(SPECS_DIR, filename);
		await writeFile(outputPath, data, "utf8");
		console.log(`✓ Downloaded ${filename}`);
		return true;
	} catch (error) {
		console.error(
			`✗ Failed to download ${filename}:`,
			error instanceof Error ? error.message : String(error),
		);
		return false;
	}
}

async function main(): Promise<void> {
	console.log("Creating specs directory...");
	await mkdir(SPECS_DIR, { recursive: true });

	console.log(
		`\nDownloading ${SPEC_FILES.length} PayPal OpenAPI specifications...\n`,
	);

	const results = await Promise.all(SPEC_FILES.map(downloadSpec));
	const successCount = results.filter(Boolean).length;

	console.log(
		`\n✓ Downloaded ${successCount}/${SPEC_FILES.length} specifications`,
	);

	if (successCount < SPEC_FILES.length) {
		process.exit(1);
	}
}

main().catch((error) => {
	console.error("Error:", error);
	process.exit(1);
});
