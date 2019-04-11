import { curry, includes, toString, values } from 'ramda'

const EMPTY_OBJECT = {}

/**
 * Get all the entities as Object
 *
 * @param {Object} state
 * @returns {Object}
 */
export const getEntities = curry(state => state.entities)

/**
 * Get all entities for domain as an object
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {Object}
 */
export const getDomain = curry(
  (domain, state) => getEntities(state)[domain] || EMPTY_OBJECT
)

/**
 * Get single entity from domain, by it's id
 *
 * @param {String} domain
 * @param {String} id
 * @param {Sbject} state
 * @returns {Sbject}
 */
export const getById = curry(
  (domain, id, state) => getDomain(domain, state)[id]
)

/**
 * Get all entities for domain as an Array
 *
 * @param {String} domain
 * @param {Object} state The global state
 * @returns {Array}
 */
export const getAll = curry((domain, state) => {
  const entities = getDomain(domain, state)
  return values(entities)
})

/**
 * Get the entities with specific ids in a domain
 *
 * @param {String} domain
 * @param {Array} ids
 * @param {Object} state The global state
 * @returns {Array}
 */
export const getSome = curry((domain, ids, state) => {
  const stringIds = ids.map(toString)
  const entities = getDomain(domain, state)
  return Object.keys(entities)
    .filter(key => {
      return includes(key, stringIds)
    })
    .map(key => entities[key])
})
