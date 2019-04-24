# Batch

# Usage
TODO

# Action Creators
```ts
interface Action {
  type: string
  payload: object
}

export declare function batch(type: string, actions: Action[]): object
```