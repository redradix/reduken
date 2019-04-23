import { curry, includes, toString, values } from 'ramda'

const EMPTY_OBJECT: object = {}

/**
 * Get all the entities as Object
 */
export const getEntities: (state: string) => object = curry(
  state => state.entities
)

/**
 * Get all entities for domain as an object
 */
export const getDomain: (domain: string, state: object) => object = curry(
  (domain, state) => getEntities(state)[domain] || EMPTY_OBJECT
)

/**
 * Get single entity from domain, by it's id
 */
export const getById: (
  domain: string,
  id: string,
  state: object
) => object = curry((domain, id, state) => getDomain(domain, state)[id])

/**
 * Get all entities for domain as an Array
 */
export const getAll: (domain: string, state: object) => object[] = curry(
  (domain, state) => {
    const entities = getDomain(domain, state)
    return values(entities)
  }
)

/**
 * Get the entities with specific ids in a domain
 */
export const getSome: (
  domain: string,
  ids: string[],
  state: string
) => object[] = curry((domain, ids, state) => {
  const stringIds = ids.map(toString)
  const entities = getDomain(domain, state)
  return Object.keys(entities)
    .filter(key => {
      return includes(key, stringIds)
    })
    .map(key => entities[key])
})
