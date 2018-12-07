import buildReducer from '../lib/buildReducer'
import * as ActionTypes from './actionTypes'
import {
  not,
  mergeDeepRight,
  dissocPath,
  assocPath,
  over,
  lensPath,
  is,
  add,
  always,
  ifElse,
  identity,
  compose
} from 'ramda'
export * from './actions'
export * from './selectors'

const reducer = buildReducer(
  {},
  {
    [ActionTypes.HSET]: (state, action) => {
      const { value, path } = action.payload
      return assocPath(path, value, state)
    },
    [ActionTypes.HDEL]: (state, action) => {
      const { path } = action.payload
      return dissocPath(path, state)
    },
    [ActionTypes.HMSET]: (state, action) => {
      const { value, path } = action.payload
      return over(lensPath(path), mergeDeepRight(value), state)
    },
    [ActionTypes.HINCRBY]: (state, action) => {
      const { value, path } = action.payload
      return over(
        lensPath(path),
        compose(
          add(value),
          ifElse(is(Number), identity, always(0))
        ),
        state
      )
    },
    [ActionTypes.HTOGGLE]: (state, action) => {
      const { path } = action.payload
      return over(lensPath(path), not, state)
    }
  }
)

export default reducer
