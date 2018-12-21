import { curry, includes, toString, values } from 'ramda'

const EMPTY_OBJECT = {}

// root state selector
export const getEntities = curry(state => state.entities)
// get all entities for domain as an object
export const getDomain = curry(function(domain, state) {
  return getEntities(state)[domain] || EMPTY_OBJECT
})
// get single entity from domain, by its id
export const getById = curry(function(domain, id, state) {
  return getDomain(domain, state)[id]
})
// get all entities as an array
export const getAll = curry((domain, state) => {
  const entities = getDomain(domain, state)
  return values(entities)
})

export const getSome = curry((domain, ids, state) => {
  const stringIds = ids.map(toString)
  const entities = getDomain(domain, state)
  return Object.keys(entities)
    .filter(key => {
      return includes(key, stringIds)
    })
    .map(key => entities[key])
})
