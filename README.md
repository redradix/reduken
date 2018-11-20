# Generic Reducers

Redis style structure as redux reducers
- [List](src/list/README.md)
- [Hash](src/hash/README.md)
- [Set](src/set/README.md)
- [Entities](src/entities/README.md)

Also two utilities available

- batchReducer
- buildReducer

## How-to
```js
import hash, {hset, hget} from 'reduken/hash'

hset('test', 'prop', 25)
...
hget('test', 'prop', state) // 25
```

You can also import as
```js
import {batchReducer, hash, list, set, entities} from 'reduken'


export default batchReducer(combineReducers({
  hash,
  list,
  set,
  entities
}))
```
