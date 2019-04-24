# Entities

# Action creators

```ts
/**
 * Merges many entities at once
 */
declare function mergeEntities(entityMap: any[]): object;

/**
 * Removes multiple entities at once (of a single type/domain)
 */
declare function removeMany(domain: string, keys: string[]): object;

/**
 * Removes one entity by id
 */
declare function removeOne(domain: string, key: string): object;

/**
 * Removes all entities by domain
 */
declare function removeAll(domain: string): object;

/**
 * Clears the whole entity cache
 */
declare function reset(): object;

/**
 * Updates a field inside an entity
 */
declare function update(domain: string, id: string, data: any): object;
```

# Selectors

> **Note** that all selectors are currified

```ts
/**
 * Get all the entities as Object
 */
declare const getEntities: (state: string) => object;

/**
 * Get all entities for domain as an object
 */
declare const getDomain: (domain: string, state: object) => object;

/**
 * Get single entity from domain, by it's id
 */
declare const getById: (domain: string, id: string, state: object) => object;

/**
 * Get all entities for domain as an Array
 */
declare const getAll: (domain: string, state: object) => object[];

/**
 * Get the entities with specific ids in a domain
 */
declare const getSome: (domain: string, ids: string[], state: string) => object[];
```
