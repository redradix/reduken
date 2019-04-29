# Reduken

Redis style structures as redux reducers, actions and selectors.

![Downloads](https://badgen.net/npm/dt/reduken)
![Version](https://badgen.net/npm/v/reduken)
![License](https://badgen.net/npm/license/reduken)
![Dependencies](https://badgen.net/david/dep/redradix/reduken)
![Size](https://badgen.net/bundlephobia/min/reduken)

## Set-up with React & Redux

1. Install reduken
   ```bash
   npm install reduken
   ```
2. Set up redux reducers
   ```js
   import { combineReducers } from 'redux'
   import { entities, hash, list, pagination, enableBatching } from 'reduken'

    export default enableBatching(combineReducers({
      entities,
      hash,
      list,
      pagination
    }))
    ```

## Modules

- [Batch](src/batch/README.md)
- [Entities](src/entities/README.md)
- [Hash](src/hash/README.md)
- [List](src/list/README.md)
- [Pagination](src/pagination/README.md)
- [Requests](src/requests/README.md)

Also one utility available

- [buildReducer](src/lib/buildReducer.js)

## Full Example

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'

import { entities, hash, list, pagination, enableBatching } from 'reduken'
import { hset, hget } from 'reduken/hash'

// 1. Create store with the reduken reducers
const rootReducer = combineReducers({
  entities,
  hash,
  list,
  pagination
})
const store = createStore(enableBatching(rootReducer), window.__INITIAL_STATE__)

// 2. Presentational Component
const HelloComponent = ({ name, handleChange }) => {
  return (
    <div>
      <h1>Hello {name}</h1>
      <input type="text" onChange={handleChange} value={name} />
    </div>
  )
}

// 3. Decorate component with connect
const HelloDecorated = connect(
  state => ({
    name: hget('session', 'name', state) || 'World'
  }),
  {
    handleChange: event => hset('session', 'name', event.target.value)
  }
)(HelloComponent)

// 4. Render the app
ReactDOM.render(
  <Provider store={store}>
    <HelloDecorated />
  </Provider>,
  document.getElementById('root')
)
```
