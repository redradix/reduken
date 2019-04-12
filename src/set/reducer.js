import buildReducer from '../lib/buildReducer'
import * as ActionTypes from './actionTypes'
import {
  assoc,
  propOr,
  difference,
  flatten,
  intersection,
  isEmpty
} from 'ramda'

const initialState = {}

const sadd = (prevItems, items) => new Set([...prevItems, ...items])

const srem = (prevItems, items) => {
  const newItems = new Set(prevItems)
  items.forEach(item => newItems.delete(item))
  return newItems
}

const actionHandlers = {
  [ActionTypes.SADD]: (state, action) => {
    const { domain, items } = action.payload
    const prevItems = propOr([], domain, state)
    const newItems = sadd(prevItems, items)

    return assoc(domain, Array.from(newItems), state)
  },
  [ActionTypes.SREM]: (state, action) => {
    const { domain, items = [] } = action.payload
    const prevItems = propOr([], domain, state)
    const newItems = srem(prevItems, items)

    return assoc(domain, Array.from(newItems), state)
  },
  [ActionTypes.SUNION]: (state, action) => {
    const { sources, domain } = action.payload

    const items = sources.reduce((acc, source) => {
      const sourceItems = propOr([], source, state)
      return [...acc, ...sourceItems]
    }, [])

    const newItems = new Set(items)
    return assoc(domain, Array.from(newItems), state)
  },
  [ActionTypes.SDIFF]: (state, action) => {
    const { sources, domain } = action.payload

    const [first, ...rest] = sources.map(source => propOr([], source, state))
    const items = difference(first, flatten(rest))

    return assoc(domain, items, state)
  },
  [ActionTypes.SINTER]: (state, action) => {
    const { sources, domain } = action.payload

    const sourceItems = sources.map(source => propOr([], source, state))

    const items = sourceItems.reduce((acc, item) => {
      const res = intersection(acc, item)
      return isEmpty(acc) ? item : res
    }, [])

    return assoc(domain, items, state)
  },
  [ActionTypes.SMOVE]: (state, action) => {
    const { source, domain, items } = action.payload

    if (!state[source]) {
      throw new Error(`SMOVE - source set ${source} does not exist`)
    }

    return {
      ...state,
      [source]: [...srem(state[source], items)],
      [domain]: [...sadd(state[domain], items)]
    }
  }
}

export default buildReducer(initialState, actionHandlers)
