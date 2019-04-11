import { HSET, HDEL, HMSET, HINCRBY, HTOGGLE } from './actionTypes'

/**
 * Sets a single value in a hash, specified by
 * domain and keys
 *
 * @param {String} domain
 * @param {Array} keys
 * @param {any} value
 * @return {Object}
 */
export function hset(domain, keys, value) {
  return {
    type: HSET,
    payload: {
      path: [domain, ...keys],
      value
    }
  }
}

/**
 * Deletes the value containing in a specified domain
 * and keys
 *
 * @param {String} domain
 * @param {Array} keys
 * @return {Object}
 */
export function hdel(domain, keys) {
  return {
    type: HDEL,
    payload: {
      path: [domain, ...keys]
    }
  }
}

/**
 * Merges a Javascript object in an existing hash
 *
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

/**
 * Increments the value inside a domain and keys
 * by delta
 *
 * @param {String} domain
 * @param {Array} keys
 * @param {Number} delta
 * @return {Object}
 */
export function hincrby(domain, keys, delta = 1) {
  return {
    type: HINCRBY,
    payload: {
      path: [domain, ...keys],
      value: delta
    }
  }
}

/**
 * Toggles a Boolean key in a hash. If key is not present, it will assumed to
 * be false, so htoggle() will cause it to be true.
 *
 * @param {String} domain
 * @param {Array} keys
 */
export function htoggle(domain, keys) {
  return {
    type: HTOGGLE,
    payload: {
      path: [domain, ...keys]
    }
  }
}
