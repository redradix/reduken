# Hash

## API

# Action creators

* hset(domain, keyPath, value)
* hdel(domain, keyPath)
* hmset(domain, map)
* hincrby(domain, key, delta)
* htoggle(domain, key)


# Selectors

> **Note** that all selectors are currified

* hget(hash, key, state)
* hgetAll(hash, state)
* hkeys(hash, state)
* hlen(hash, state)
* hexists(hash, key, state)
