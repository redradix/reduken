import * as ActionTypes from './actionTypes'

/**
 * Prepends an item to the list
 */
export function prepend(domain: string, value: any) {
  return {
    type: ActionTypes.PREPEND,
    payload: {
      domain,
      value
    }
  }
}

/**
 * Appends an item in the right of the list
 */
export function append(domain: string, value: any) {
  return {
    type: ActionTypes.APPEND,
    payload: {
      domain,
      value
    }
  }
}

/**
 * Removes the first value of list
 */
export function shift(domain: string) {
  return {
    type: ActionTypes.SHIFT,
    payload: {
      domain
    }
  }
}

/**
 * Removes the last value of list
 */
export function pop(domain: string) {
  return {
    type: ActionTypes.POP,
    payload: {
      domain
    }
  }
}

/**
 * Replaces a value in a specific index of the list
 */
export function replaceOne(domain: string, index: number, value: any) {
  return {
    type: ActionTypes.REPLACE_ONE,
    payload: {
      domain,
      index,
      value
    }
  }
}

/**
 * Replaces all the domain elements with new ones
 */
export function replaceDomain(domain: string, elements: any[]) {
  return {
    type: ActionTypes.REPLACE_DOMAIN,
    payload: {
      domain,
      elements
    }
  }
}

/**
 * Removes n occurrences of the value in the list
 */
export function removeOccurrences(domain: string, count: number, value: any) {
  return {
    type: ActionTypes.REMOVE_OCCURRENCES,
    payload: {
      domain,
      count,
      value
    }
  }
}

/**
 * Removes all the elements in the list except of the ones
 * included in the specified range
 */
export function trim(domain: string, start: number, stop: number = -1) {
  return {
    type: ActionTypes.TRIM,
    payload: {
      domain,
      start,
      stop
    }
  }
}
