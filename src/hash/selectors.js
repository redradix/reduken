import { path, curry, pathOr, keys, length, hasPath } from 'ramda'
import { module } from './constants'

const EMPTY_OBJECT = {}

/**
 * Returns a single property from a hash
 * @param {Object} state Redux state
 * @param {String} hash  Hash key
 * @param {String} key   Key string or key path (xx.yy.zzz)
 */
export const hget = curry(function hget(domain, keys, state) {
  return path([module, domain, ...keys], state)
})

export const hgetall = curry(function(domain, state) {
  return path([module, domain], state)
})

export const hkeys = curry(function hkeys(domain, state) {
  return keys(pathOr(EMPTY_OBJECT, [module, domain], state))
})

export const hlen = curry(function hlen(domain, state) {
  return length(hkeys(domain, state))
})

export const hexists = curry(function hexists(domain, keys, state) {
  return hasPath([module, domain, ...keys], state)
})
