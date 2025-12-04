import {
	type CreateOrderRequest,
	type CreateOrderResponse,
	type CreatePlanRequest,
	type CreatePlanResponse,
	type CreateProductRequest,
	type CreateProductResponse,
	type CreateSubscriptionRequest,
	type CreateSubscriptionResponse,
	create_order_path,
	create_plan_path,
	create_product_path,
	create_subscription_path,
	type IAccessTokenRes,
	type ISdkConfig,
	oauth_token_path,
} from "./interfaces.js";

export class PayPalSDK {
	private config: ISdkConfig;
	private access_token?: string;
	private token_expiry?: number;

	constructor(config: ISdkConfig) {
		this.config = config;
	}

	/**
	 * get access token using client credentials
	 */
	private async get_access_token(): Promise<string> {
		// return cached token if still valid
		if (
			this.access_token &&
			this.token_expiry &&
			Date.now() < this.token_expiry
		) {
			return this.access_token;
		}

		const auth = Buffer.from(
			`${this.config.client_id}:${this.config.client_secret}`,
		).toString("base64");

		const response = await globalThis.fetch(
			`${this.config.api_url}${oauth_token_path}`,
			{
				method: "POST",
				headers: {
					Authorization: `Basic ${auth}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: "grant_type=client_credentials",
			},
		);

		if (!response.ok) {
			const error = await response.text();
			throw new Error(
				`Failed to get access token: ${response.status} ${error}`,
			);
		}

		const data = (await response.json()) as IAccessTokenRes;
		this.access_token = data.access_token;
		// set expiry with 60 second buffer
		this.token_expiry = Date.now() + (data.expires_in - 60) * 1000;

		return this.access_token;
	}

	/**
	 * create an order
	 */
	async create_order(
		order_data: CreateOrderRequest,
	): Promise<CreateOrderResponse> {
		const token = await this.get_access_token();

		const response = await globalThis.fetch(
			`${this.config.api_url}${create_order_path}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order_data),
			},
		);

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Failed to create order: ${response.status} ${error}`);
		}

		return (await response.json()) as CreateOrderResponse;
	}

	/**
	 * create a product
	 */
	async create_product(
		product_data: CreateProductRequest,
	): Promise<CreateProductResponse> {
		const token = await this.get_access_token();

		const response = await globalThis.fetch(
			`${this.config.api_url}${create_product_path}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product_data),
			},
		);

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Failed to create product: ${response.status} ${error}`);
		}

		return (await response.json()) as CreateProductResponse;
	}

	/**
	 * create a billing plan
	 */
	async create_plan(plan_data: CreatePlanRequest): Promise<CreatePlanResponse> {
		const token = await this.get_access_token();

		const response = await globalThis.fetch(
			`${this.config.api_url}${create_plan_path}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(plan_data),
			},
		);

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Failed to create plan: ${response.status} ${error}`);
		}

		return (await response.json()) as CreatePlanResponse;
	}

	/**
	 * create a subscription
	 */
	async create_subscription(
		subscription_data: CreateSubscriptionRequest,
	): Promise<CreateSubscriptionResponse> {
		const token = await this.get_access_token();

		const response = await globalThis.fetch(
			`${this.config.api_url}${create_subscription_path}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(subscription_data),
			},
		);

		if (!response.ok) {
			const error = await response.text();
			throw new Error(
				`Failed to create subscription: ${response.status} ${error}`,
			);
		}

		return (await response.json()) as CreateSubscriptionResponse;
	}
}
