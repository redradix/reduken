import { curry, propOr, nth, pipe, equals, filter, length } from 'ramda'

const root = state => state.list

const EMPTY_ARRAY = []

/**
 * Get all the elements in a list
 */
export const getList: (
  domain: string,
  state: object,
) => any[] = curry((domain, state) => propOr(EMPTY_ARRAY, domain, root(state)))

/**
 * Get the element in a specified position inside the list
 */
export const getByIndex: (
  domain: string,
  index: number,
  state: object,
) => any = curry((domain, index, state) => {
  const data = getList(domain, state)
  return nth(index, data)
})

/**
 * Get the elements inside a specified range
 */
export const getRange: (
  domain: string,
  start: number,
  stop: string,
  state: object,
) => any[] = curry((domain, start, stop, state) => {
  const data = getList(domain, state)
  return data.slice(start, stop)
})

/**
 * Returns if the list contains the specified value
 */
export const contains: (
  domain: string,
  value: any,
  state: object,
) => boolean = curry((domain, value, state) => {
  const data = getList(domain, state)
  return data.includes(value)
})

/**
 * Returns the index of the first occurrence
 */
export const getIndexOf: (
  domain: string,
  value: any,
  state: object,
) => number = curry((domain, value, state) => {
  const data = getList(domain, state)
  return data.indexOf(value)
})

/**
 * Returns the number of times the value is inside the list
 */
export const getOccurrencesOf: (
  domain: string,
  value: any,
  state: object,
) => number = curry((domain, value, state) => {
  const data = getList(domain, state)

  return pipe(filter(equals(value)), length)(data)
})
