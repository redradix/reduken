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

function lrem(list = [], count = 0, value) {
  if (count === 0) {
    return list.filter(item => item !== value)
  } else {
    const fn = count < 0 ? removeLastOccurrence : removeFirstOccurrence
    const functions = repeat(fn(value), Math.abs(count))
    return pipe(...functions)(list)
  }
}

const actionHandlers = {
  [ActionTypes.PREPEND]: (state, action) => {
    const { target, value } = action.payload
    const prevItems = propOr([], target, state)
    return assoc(target, [value, ...prevItems], state)
  },
  [ActionTypes.LAPPEND]: (state, action) => {
    const { target, value } = action.payload
    const prevItems = propOr([], target, state)
    return assoc(target, [...prevItems, value], state)
  },
  [ActionTypes.LSHIFT]: (state, action) => {
    const { target } = action.payload
    const newList = propOr([], target, state)
    return assoc(target, tail(newList), state)
  },
  [ActionTypes.LPOP]: (state, action) => {
    const { target } = action.payload
    const list = propOr([], target, state)
    return assoc(target, init(list), state)
  },
  [ActionTypes.LSET]: (state, action) => {
    const { target, value, index } = action.payload
    const prevItems = propOr([], target, state)
    return assoc(target, update(index, value, prevItems), state)
  },
  [ActionTypes.LREPLACE]: (state, action) => {
    const { target, elements } = action.payload
    return assoc(target, [...elements], state)
  },
  [ActionTypes.LREM]: (state, action) => {
    const { target, count, value } = action.payload
    const prevItems = propOr([], target, state)
    return assoc(target, lrem(prevItems, count, value), state)
  },
  [ActionTypes.LTRIM]: (state, action) => {
    const { target, start, stop } = action.payload
    const prevItems = propOr([], target, state)
    return assoc(target, slice(start, stop + 1, prevItems), state)
  }
}

export default buildReducer(initialState, actionHandlers)
