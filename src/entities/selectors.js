import map from 'lodash/map'
import curry from 'lodash/curry'

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
export const getAll = curry((domain, state) =>
  map(getDomain(domain, state), value => value)
)
