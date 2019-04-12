# Set

> Primitive Types are Strings, Numbers and Booleans

## Action creators

```ts
sadd(domain: string, value: primitives | primitives[])

srem(domain: string, value: primitives | primitives[])

sunion(domain: string, sources: string[])

sdiff(domain: string, sources: string[])

sinter(domain: string, sources: string[])

smove(domain: string, source, value: primitives | primitives[])
```

## Selectors

> **Note** that all selectors are currified

```ts
scard(domain: string, state: object)

sisMember(domain: string, value: primitives, state: object)

smembers(domain: string, state: object)

srand(domain: string, state: object)
```