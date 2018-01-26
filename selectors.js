import curry from 'lodash/curry'
import { get } from 'dot-prop-immutable'

const EMPTY_OBJECT = {}
const root = state => state.hash

/**
 * Returns a single property from a hash
 * @param {Object} state Redux state
 * @param {String} hash  Hash key
 * @param {String} key   Key string or key path (xx.yy.zzz)
 */
export const hget = curry(function hget(hash, key, state) {
  const data = root(state)
  return get(data, [hash, key].join('.'))
})

export const hgetAll = curry(function(hash, state) {
  const data = root(state)
  return get(data, hash)
})

export const hkeys = curry(function hkeys(hash, state) {
  return Object.keys(get(root(state), hash) || EMPTY_OBJECT)
})

export const hlen = curry(function hlen(hash, state) {
  return hkeys(hash, state).length
})

export const hexists = curry(function hexists(hash, key, state) {
  return Boolean(get(root(state), [hash, key].join('.')))
})
