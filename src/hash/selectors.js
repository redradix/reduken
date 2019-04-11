import { path, curry, pathOr, keys, length, hasPath } from 'ramda'
import { module } from './constants'

const EMPTY_OBJECT = {}

/**
 * Get a single property from a hash
 * @param {String} domain
 * @param {Array} keys
 * @param {Object} state
 * @returns {any}
 */
export const hget = curry((domain, keys, state) => {
  return path([module, domain, ...keys], state)
})

/**
 * Get all the domain content
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {any}
 */
export const hgetall = curry((domain, state) => {
  return path([module, domain], state)
})

/**
 * Get the keys of the domain
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {Array}
 */
export const hkeys = curry((domain, state) => {
  return keys(pathOr(EMPTY_OBJECT, [module, domain], state))
})

/**
 * Get the domain length
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {Number}
 */
export const hlen = curry((domain, state) => {
  return length(hkeys(domain, state))
})

/**
 * Returns if there's a value inside a domain
 * and keys
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {Array}
 */
export const hexists = curry((domain, keys, state) => {
  return hasPath([module, domain, ...keys], state)
})
