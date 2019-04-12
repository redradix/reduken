import * as ActionTypes from './actionTypes'

/**
 * Prepends an item to the list
 *
 * @param {String} domain
 * @param {any} value
 */
export function lprepend(domain, value) {
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
 *
 * @param {String} domain
 * @param {any} value
 */
export function lappend(domain, value) {
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
 *
 * @param {String} domain
 */
export function lshift(domain) {
  return {
    type: ActionTypes.LSHIFT,
    payload: {
      domain
    }
  }
}

/**
 * Removes the last value of list
 *
 * @param {String} domain
 */
export function lpop(domain) {
  return {
    type: ActionTypes.LPOP,
    payload: {
      domain
    }
  }
}

/**
 * Sets a value in a specific index of the list
 *
 * @param {String} domain
 * @param {Number} index
 * @param {any} value
 */
export function lset(domain, index, value) {
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
 *
 * @param {String} domain
 * @param {Array} elements
 */
export function lreplace(domain, elements) {
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
 *
 * @param {String} domain
 * @param {Number} count
 * @param {any} value
 */
export function lrem(domain, count, value) {
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
 *
 * @param {String} domain
 * @param {Number} start
 * @param {Number} stop
 */
export function ltrim(domain, start, stop = -1) {
  return {
    type: ActionTypes.LTRIM,
    payload: {
      domain,
      start,
      stop
    }
  }
}
