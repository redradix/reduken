# Hash

## Action creators

```ts
/**
 * Sets a single value in a hash, specified by
 * domain and keys
 */
declare function hset(domain: string, keys: string[], value: any): object;

/**
 * Deletes the value containing in a specified domain
 * and keys
 */
declare function hdel(domain: string, keys: string[]): object;

/**
 * Merges a Javascript object in an existing hash
 */
declare function hmset(domain: string, map: object): object;

/**
 * Increments the value inside a domain and keys
 * by delta
 */
declare function hincrby(domain: string, keys: string[], delta: number): object;

/**
 * Toggles a Boolean key in a hash. If key is not present, it will assumed to
 * be false, so htoggle() will cause it to be true.
 */
declare function htoggle(domain: string, keys: string[]): object;
```


## Selectors

> **Note** that all selectors are currified

```ts
/**
 * Get a single property from a hash
 */
declare const hget: (domain: string, keys: string[], state: object) => any;

/**
 * Get all the domain content
 */
declare const hgetall: (domain: string, state: object) => any[];

/**
 * Get the keys of the domain
 */
declare const hkeys: (domain: string, state: object) => string[];

/**
 * Get the domain length
 */
declare const hlen: (domain: string, state: object) => number;

/**
 * Returns if there's a value inside a domain
 * and keys
 */
declare const hexists: (domain: string, keys: string[], state: object) => boolean;
```

