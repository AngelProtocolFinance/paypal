# Project Instructions

## Code Style Conventions

### Naming Convention
- **Use snake_case** for variables, functions, methods, and parameters
- This applies to all code written for this project
- Consistency with snake_case improves readability and maintains uniform style

### Examples
```typescript
// Good - snake_case
const access_token = await get_access_token();
async function create_order(order_data: OrderData) { }
interface PayPalConfig {
  client_id: string;
  client_secret: string;
  api_url: string;
}

// Avoid - camelCase
const accessToken = await getAccessToken();
async function createOrder(orderData: OrderData) { }
```

## Type Safety Best Practices

### Use Path Definitions from Generated Types
- Always reference API paths from the generated `paths` type definitions
- Use `satisfies keyof paths` to ensure path strings match the generated types
- Define paths as constants for reusability and type safety

```typescript
// Good - using path definitions
const PATHS = {
  CREATE_ORDER: '/v2/checkout/orders' as const satisfies keyof paths,
} as const;

type CreateOrderRequest = paths[typeof PATHS.CREATE_ORDER]['post']['requestBody']['content']['application/json'];

// Then use in code
fetch(`${api_url}${PATHS.CREATE_ORDER}`, { ... });

// Avoid - hardcoded strings without type checking
fetch(`${api_url}/v2/checkout/orders`, { ... });
```

## Project Structure
- `/generated` - Auto-generated TypeScript types from PayPal OpenAPI specs
- `/helpers` - SDK and utility functions
- `/scripts` - Build and generation scripts
- `/dist` - Compiled output (not tracked in git)
