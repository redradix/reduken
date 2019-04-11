import buildReducer from '../lib/buildReducer'
import { mergeDeepRight, over, lensPath, omit, compose, defaultTo } from 'ramda'
import * as ActionTypes from './actionTypes'

const initialState = {}

const actionHandlers = {
  [ActionTypes.MERGE]: (state, { payload }) => {
    return mergeDeepRight(state, payload)
  },
  [ActionTypes.REMOVE]: (state, { payload }) => {
    const { domain, keys } = payload
    return over(lensPath([domain]), omit(keys), state)
  },
  [ActionTypes.REMOVE_ALL]: (state, { payload }) => {
    return omit([payload.domain], state)
  },
  [ActionTypes.RESET]: () => {
    return initialState
  },
  [ActionTypes.UPDATE]: (state, { payload }) => {
    const { domain, id, data } = payload
    return over(
      lensPath([domain, id]),
      compose(
        mergeDeepRight(data),
        defaultTo({})
      ),
      state
    )
  }
}

export default buildReducer(initialState, actionHandlers)
