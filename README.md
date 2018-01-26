# Hash Reducer

Redis style hash structure as a redux reducer

## How-to
```
import {hset, hget} from 'hash-reducer'

hset('test', 'prop', 25)
...
hget('test', 'prop', state) // 25
```
