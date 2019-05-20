import buildReducer from '../lib/buildReducer'
import {
  assoc,
  propOr,
  tail,
  init,
  update,
  slice,
  remove,
  repeat,
  pipe
} from 'ramda'
import * as ActionTypes from './actionTypes'

const initialState = {}

const removeFirstOccurrence = value => list =>
  remove(list.indexOf(value), 1, list)

const removeLastOccurrence = value => list =>
  remove(list.lastIndexOf(value), 1, list)

function removeNOccurrences(list = [], count = 0, value) {
  if (count === 0) {
    return list.filter(item => item !== value)
  } else {
    const fn = count < 0 ? removeLastOccurrence : removeFirstOccurrence
    const functions = repeat(fn(value), Math.abs(count))
    return pipe(...functions)(list)
  }
}

const actionHandlers = {
  [ActionTypes.UNSHIFT]: (state, action) => {
    const { domain, value } = action.payload
    const prevItems = propOr([], domain, state)
    return assoc(domain, [value, ...prevItems], state)
  },
  [ActionTypes.PUSH]: (state, action) => {
    const { domain, value } = action.payload
    const prevItems = propOr([], domain, state)
    return assoc(domain, [...prevItems, value], state)
  },
  [ActionTypes.SHIFT]: (state, action) => {
    const { domain } = action.payload
    const newList = propOr([], domain, state)
    return assoc(domain, tail(newList), state)
  },
  [ActionTypes.POP]: (state, action) => {
    const { domain } = action.payload
    const list = propOr([], domain, state)
    return assoc(domain, init(list), state)
  },
  [ActionTypes.REPLACE_ONE]: (state, action) => {
    const { domain, value, index } = action.payload
    const prevItems = propOr([], domain, state)
    return assoc(domain, update(index, value, prevItems), state)
  },
  [ActionTypes.REPLACE_DOMAIN]: (state, action) => {
    const { domain, elements } = action.payload
    return assoc(domain, [...elements], state)
  },
  [ActionTypes.REMOVE_OCCURRENCES]: (state, action) => {
    const { domain, count, value } = action.payload
    const prevItems = propOr([], domain, state)
    return assoc(domain, removeNOccurrences(prevItems, count, value), state)
  },
  [ActionTypes.TRIM]: (state, action) => {
    const { domain, start, stop } = action.payload
    const prevItems = propOr([], domain, state)
    return assoc(domain, slice(start, stop + 1, prevItems), state)
  }
}

export default buildReducer(initialState, actionHandlers)
