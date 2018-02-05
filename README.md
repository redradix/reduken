# Generic Reducers

Redis style structure as redux reducers
- List
- Hash
- Set
- Entities

Also two utilities available

- batchReducer
- buildReducer

## How-to
```
import hash, {hset, hget} from 'reduken/hash'

hset('test', 'prop', 25)
...
hget('test', 'prop', state) // 25
```

You can also import as
```
import {batchReducer, hash, list, set, entities} from 'reduken'


export default batchReducer(combineReducers({
  hash,
  list,
  set,
  entities
}))
```

