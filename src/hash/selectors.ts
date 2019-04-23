import { path, curry, pathOr, keys, length, hasPath } from 'ramda'
import { module } from './constants'

const EMPTY_OBJECT = {}

/**
 * Get a single property from a hash
 */
export const hget = curry((domain: string, keys: string[], state: object) => {
  return path([module, domain, ...keys], state)
})

/**
 * Get all the domain content
 */
export const hgetall = curry((domain: string, state: object) => {
  return path([module, domain], state)
})

/**
 * Get the keys of the domain
 */
export const hkeys = curry((domain: string, state: object) => {
  return keys(pathOr(EMPTY_OBJECT, [module, domain], state))
})

/**
 * Get the domain length
 */
export const hlen = curry((domain: string, state: object) => {
  return length(hkeys(domain, state))
})

/**
 * Returns if there's a value inside a domain
 * and keys
 */
export const hexists = curry(
  (domain: string, keys: string[], state: object) => {
    return hasPath([module, domain, ...keys], state)
  }
)
