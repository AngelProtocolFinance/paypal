import type * as products from "./generated/catalog-products";
import type * as orders from "./generated/orders";
import type * as payments from "./generated/payments";
import type * as subscriptions from "./generated/subscriptions";
import type * as webhooks from "./generated/webhooks";

/**
 * api paths - using path definitions from generated types
 */

export const create_order_path: Extract<
	keyof orders.paths,
	"/v2/checkout/orders"
> = "/v2/checkout/orders";

export const create_product_path: Extract<
	keyof products.paths,
	"/v1/catalogs/products"
> = "/v1/catalogs/products";

export const create_plan_path: Extract<
	keyof subscriptions.paths,
	"/v1/billing/plans"
> = "/v1/billing/plans";

export const create_subscription_path: Extract<
	keyof subscriptions.paths,
	"/v1/billing/subscriptions"
> = "/v1/billing/subscriptions";

export const oauth_token_path = "/v1/oauth2/token" as const;

export type PurchaseUnitsRequest =
	orders.components["schemas"]["purchase_unit_request"];

export type Order = orders.components["schemas"]["order"];
export type Capture = payments.components["schemas"]["capture-2"];
export type Subs = subscriptions.components["schemas"]["subscription"];
export type WebhookEvent = webhooks.components["schemas"]["event"];

/**
 * type for create order request body
 */
export type CreateOrderRequest =
	orders.paths["/v2/checkout/orders"]["post"]["requestBody"]["content"]["application/json"];

/**
 * type for create order response
 */
export type CreateOrderResponse =
	orders.paths["/v2/checkout/orders"]["post"]["responses"]["201"]["content"]["application/json"];

/**
 * type for create product request body
 */
export type CreateProductRequest = NonNullable<
	products.paths["/v1/catalogs/products"]["post"]["requestBody"]
>["content"]["application/json"];

/**
 * type for create product response
 */
export type CreateProductResponse =
	products.paths["/v1/catalogs/products"]["post"]["responses"]["201"]["content"]["application/json"];

/**
 * type for create plan request body
 */
export type CreatePlanRequest = NonNullable<
	subscriptions.paths["/v1/billing/plans"]["post"]["requestBody"]
>["content"]["application/json"];

/**
 * type for create plan response
 */
export type CreatePlanResponse =
	subscriptions.paths["/v1/billing/plans"]["post"]["responses"]["201"]["content"]["application/json"];

/**
 * type for create subscription request body
 */
export type CreateSubscriptionRequest = NonNullable<
	subscriptions.paths["/v1/billing/subscriptions"]["post"]["requestBody"]
>["content"]["application/json"];

/**
 * type for create subscription response
 */
export type CreateSubscriptionResponse =
	subscriptions.paths["/v1/billing/subscriptions"]["post"]["responses"]["201"]["content"]["application/json"];

/**
 * paypal sdk configuration
 */
export interface ISdkConfig {
	client_id: string;
	client_secret: string;
	api_url: string;
}

/**
 * paypal access token response
 */
export interface IAccessTokenRes {
	access_token: string;
	token_type: string;
	expires_in: number;
}
