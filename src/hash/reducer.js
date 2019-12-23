import {
  not,
  mergeDeepLeft,
  dissocPath,
  assocPath,
  over,
  lensPath,
  is,
  add,
  always,
  ifElse,
  identity,
  compose,
} from 'ramda'
import buildReducer from '../lib/buildReducer'
import * as ActionTypes from './actionTypes'

const initialState = {}

const actionHandlers = {
  [ActionTypes.SET]: (state, action) => {
    const { value, path } = action.payload
    return assocPath(path, value, state)
  },
  [ActionTypes.REMOVE]: (state, action) => {
    const { path } = action.payload
    return dissocPath(path, state)
  },
  [ActionTypes.MERGE]: (state, action) => {
    const { value, path } = action.payload
    return over(lensPath(path), mergeDeepLeft(value), state)
  },
  [ActionTypes.INCREMENT_BY]: (state, action) => {
    const { value, path } = action.payload
    return over(
      lensPath(path),
      compose(add(value), ifElse(is(Number), identity, always(0))),
      state,
    )
  },
  [ActionTypes.TOGGLE]: (state, action) => {
    const { path } = action.payload
    return over(lensPath(path), not, state)
  },
}

export default buildReducer(initialState, actionHandlers)
