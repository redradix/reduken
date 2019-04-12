# List

## Action creators

```ts
lprepend(domain: string, value: any)

lappend(domain: string, value: any)

lshift(domain: string)

lpop(domain: string)

lset(domain: string, index: number, value: any)

lreplace(domain: string, elements: any[])

lrem(domain: string, count: number, value: any)

ltrim(domain: string, start: number, stop: number)
```

## Selectors

> **Note** that all selectors are currified

```ts
getList(domain: string, state: object)

llen(domain: string, state: object)

lget(domain: string, index: number, state: object)

lrange(domain: string, start: number, stop: number, state: object)
```