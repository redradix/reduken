import { path, curry, pathOr, keys, length, hasPath } from 'ramda'
import { safetyArray } from './utils'

const EMPTY_OBJECT = {}

/**
 * Get a single property from a hash
 */
export const getFromPath: (
  domain: string,
  path: string[],
  state: object
) => any = curry((domain, path, state) => {
  return path(['hash', domain, ...safetyArray(path)], state)
})

/**
 * Get all the domain content
 */
export const getDomain: (domain: string, state: object) => any[] = curry(
  (domain, state) => {
    return path(['hash', domain], state)
  }
)

/**
 * Get the keys of the domain
 */
export const getKeys: (domain: string, state: object) => string[] = curry(
  (domain, state) => {
    return keys(pathOr(EMPTY_OBJECT, ['hash', domain], state))
  }
)

/**
 * Get the domain length
 */
export const getDomainLength: (domain: string, state: object) => number = curry(
  (domain, state) => {
    return length(getKeys(domain, state))
  }
)

/**
 * Returns if there's a value inside a domain
 * and keys
 */
export const existInPath: (
  domain: string,
  path: string[],
  state: object
) => boolean = curry((domain, path, state) => {
  return hasPath(['hash', domain, ...safetyArray(path)], state)
})
