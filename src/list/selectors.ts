import { curry, propOr, nth } from 'ramda'

const root = state => state.list

const EMPTY_ARRAY = []

/**
 * Get all the elements in a list
 */
export const getList: (domain: string, state: object) => object[] = curry(
  (domain, state) => propOr(EMPTY_ARRAY, domain, root(state))
)

/**
 * Get length of a list
 */
export const llen: (domain: string, state: object) => number = curry(
  (domain, state) => getList(domain, state).length || 0
)

/**
 * Get the element in a specified position inside the list
 */
export const lget: (
  domain: string,
  index: number,
  state: object
) => any = curry((domain, index, state) => {
  const data = getList(domain, state)
  return nth(index, data)
})

/**
 * Get the elements inside a specified range
 */
export const lrange: (
  domain: string,
  start: number,
  stop: string,
  state: object
) => any[] = curry((domain, start, stop, state) => {
  const data = getList(domain, state)
  return data.slice(start, stop)
})
