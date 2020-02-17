import { curry, includes, toString } from 'ramda'

const EMPTY_OBJECT: object = {}

/**
 * Get all the entities as Object
 */
export const getEntities: (state: object) => object[] = curry(
  state => state.entities,
)

/**
 * Get all entities for domain as an object
 */
export const getDomain: (domain: string, state: object) => object[] = curry(
  (domain, state) => getEntities(state)[domain] || EMPTY_OBJECT,
)

/**
 * Get single entity from domain, by it's id
 */
export const getOne: (
  domain: string,
  id: string,
  state: object,
) => object = curry((domain, id, state) => getDomain(domain, state)[id])

/**
 * Get the entities with specific ids in a domain
 */
export const getSome: (
  domain: string,
  ids: string[],
  state: object,
) => object[] = curry((domain, ids, state) => {
  const stringIds = ids.map(String)
  const entities = getDomain(domain, state)

  return Object.keys(entities)
    .filter(key => {
      return includes(key, stringIds)
    })
    .map(key => entities[key])
})

/**
 * Get ids of the entities inside a domain
 */
export const getIds: (domain: string, state: object) => string[] = curry(
  (domain, state) => {
    const entities = getDomain(domain, state)
    return Object.keys(entities) || []
  },
)
