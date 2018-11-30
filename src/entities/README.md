# Entities

## API

# Action creators

* mergeEntities(entityMap)
* update(domain, id, data)
* removeOne(domain, key)
* removeMany(domain, keys)
* removeAll(domain)
* reset()

# Selectors

> **Note** that all selectors are currified

* getEntities(state)
* getDomain(domain, state)
* getById(domain, id, state)
* getAll(domain, state)
* getSome(domain, ids, state)
