import { curry } from 'ramda'

const root = state => state.set

const emptySet = []
const getSet = curry((domain, state) => root(state)[domain] || emptySet)

/**
 * Returns how many items the set contains
 *
 * @param {string} domain
 * @param {object} state
 */
export const scard = curry((domain, state) => {
  return getSet(domain, state).length
})

/**
 * Returns if the value is inside the domain set
 *
 * @param {string} domain
 * @param {primitive} value
 * @param {object} state
 */
export const sisMember = curry((domain, value, state) => {
  const set = getSet(domain, state)
  return set.indexOf(value) > -1
})

/**
 * Gets all the items inside a domain set
 *
 * @param {string} domain
 * @param {object} state
 */
export const smembers = curry((domain, state) => {
  return getSet(domain, state)
})

/**
 * Get a random item inside the domain set
 *
 * @param {string} domain
 * @param {object} state
 */
export const srand = curry((domain, state) => {
  const set = getSet(domain, state)
  const idx = Math.floor(Math.random() * set.length)
  return set[idx]
})
