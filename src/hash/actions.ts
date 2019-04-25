import { HSET, HDEL, HMSET, HINCRBY, HTOGGLE } from './actionTypes'
import { path } from 'ramda'

/**
 * Sets a single value in a hash, specified by
 * domain and keys
 */
export function hset(domain: string, keys: string[], value: any) {
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
 */
export function hdel(domain: string, keys: string[]) {
  return {
    type: HDEL,
    payload: {
      path: [domain, ...keys]
    }
  }
}

/**
 * Merges a Javascript object in an existing hash
 */
export function hmset(path: string, map: object) {
  return {
    type: HMSET,
    payload: {
      path,
      value: map
    }
  }
}

/**
 * Increments the value inside a domain and keys
 * by delta
 */
export function hincrby(domain: string, keys: string[], delta: number) {
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
 */
export function htoggle(domain: string, keys: string[]) {
  return {
    type: HTOGGLE,
    payload: {
      path: [domain, ...keys]
    }
  }
}
