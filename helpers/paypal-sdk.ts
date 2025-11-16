import type { paths } from '../generated/orders';

/**
 * PayPal SDK Configuration
 */
export interface PayPalConfig {
  client_id: string;
  client_secret: string;
  api_url: string;
}

/**
 * PayPal Access Token Response
 */
interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * API Paths - using path definitions from generated types
 */
const PATHS = {
  OAUTH_TOKEN: '/v1/oauth2/token' as const,
  CREATE_ORDER: '/v2/checkout/orders' as const satisfies keyof paths,
} as const;

/**
 * Type for create order request body
 */
type CreateOrderRequest = paths[typeof PATHS.CREATE_ORDER]['post']['requestBody']['content']['application/json'];

/**
 * Type for create order response
 */
type CreateOrderResponse = paths[typeof PATHS.CREATE_ORDER]['post']['responses']['201']['content']['application/json'];

/**
 * Simple PayPal SDK using fetch
 */
export class PayPalSDK {
  private config: PayPalConfig;
  private access_token?: string;
  private token_expiry?: number;

  constructor(config: PayPalConfig) {
    this.config = config;
  }

  /**
   * Get access token using client credentials
   */
  private async get_access_token(): Promise<string> {
    // Return cached token if still valid
    if (this.access_token && this.token_expiry && Date.now() < this.token_expiry) {
      return this.access_token;
    }

    const auth = Buffer.from(
      `${this.config.client_id}:${this.config.client_secret}`
    ).toString('base64');

    const response = await globalThis.fetch(`${this.config.api_url}${PATHS.OAUTH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get access token: ${response.status} ${error}`);
    }

    const data = await response.json() as AccessTokenResponse;
    this.access_token = data.access_token;
    // Set expiry with 60 second buffer
    this.token_expiry = Date.now() + (data.expires_in - 60) * 1000;

    return this.access_token;
  }

  /**
   * Create an order
   */
  async create_order(order_data: CreateOrderRequest): Promise<CreateOrderResponse> {
    const token = await this.get_access_token();

    const response = await globalThis.fetch(`${this.config.api_url}${PATHS.CREATE_ORDER}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order_data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create order: ${response.status} ${error}`);
    }

    return await response.json();
  }
}
