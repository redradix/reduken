import * as R from 'ramda'
import buildReducer from '../lib/buildReducer'
import * as ActionTypes from './actionTypes'
import { alwaysStringPath } from './utils'

const initialState = {}

const actionHandlers = {
  [ActionTypes.SET]: (state, action) => {
    const { value, path } = action.payload
    const stringPath = alwaysStringPath(path)

    return R.assocPath(stringPath, value, state)
  },
  [ActionTypes.REMOVE]: (state, action) => {
    const { path } = action.payload
    const stringPath = alwaysStringPath(path)

    return R.dissocPath(stringPath, state)
  },
  [ActionTypes.MERGE]: (state, action) => {
    const { value, path } = action.payload
    const stringPath = alwaysStringPath(path)

    return R.over(R.lensPath(stringPath), R.mergeDeepLeft(value), state)
  },
  [ActionTypes.INCREMENT_BY]: (state, action) => {
    const { value, path } = action.payload
    const stringPath = alwaysStringPath(path)

    return R.over(
      R.lensPath(stringPath),
      R.pipe(R.ifElse(R.is(Number), R.identity, R.always(0)), R.add(value)),
      state,
    )
  },
  [ActionTypes.TOGGLE]: (state, action) => {
    const { path } = action.payload
    const stringPath = alwaysStringPath(path)

    return R.over(R.lensPath(stringPath), R.not, state)
  },
}

export default buildReducer(initialState, actionHandlers)
