import { SET, REMOVE, MERGE, INCREMENT_BY, TOGGLE } from './actionTypes'
import { alwaysArray } from './utils'

/**
 * Sets a single value in a hash, specified by
 * domain and keys
 */
export function set(keys: string | string[], value: any) {
  return {
    type: SET,
    payload: {
      path: [...alwaysArray(keys)],
      value,
    },
  }
}

/**
 * Deletes the value containing in a specified domain
 * and keys
 */
export function remove(keys: string | string[]) {
  return {
    type: REMOVE,
    payload: {
      path: [...alwaysArray(keys)],
    },
  }
}

/**
 * Merges a Javascript object in an existing hash
 */
export function merge(keys: string | string[], map: object) {
  return {
    type: MERGE,
    payload: {
      path: [...alwaysArray(keys)],
      value: map,
    },
  }
}

/**
 * Increments the value inside a domain and keys by delta
 */
export function incrementBy(keys: string | string[], delta: number) {
  return {
    type: INCREMENT_BY,
    payload: {
      path: [...alwaysArray(keys)],
      value: delta,
    },
  }
}

/**
 * Toggles a Boolean key in a hash. If key is not present, it will assumed to
 * be false, so htoggle() will cause it to be true.
 */
export function toggle(keys: string | string[]) {
  return {
    type: TOGGLE,
    payload: {
      path: [...alwaysArray(keys)],
    },
  }
}
