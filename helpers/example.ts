/**
 * Example usage of PayPal SDK
 */

import { PayPalSDK } from './paypal-sdk';

// Initialize the SDK
const sdk = new PayPalSDK({
  client_id: 'your-client-id',
  client_secret: 'your-client-secret',
  api_url: 'https://api-m.sandbox.paypal.com', // or https://api-m.paypal.com for production
});

// Create an order
async function create_order() {
  try {
    const order = await sdk.create_order({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00',
          },
        },
      ],
    });

    console.log('Order created:', order.id);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Example usage
// create_order();
