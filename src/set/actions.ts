import * as ActionTypes from './actionTypes'

/**
 * Adds one or multiple elements to the set avoiding duplications
 */
export function sadd(domain: string, value: any) {
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
 */
export function srem(domain: string, value: any) {
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
 */
export function sunion(domain: string, sources: string[]) {
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
 */
export function sdiff(domain: string, sources: string[]) {
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
 */
export function sinter(domain: string, sources: string[]) {
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
 */
export function smove(domain: string, source: string, value: any) {
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
