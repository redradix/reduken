import { path as getPath, curry, pathOr, keys, length, hasPath } from 'ramda'
import { alwaysArray } from './utils'

const EMPTY_OBJECT = {}

/**
 * Get a single property from a hash
 */
export const getFromPath: (
  path: string[],
  state: object,
) => any = curry((path, state) => {
  return getPath(['hash',...alwaysArray(path)], state)
})

/**
 * Get all the domain content
 */
export const getDomain: (domain: string, state: object) => any[] = curry(
  (state) => {
    return getPath(['hash'], state)
  },
)

/**
 * Get the keys of the domain
 */
export const getKeys: (domain: string, state: object) => string[] = curry(
  (domain, state) => {
    return keys(pathOr(EMPTY_OBJECT, ['hash', domain], state))
  },
)

/**
 * Get the domain length
 */
export const getDomainLength: (domain: string, state: object) => number = curry(
  (domain, state) => {
    return length(getKeys(domain, state))
  },
)

/**
 * Returns if there's a value inside a domain
 * and keys
 */
export const existInPath: (
  domain: string,
  path: string[],
  state: object,
) => boolean = curry((domain, path, state) => {
  return hasPath(['hash', domain, ...alwaysArray(path)], state)
})
