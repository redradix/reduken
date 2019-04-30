# List

## Action creators

```ts
/**
 * Prepends an item to the list
 */
declare function prepend(domain: string, value: any): object;

/**
 * Appends an item in the right of the list
 */
declare function append(domain: string, value: any): object;

/**
 * Removes the first value of list
 */
declare function shift(domain: string): object;

/**
 * Removes the last value of list
 */
declare function pop(domain: string): object;

/**
 * Replaces a value in a specific index of the list
 */
declare function replaceOne(domain: string, index: number, value: any): object;

/**
 * Replaces all the domain elements with new ones
 */
declare function replaceDomain(domain: string, elements: any[]): object;

/**
 * Removes n occurrences of the value in the list
 */
declare function removeOccurrences(domain: string, count: number, value: any): object;

/**
 * Removes all the elements in the list except of the ones
 * included in the specified range
 */
declare function trim(domain: string, start: number, stop?: number): object;
```

## Selectors

> **Note** that all selectors are currified

```ts
/**
 * Get all the elements in a list
 */
declare const getList: (domain: string, state: object) => any[];

/**
 * Get the element in a specified position inside the list
 */
declare const getByIndex: (domain: string, index: number, state: object) => any;

/**
 * Get the elements inside a specified range
 */
declare const getRange: (domain: string, start: number, stop: string, state: object) => any[];

/**
 * Returns if the list contains the specified value
 */
declare const contains: (domain: string, value: any, state: object) => boolean;

/**
 * Returns the number of times the value is inside the list
 */
declare const getOccurrencesOf: (domain: string, value: any, state: object) => number;
```