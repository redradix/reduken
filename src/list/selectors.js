import { curry, propOr, nth } from 'ramda'

const root = state => state.list

const EMPTY_ARRAY = []

/**
 * Get all the elements in a list
 *
 * @param {String} target
 * @param {Object} state
 * @returns {Object}
 */
export const getList = curry((target, state) =>
  propOr(EMPTY_ARRAY, target, root(state))
)

/**
 * Get length of a list
 *
 * @param {String} target
 * @param {Object} state
 * @returns {Number}
 */
export const len = curry((target, state) => getList(target, state).length || 0)

/**
 * Get the element in a specified position inside the list
 *
 * @param {String} target
 * @param {Number} index
 * @param {Object} state
 * @returns {any}
 */
export const lget = curry((target, index, state) => {
  const data = getList(target, state)
  return nth(index, data)
})

/**
 * Get the elements inside a specified range
 *
 * @param {String} target
 * @param {Number} start
 * @param {Number} end
 * @param {Object} state
 * @returns {Array}
 */
export const lrange = curry((target, start, stop, state) => {
  const data = getList(target, state)
  return data.slice(start, stop)
})
