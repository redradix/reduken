import { SET, REMOVE, MERGE, INCREMENT_BY, TOGGLE } from './actionTypes'
import { safetyArray } from './utils'

/**
 * Sets a single value in a hash, specified by
 * domain and keys
 */
export function set(domain: string, keys: string | string[], value: any) {
  return {
    type: SET,
    payload: {
      path: [domain, ...safetyArray(keys)],
      value,
    },
  }
}

/**
 * Deletes the value containing in a specified domain
 * and keys
 */
export function remove(domain: string, keys: string | string[]) {
  return {
    type: REMOVE,
    payload: {
      path: [domain, ...safetyArray(keys)],
    },
  }
}

/**
 * Merges a Javascript object in an existing hash
 */
export function merge(domain: string, keys: string, map: object) {
  return {
    type: MERGE,
    payload: {
      path: [domain, ...safetyArray(keys)],
      value: map,
    },
  }
}

/**
 * Increments the value inside a domain and keys by delta
 */
export function incrementBy(
  domain: string,
  keys: string | string[],
  delta: number,
) {
  return {
    type: INCREMENT_BY,
    payload: {
      path: [domain, ...safetyArray(keys)],
      value: delta,
    },
  }
}

/**
 * Toggles a Boolean key in a hash. If key is not present, it will assumed to
 * be false, so htoggle() will cause it to be true.
 */
export function toggle(domain: string, keys: string | string[]) {
  return {
    type: TOGGLE,
    payload: {
      path: [domain, ...safetyArray(keys)],
    },
  }
}
