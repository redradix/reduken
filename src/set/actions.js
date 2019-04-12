import * as ActionTypes from './actionTypes'

/**
 * Adds one or multiple elements to the set avoiding duplications
 *
 * @param {string} domain
 * @param {primitives | primitives[]} value
 */
export function sadd(domain, value) {
  const items = [].concat(value)

  return {
    type: ActionTypes.SADD,
    payload: {
      domain,
      items
    }
  }
}

/**
 * Removes one or multiple elements from a set
 *
 * @param {string} domain
 * @param {primitives | primitives[]} value
 */
export function srem(domain, value) {
  const items = [].concat(value)

  return {
    type: ActionTypes.SREM,
    payload: {
      domain,
      items
    }
  }
}

/**
 * Calculates the union of multiple sets and stores it in a new set
 *
 * @param {string} domain
 * @param {string[]} sources
 */
export function sunion(domain, sources) {
  return {
    type: ActionTypes.SUNION,
    payload: {
      domain,
      sources
    }
  }
}

/**
 * Calculates the set difference between multiple sets and stores
 * it in a new set
 *
 * @param {string} domain
 * @param {string[]} sources
 */
export function sdiff(domain, sources) {
  return {
    type: ActionTypes.SDIFF,
    payload: {
      sources,
      domain
    }
  }
}

/**
 * Calculates the intersection of multiple sets and stores it in a
 * new set
 *
 * @param {string} domain
 * @param {string[]} sources
 */
export function sinter(domain, sources) {
  return {
    type: ActionTypes.SINTER,
    payload: {
      sources,
      domain
    }
  }
}

/**
 * Moves an element from a source set to a domain set
 *
 * @param {string} domain
 * @param {string} source
 * @param {primitives | primitives[]} value
 */
export function smove(domain, source, value) {
  const items = [].concat(value)

  return {
    type: ActionTypes.SMOVE,
    payload: {
      domain,
      source,
      items
    }
  }
}
