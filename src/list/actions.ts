import * as ActionTypes from './actionTypes'

/**
 * Prepends an item to the list
 */
export function lprepend(domain: string, value: any) {
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
export function lappend(domain: string, value: any) {
  return {
    type: ActionTypes.LAPPEND,
    payload: {
      domain,
      value
    }
  }
}

/**
 * Removes the first value of list
 */
export function lshift(domain: string) {
  return {
    type: ActionTypes.LSHIFT,
    payload: {
      domain
    }
  }
}

/**
 * Removes the last value of list
 */
export function lpop(domain: string) {
  return {
    type: ActionTypes.LPOP,
    payload: {
      domain
    }
  }
}

/**
 * Sets a value in a specific index of the list
 */
export function lset(domain: string, index: number, value: any) {
  return {
    type: ActionTypes.LSET,
    payload: {
      domain,
      index,
      value
    }
  }
}

/**
 * Replaces all the list elements with new ones
 */
export function lreplace(domain: string, elements: any[]) {
  return {
    type: ActionTypes.LREPLACE,
    payload: {
      domain,
      elements
    }
  }
}

/**
 * Removes n occurrences of the value in the list
 */
export function lrem(domain: string, count: number, value: any) {
  return {
    type: ActionTypes.LREM,
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
export function ltrim(domain: string, start: number, stop: number = -1) {
  return {
    type: ActionTypes.LTRIM,
    payload: {
      domain,
      start,
      stop
    }
  }
}
