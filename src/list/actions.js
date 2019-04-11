import * as ActionTypes from './actionTypes'

/**
 * Prepends an item to the list
 *
 * @param {String} target
 * @param {any} value
 */
export function lprepend(target, value) {
  return {
    type: ActionTypes.PREPEND,
    payload: {
      target,
      value
    }
  }
}

/**
 * Appends an item in the right of the list
 *
 * @param {String} target
 * @param {any} value
 */
export function lappend(target, value) {
  return {
    type: ActionTypes.LAPPEND,
    payload: {
      target,
      value
    }
  }
}

/**
 * Removes the first value of list
 *
 * @param {String} target
 */
export function lshift(target) {
  return {
    type: ActionTypes.LSHIFT,
    payload: {
      target
    }
  }
}

/**
 * Removes the last value of list
 *
 * @param {String} target
 */
export function lpop(target) {
  return {
    type: ActionTypes.LPOP,
    payload: {
      target
    }
  }
}

/**
 * Sets a value in a specific index of the list
 *
 * @param {String} target
 * @param {Number} index
 * @param {any} value
 */
export function lset(target, index, value) {
  return {
    type: ActionTypes.LSET,
    payload: {
      target,
      index,
      value
    }
  }
}

/**
 * Replaces all the list elements with new ones
 *
 * @param {String} target
 * @param {Array} elements
 */
export function lreplace(target, elements) {
  return {
    type: ActionTypes.LREPLACE,
    payload: {
      target,
      elements
    }
  }
}

/**
 * Removes n occurrences of the value in the list
 *
 * @param {String} target
 * @param {Number} count
 * @param {any} value
 */
export function lrem(target, count, value) {
  return {
    type: ActionTypes.LREM,
    payload: {
      target,
      count,
      value
    }
  }
}

/**
 * Removes all the elements in the list except of the ones
 * included in the specified range
 *
 * @param {String} target
 * @param {Number} start
 * @param {Number} stop
 */
export function ltrim(target, start, stop = -1) {
  return {
    type: ActionTypes.LTRIM,
    payload: {
      target,
      start,
      stop
    }
  }
}
