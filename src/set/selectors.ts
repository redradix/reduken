import { curry } from 'ramda'

const root = state => state.set

const emptySet = []

const getSet: (domain: string, state: object) => any[] = curry(
  (domain, state) => root(state)[domain] || emptySet
)

/**
 * Returns how many items the set contains
 */
export const scard: (domain: string, state: object) => number = curry(
  (domain, state) => {
    return getSet(domain, state).length
  }
)

/**
 * Returns if the value is inside the domain set
 */
export const sisMember: (
  domain: string,
  value: any,
  state: object
) => boolean = curry((domain, value, state) => {
  const set = getSet(domain, state)
  return set.indexOf(value) > -1
})

/**
 * Gets all the items inside a domain set
 */
export const smembers: (domain: string, state: object) => any[] = curry(
  (domain, state) => {
    return getSet(domain, state)
  }
)

/**
 * Get a random item inside the domain set
 */
export const srand: (domain: string, state: object) => any = curry(
  (domain, state) => {
    const set = getSet(domain, state)
    const idx = Math.floor(Math.random() * set.length)
    return set[idx]
  }
)
