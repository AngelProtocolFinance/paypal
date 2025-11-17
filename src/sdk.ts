import {
	type CreateOrderRequest,
	type CreateOrderResponse,
	create_order_path,
	type IAccessTokenRes,
	type ISdkConfig,
	oauth_token_path,
} from "./interfaces";

export class PayPalSDK {
	private config: ISdkConfig;
	private access_token?: string;
	private token_expiry?: number;

	constructor(config: ISdkConfig) {
		this.config = config;
	}

	/**
	 * Get access token using client credentials
	 */
	private async get_access_token(): Promise<string> {
		// Return cached token if still valid
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
		// Set expiry with 60 second buffer
		this.token_expiry = Date.now() + (data.expires_in - 60) * 1000;

		return this.access_token;
	}

	/**
	 * Create an order
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
}
