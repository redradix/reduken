import { HSET, HDEL, HMSET, HINCRBY, HTOGGLE } from './actionTypes'

/**
 * Sets a single value in a hash, specified by
 * domain and key
 * @param {String} domain
 * @param {String} keyPath
 * @param {any} value
 * @return {Object}
 */
export function hset(domain, keyPath, value) {
  return {
    type: HSET,
    payload: {
      path: [domain, keyPath].join('.'),
      value
    }
  }
}

export function hdel(domain, keyPath) {
  return {
    type: HDEL,
    payload: {
      path: [domain, keyPath].join('.')
    }
  }
}

/**
 * Merges a Javascript object in an existing hash
 * @param {String} domain
 * @param {Object} map
 * @return {Object}
 */
export function hmset(domain, map) {
  return {
    type: HMSET,
    payload: {
      path: domain,
      value: map
    }
  }
}

export function hincrby(domain, key, delta) {
  return {
    type: HINCRBY,
    payload: {
      path: [domain, key].join('.'),
      value: delta
    }
  }
}

/*
Toggles a Boolean key in a hash. If key is not present, it will assumed to
be false, so htoggle() will cause it to be true.
*/

export function htoggle(domain, key) {
  return {
    type: HTOGGLE,
    payload: {
      path: [domain, key].join('.')
    }
  }
}
