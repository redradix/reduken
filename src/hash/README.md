# Hash

## Action creators

```ts
hset(domain: string, keys: string[], value: any): object

hdel(domain: string, keys: string[]): object

hmset(domain: string, map: object): object

hincrby(domain: string, keys: string[], delta: number | 1): object

htoggle(domain: string, keys: string[]): object
```


## Selectors

> **Note** that all selectors are currified

```ts
hget(hash: string, keys: string[], state: object): any

hgetall(hash: string, state: object): object

hkeys(hash: string, state: object): string[]

hlen(hash: string, state: object): number

hexists(hash: string, keys: string[], state: object): boolean
```

