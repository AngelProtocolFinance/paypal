# PayPal TypeScript Types

TypeScript type definitions automatically generated from [PayPal's official OpenAPI specifications](https://github.com/paypal/paypal-rest-api-specifications).

## Features

- **Type-safe**: Fully typed interfaces for all PayPal REST APIs
- **Up-to-date**: Generated directly from official PayPal OpenAPI specs
- **Comprehensive**: Covers 13 PayPal APIs including Orders, Payments, Subscriptions, and more
- **Tree-shakeable**: Import only the types you need

## Installation

```bash
pnpm install @better-giving/paypal
```

## Available Modules

This package provides TypeScript types for the following PayPal APIs:

| Module | Import Path | API |
|--------|-------------|-----|
| **Orders** | `@better-giving/paypal/orders` | Checkout Orders API v2 |
| **Payments** | `@better-giving/paypal/payments` | Payments API v2 |
| **Subscriptions** | `@better-giving/paypal/subscriptions` | Billing Subscriptions API v1 |
| **Invoices** | `@better-giving/paypal/invoices` | Invoicing API v2 |
| **Payouts** | `@better-giving/paypal/payouts` | Payouts Batch API v1 |
| **Payment Tokens** | `@better-giving/paypal/payment-tokens` | Vault Payment Tokens API v3 |
| **Disputes** | `@better-giving/paypal/disputes` | Customer Disputes API v1 |
| **Partner Referrals** | `@better-giving/paypal/partner-referrals` | Partner Referrals API v2 |
| **Catalog Products** | `@better-giving/paypal/catalog-products` | Catalog Products API v1 |
| **Shipment Tracking** | `@better-giving/paypal/shipment-tracking` | Shipment Tracking API v1 |
| **Web Experience Profiles** | `@better-giving/paypal/web-experience-profiles` | Payment Experience API v1 |
| **Transaction Search** | `@better-giving/paypal/transaction-search` | Transaction Search API v1 |
| **Webhooks** | `@better-giving/paypal/webhooks` | Webhooks Management API v1 |
| **Helpers** | `@better-giving/paypal/helpers` | SDK utilities |

## Usage

Import types directly from specific API modules:

```typescript
// Import from specific modules
import type { paths as OrdersPaths } from '@better-giving/paypal/orders';
import type { paths as PaymentsPaths } from '@better-giving/paypal/payments';
import type { paths as SubscriptionsPaths } from '@better-giving/paypal/subscriptions';

// Use the generated types
type Order = OrdersPaths['/v2/checkout/orders']['post']['responses']['201']['content']['application/json'];
type CreateOrderRequest = OrdersPaths['/v2/checkout/orders']['post']['requestBody']['content']['application/json'];
type CreateOrderResponse = OrdersPaths['/v2/checkout/orders']['post']['responses']['201']['content']['application/json'];
```

## Using the PayPal SDK Helper

This package includes a simple SDK helper for making API calls:

```typescript
import { PayPalSDK, type PayPalConfig } from '@better-giving/paypal/helpers';

const sdk = new PayPalSDK({
  client_id: 'your-client-id',
  client_secret: 'your-client-secret',
  api_url: 'https://api-m.sandbox.paypal.com', // or https://api-m.paypal.com for production
});

// Create an order
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

console.log('Order ID:', order.id);
```

## Example with Fetch

```typescript
import type { paths } from '@better-giving/paypal/orders';

type CreateOrderRequest = paths['/v2/checkout/orders']['post']['requestBody']['content']['application/json'];
type CreateOrderResponse = paths['/v2/checkout/orders']['post']['responses']['201']['content']['application/json'];

async function create_order(order_data: CreateOrderRequest): Promise<CreateOrderResponse> {
  const response = await fetch('https://api.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify(order_data)
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
}
```

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Building from Source

```bash
# Clone the repository
git clone <your-repo-url>
cd paypal-typescript-types

# Install dependencies
pnpm install

# Download PayPal OpenAPI specs and generate types
pnpm run build
```

### Scripts

- `pnpm run download-specs` - Download OpenAPI specifications from PayPal's repository
- `pnpm run generate` - Generate TypeScript types from downloaded specs
- `pnpm run build` - Full build process (download specs + generate types + compile)
- `pnpm run clean` - Remove generated files and build artifacts

## Publishing

To publish a new version:

```bash
# Login to npm registry (first time only)
pnpm login

# Update version in package.json
pnpm version patch  # or minor, or major

# Publish to npm registry
pnpm publish --access public
```

## Updating Types

To update the types when PayPal releases new API specifications:

```bash
pnpm run build
pnpm version patch
pnpm publish
```

## Type Structure

Each API module exports types following the OpenAPI structure:

```typescript
{
  paths: {
    '/api/path': {
      get: { parameters, responses, ... },
      post: { requestBody, responses, ... },
      ...
    }
  },
  components: {
    schemas: { ... },
    parameters: { ... },
    responses: { ... }
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Disclaimer

This is an unofficial package. For official PayPal SDKs and documentation, visit [PayPal Developer](https://developer.paypal.com/).

## Related Links

- [PayPal REST API Specifications](https://github.com/paypal/paypal-rest-api-specifications)
- [PayPal Developer Documentation](https://developer.paypal.com/docs/api/)
- [openapi-typescript](https://github.com/drwpow/openapi-typescript)
