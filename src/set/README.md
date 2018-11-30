# Set

## API

# Action creators

* sadd(name, value)
* srem(name, value)
* sunion(target, ...sets)
* sdiff(target, ...sets)
* sinter(target, ...sets)
* smove(target, source, value)

# Selectors

> **Note** that all selectors are currified

* scard(name, state)
* sisMember(name, value, state)
* smembers(name, state)
* srand(name, state)
