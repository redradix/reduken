# Requests

# Action creators

```ts
declare const startRequest: (domain: string) => object;

declare const requestOk: (domain: string) => object;

declare const requestError: (domain: string, error: Error) => object;

declare const removeRequest: (domain: string) => object;
```

# Selectors

> **Note** that all selectors are currified

```ts
declare const isRequestPending: (domain: string, state: object) => boolean;

declare const isRequestCompleted: (domain: string, state: object) => boolean;

declare const getRequestError: (domain: string, state: object) => Error | null;
```