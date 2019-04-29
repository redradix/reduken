# List

## Action creators

```ts
/**
 * Prepends an item to the list
 */
declare function lprepend(domain: string, value: any): object;

/**
 * Appends an item in the right of the list
 */
declare function lappend(domain: string, value: any): object;

/**
 * Removes the first value of list
 */
declare function lshift(domain: string): object;

/**
 * Removes the last value of list
 */
declare function lpop(domain: string): object;

/**
 * Sets a value in a specific index of the list
 */
declare function lset(domain: string, index: number, value: any): object;

/**
 * Replaces all the list elements with new ones
 */
declare function lreplace(domain: string, elements: any[]): object;

/**
 * Removes n occurrences of the value in the list
 */
declare function lrem(domain: string, count: number, value: any): object;

/**
 * Removes all the elements in the list except of the ones
 * included in the specified range
 */
declare function ltrim(domain: string, start: number, stop?: number): object;
```

## Selectors

> **Note** that all selectors are currified

```ts
/**
 * Get all the elements in a list
 */
declare const getList: (domain: string, state: object) => any[]; // rename lgetall

/**
 * Get length of a list
 */
declare const llen: (domain: string, state: object) => number;

/**
 * Get the element in a specified position inside the list
 */
declare const lget: (domain: string, index: number, state: object) => any;

/**
 * Get the elements inside a specified range
 */
declare const lrange: (domain: string, start: number, stop: string, state: object) => any[];

/**
 * Returns if the list contains the specified value
 */
declare const lcontains: (domain: string, value: any, state: object) => boolean;

/**
 * Returns the number of times the value is inside the list
 */
declare const loccurrences: (domain: string, value: any, state: object) => boolean;
```