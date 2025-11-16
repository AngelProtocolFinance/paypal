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

## Available APIs

This package provides TypeScript types for the following PayPal APIs:

- **Orders** - Checkout Orders API v2
- **Payments** - Payments API v2
- **Subscriptions** - Billing Subscriptions API v1
- **Invoices** - Invoicing API v2
- **Payouts** - Payouts Batch API v1
- **Payment Tokens** - Vault Payment Tokens API v3
- **Disputes** - Customer Disputes API v1
- **Partner Referrals** - Partner Referrals API v2
- **Catalog Products** - Catalog Products API v1
- **Shipment Tracking** - Shipment Tracking API v1
- **Web Experience Profiles** - Payment Experience API v1
- **Transaction Search** - Transaction Search API v1
- **Webhooks** - Webhooks Management API v1

## Usage

```typescript
import {
  orders,
  payments,
  subscriptions,
  invoices
} from '@better-giving/paypal';

// Use the generated types
type Order = orders.components['schemas']['order'];
type Payment = payments.components['schemas']['payment'];
type Subscription = subscriptions.components['schemas']['subscription'];

// Path types
type CreateOrderPath = orders.paths['/v2/checkout/orders']['post'];

// Response types
type CreateOrderResponse = orders.paths['/v2/checkout/orders']['post']['responses']['201']['content']['application/json'];

// Request body types
type CreateOrderRequest = orders.paths['/v2/checkout/orders']['post']['requestBody']['content']['application/json'];
```

## Example with Fetch

```typescript
import { orders } from '@better-giving/paypal';

type CreateOrderRequest = orders.paths['/v2/checkout/orders']['post']['requestBody']['content']['application/json'];
type CreateOrderResponse = orders.paths['/v2/checkout/orders']['post']['responses']['201']['content']['application/json'];

async function createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
  const response = await fetch('https://api.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(orderData)
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
