# Hash

## Action creators

```ts
/**
 * Sets a single value in a hash, specified by
 * domain and keys
 */
declare function set(domain: string, keys: string | string[], value: any): object;

/**
 * Deletes the value containing in a specified domain
 * and keys
 */
declare function remove(domain: string, keys: string | string[]): object;

/**
 * Merges a Javascript object in an existing hash
 */
declare function merge(domain: string, keys: string | string[], map: object): object;

/**
 * Increments the value inside a domain and keys by delta
 */
declare function incrementBy(domain: string, keys: string | string[], delta: number): object;

/**
 * Toggles a Boolean key in a hash. If key is not present, it will assumed to
 * be false, so toggle() will cause it to be true.
 */
declare function toggle(domain: string, keys: string | string[]): object;
```

## Selectors

> **Note** that all selectors are currified

```ts
/**
 * Get a single property from a hash
 */
declare const getFromPath: (domain: string, path: string[], state: object) => any;

/**
 * Get all the domain content
 */
declare const getDomain: (domain: string, state: object) => any[];

/**
 * Get the keys of the domain
 */
declare const getKeys: (domain: string, state: object) => string[];

/**
 * Get the domain length
 */
declare const getDomainLength: (domain: string, state: object) => number;

/**
 * Returns if there's a value inside a domain
 * and keys
 */
declare const existInPath: (domain: string, path: string[], state: object) => boolean;
```

