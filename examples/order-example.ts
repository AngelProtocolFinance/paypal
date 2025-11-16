/**
 * Example usage of PayPal TypeScript types
 * This file demonstrates how to use the generated types for type-safe PayPal API interactions
 */

import {
  orders,
  payments,
  subscriptions
} from '@better-giving/paypal';

// ============================================================================
// ORDERS API EXAMPLES
// ============================================================================

/**
 * Type for creating an order
 */
type CreateOrderRequest = orders['paths']['/v2/checkout/orders']['post']['requestBody']['content']['application/json'];
type CreateOrderResponse = orders['paths']['/v2/checkout/orders']['post']['responses']['201']['content']['application/json'];

/**
 * Type for an Order object
 */
type Order = orders['components']['schemas']['order'];

/**
 * Example function to create a PayPal order
 */
async function createOrder(
  accessToken: string,
  orderData: CreateOrderRequest
): Promise<CreateOrderResponse> {
  const response = await fetch('https://api.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Example order data with full type safety
 */
const exampleOrderData: CreateOrderRequest = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      amount: {
        currency_code: 'USD',
        value: '100.00'
      },
      description: 'Example purchase'
    }
  ]
};

// ============================================================================
// PAYMENTS API EXAMPLES
// ============================================================================

/**
 * Type for capturing an authorization
 */
type CaptureAuthorizationRequest = payments['paths']['/v2/payments/authorizations/{authorization_id}/capture']['post']['requestBody']['content']['application/json'];
type CaptureAuthorizationResponse = payments['paths']['/v2/payments/authorizations/{authorization_id}/capture']['post']['responses']['201']['content']['application/json'];

/**
 * Type for a Payment Capture object
 */
type Capture = payments['components']['schemas']['capture'];

/**
 * Example function to capture an authorization
 */
async function captureAuthorization(
  accessToken: string,
  authorizationId: string,
  captureData?: CaptureAuthorizationRequest
): Promise<CaptureAuthorizationResponse> {
  const response = await fetch(
    `https://api.paypal.com/v2/payments/authorizations/${authorizationId}/capture`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: captureData ? JSON.stringify(captureData) : undefined
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to capture authorization: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// SUBSCRIPTIONS API EXAMPLES
// ============================================================================

/**
 * Type for creating a subscription
 */
type CreateSubscriptionRequest = subscriptions['paths']['/v1/billing/subscriptions']['post']['requestBody']['content']['application/json'];
type CreateSubscriptionResponse = subscriptions['paths']['/v1/billing/subscriptions']['post']['responses']['201']['content']['application/json'];

/**
 * Type for a Subscription object
 */
type Subscription = subscriptions['components']['schemas']['subscription'];

/**
 * Example function to create a subscription
 */
async function createSubscription(
  accessToken: string,
  subscriptionData: CreateSubscriptionRequest
): Promise<CreateSubscriptionResponse> {
  const response = await fetch('https://api.paypal.com/v1/billing/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(subscriptionData)
  });

  if (!response.ok) {
    throw new Error(`Failed to create subscription: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// USING COMPONENT SCHEMAS DIRECTLY
// ============================================================================

/**
 * Example: Using component schemas directly for data structures
 */

// Money type from orders API
type Money = orders['components']['schemas']['money'];

// Amount breakdown type
type AmountBreakdown = orders['components']['schemas']['amount_breakdown'];

// Payer information type
type Payer = orders['components']['schemas']['payer'];

/**
 * Example function that uses component schemas
 */
function calculateTotal(amounts: Money[]): Money {
  const total = amounts.reduce((sum, money) => {
    return sum + parseFloat(money.value);
  }, 0);

  return {
    currency_code: amounts[0]?.currency_code || 'USD',
    value: total.toFixed(2)
  };
}

/**
 * Example usage with type safety
 */
const prices: Money[] = [
  { currency_code: 'USD', value: '10.00' },
  { currency_code: 'USD', value: '20.00' },
  { currency_code: 'USD', value: '30.00' }
];

const total = calculateTotal(prices);
console.log('Total:', total); // { currency_code: 'USD', value: '60.00' }

// ============================================================================
// ERROR HANDLING WITH TYPED RESPONSES
// ============================================================================

/**
 * PayPal error response type
 */
type ErrorResponse = orders['components']['schemas']['error'];

/**
 * Example function with typed error handling
 */
async function getOrder(
  accessToken: string,
  orderId: string
): Promise<Order> {
  const response = await fetch(
    `https://api.paypal.com/v2/checkout/orders/${orderId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(`PayPal Error: ${error.message}`);
  }

  return response.json();
}

// ============================================================================
// EXPORT EXAMPLES FOR USE
// ============================================================================

export {
  createOrder,
  captureAuthorization,
  createSubscription,
  getOrder,
  calculateTotal
};

export type {
  Order,
  CreateOrderRequest,
  CreateOrderResponse,
  Capture,
  Subscription,
  Money,
  Payer,
  ErrorResponse
};
