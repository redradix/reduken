# List

## API

# Action creators

* lprepend(target, value)
* lappend(target, value)
* lshift(target)
* lpop(target)
* lset(target, index, value)
* lreplace(target, elements)
* lrem(target, count, value)
* ltrim(target, start, stop)

# Selectors

> **Note** that all selectors are currified

* getList(list, state)
* len(target, state)
* lget(target, index, state)
* lrange(target, start, stop, state)
