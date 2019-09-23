import buildReducer from '../lib/buildReducer'
import {
  mergeDeepRight,
  over,
  lensPath,
  omit,
  compose,
  defaultTo,
  assocPath,
  mergeWith,
  mergeRight
} from 'ramda'
import * as ActionTypes from './actionTypes'

const initialState = {}

const actionHandlers = {
  [ActionTypes.MERGE_ENTITIES]: (state, { payload }) => {
    return mergeDeepRight(state, payload)
  },
  [ActionTypes.MERGE_ENTITY]: (state, { payload }) => {
    const { domain, id, data } = payload

    return over(
      lensPath([domain, id]),
      compose(
        mergeDeepRight(data),
        defaultTo({})
      ),
      state
    )
  },
  [ActionTypes.REMOVE]: (state, { payload }) => {
    const { domain, keys } = payload
    return over(lensPath([domain]), omit(keys), state)
  },
  [ActionTypes.REMOVE_ALL]: (state, { payload }) => {
    return omit([payload.domain], state)
  },
  [ActionTypes.CLEAR]: () => {
    return initialState
  },
  [ActionTypes.UPDATE_ENTITIES]: (state, { payload }) => {
    return mergeWith(mergeRight, state, payload)
  },
  [ActionTypes.UPDATE_ENTITY]: (state, { payload }) => {
    const { domain, id, data } = payload

    return R.pipe(
      R.ifElse(R.hasPath([domain]), R.identity, R.pipe(R.assoc(domain, {}))),
      R.assocPath([domain, id], data)
    )(state)
  }
}

export default buildReducer(initialState, actionHandlers)
