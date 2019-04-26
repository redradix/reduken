# Batch

Batch allows you create higher order actions wrapping more than one actions in one. It allow you to have a nice debug of redux dispatches in the Redux DevTools.

## Usage

The batch reducer receives the root reducer and returns a new root reducer.

```js

import { enableBatching } from 'reduken'

const rootReducer = combineReducers({
  ...reducers
})

const store = createStore(enableBatching(rootReducer), initialState, middlewares)

```

## Action Creators
```ts

interface Action {
  type: string
  payload: object
}

declare function batchActions(type: string, actions: Action[]): object

```