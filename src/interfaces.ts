import type * as orders from "./generated/orders";
import type * as payments from "./generated/payments";
import type * as webhooks from "./generated/webhooks";

/**
 * API Paths - using path definitions from generated types
 */

export const create_order_path: Extract<
	keyof orders.paths,
	"/v2/checkout/orders"
> = "/v2/checkout/orders";

export const oauth_token_path = "/v1/oauth2/token" as const;

export type PurchaseUnitsRequest =
	orders.components["schemas"]["purchase_unit_request"];

export type Order = orders.components["schemas"]["order"];
export type Capture = payments.components["schemas"]["capture-2"];
export type WebhookEvent = webhooks.components["schemas"]["event"];

/**
 * Type for create order request body
 */
export type CreateOrderRequest =
	orders.paths["/v2/checkout/orders"]["post"]["requestBody"]["content"]["application/json"];

/**
 * Type for create order response
 */
export type CreateOrderResponse =
	orders.paths["/v2/checkout/orders"]["post"]["responses"]["201"]["content"]["application/json"];

/**
 * PayPal SDK Configuration
 */
export interface ISdkConfig {
	client_id: string;
	client_secret: string;
	api_url: string;
}

/**
 * PayPal Access Token Response
 */
export interface IAccessTokenRes {
	access_token: string;
	token_type: string;
	expires_in: number;
}
