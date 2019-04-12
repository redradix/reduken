import { curry, propOr, nth } from 'ramda'

const root = state => state.list

const EMPTY_ARRAY = []

/**
 * Get all the elements in a list
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {Object}
 */
export const getList = curry((domain, state) =>
  propOr(EMPTY_ARRAY, domain, root(state))
)

/**
 * Get length of a list
 *
 * @param {String} domain
 * @param {Object} state
 * @returns {Number}
 */
export const llen = curry((domain, state) => getList(domain, state).length || 0)

/**
 * Get the element in a specified position inside the list
 *
 * @param {String} domain
 * @param {Number} index
 * @param {Object} state
 * @returns {any}
 */
export const lget = curry((domain, index, state) => {
  const data = getList(domain, state)
  return nth(index, data)
})

/**
 * Get the elements inside a specified range
 *
 * @param {String} domain
 * @param {Number} start
 * @param {Number} end
 * @param {Object} state
 * @returns {Array}
 */
export const lrange = curry((domain, start, stop, state) => {
  const data = getList(domain, state)
  return data.slice(start, stop)
})
