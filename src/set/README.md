# Set

> Primitive Types are Strings, Numbers and Booleans

## Action creators

```ts
/**
 * Adds one or multiple elements to the set avoiding duplications
 */
declare function sadd(domain: string, value: any): object;

/**
 * Removes one or multiple elements from a set
 */
declare function srem(domain: string, value: any): object;

/**
 * Calculates the union of multiple sets and stores it in a new set
 */
declare function sunion(domain: string, sources: string[]): object;

/**
 * Calculates the set difference between multiple sets and stores
 * it in a new set
 */
declare function sdiff(domain: string, sources: string[]): object;

/**
 * Calculates the intersection of multiple sets and stores it in a
 * new set
 */
declare function sinter(domain: string, sources: string[]): object;

/**
 * Moves an element from a source set to a domain set
 */
declare function smove(domain: string, source: string, value: any): object;
```

## Selectors

> **Note** that all selectors are currified

```ts
/**
 * Returns how many items the set contains
 */
declare const scard: (domain: string, state: object) => number;
/**
 * Returns if the value is inside the domain set
 */
declare const sisMember: (domain: string, value: any, state: object) => boolean;
/**
 * Gets all the items inside a domain set
 */
declare const smembers: (domain: string, state: object) => any[];
/**
 * Get a random item inside the domain set
 */
declare const srand: (domain: string, state: object) => any;
```