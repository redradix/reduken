# Hash

## Action creators

```ts
/**
 * Sets a single value in a hash, specified by
 * domain and keys
 */
declare function set(keys: string | string[], value: any): object;

/**
 * Deletes the value containing in a specified domain
 * and keys
 */
declare function remove(keys: string | string[]): object;

/**
 * Merges a Javascript object in an existing hash
 */
declare function merge(keys: string | string[], map: object): object;

/**
 * Increments the value inside a domain and keys by delta
 */
declare function incrementBy(keys: string | string[], delta: number): object;

/**
 * Toggles a Boolean key in a hash. If key is not present, it will assumed to
 * be false, so toggle() will cause it to be true.
 */
declare function toggle(keys: string | string[]): object;
```

## Selectors

> **Note** that all selectors are currified

```ts
/**
 * Get a single property from a hash
 */
declare const getFromPath: (path: string[], state: object) => any;
```

