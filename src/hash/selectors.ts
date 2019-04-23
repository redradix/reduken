import { path, curry, pathOr, keys, length, hasPath } from 'ramda'

const EMPTY_OBJECT = {}

/**
 * Get a single property from a hash
 */
export const hget: (
  domain: string,
  keys: string[],
  state: object
) => any = curry((domain, keys, state) => {
  return path(['hash', domain, ...keys], state)
})

/**
 * Get all the domain content
 */
export const hgetall: (domain: string, state: object) => any[] = curry(
  (domain, state) => {
    return path(['hash', domain], state)
  }
)

/**
 * Get the keys of the domain
 */
export const hkeys: (domain: string, state: object) => string[] = curry(
  (domain, state) => {
    return keys(pathOr(EMPTY_OBJECT, ['hash', domain], state))
  }
)

/**
 * Get the domain length
 */
export const hlen: (domain: string, state: object) => number = curry(
  (domain, state) => {
    return length(hkeys(domain, state))
  }
)

/**
 * Returns if there's a value inside a domain
 * and keys
 */
export const hexists: (
  domain: string,
  keys: string[],
  state: object
) => boolean = curry((domain, keys, state) => {
  return hasPath(['hash', domain, ...keys], state)
})
