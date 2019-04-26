# Batch

Batch allows you create higher order actions wrapping more than one actions in one. It allow you to have a nice debug of redux dispatches in the Redux DevTools.

## Usage

The batch reducer receives the root reducer and returns a new root reducer.

```js

import { batch } from 'reduken'

const rootReducer = batch(combineReducers({
  ...reducers
}))

const store = createStore(rootReducer, initialState, middlewares)

```

## Action Creators
```ts

interface Action {
  type: string
  payload: object
}

declare function batch(type: string, actions: Action[]): object

```