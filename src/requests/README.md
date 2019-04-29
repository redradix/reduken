# Requests

# Action creators

```ts
declare const startRequest: (domain: string) => object;

declare const endRequestSuccess: (domain: string) => object;

declare const endRequestError: (domain: string, error: Error) => object;

declare const removeRequest: (domain: string) => object;
```

# Selectors

> **Note** that all selectors are currified

```ts
declare const getRequestStatus: (domain: string, state: object) => string;

declare const isRequestPending: (domain: string, state: object) => boolean;

declare const isRequestSucceeded: (domain: string, state: object) => boolean;

declare const getRequestError: (domain: string, state: object) => Error;
```