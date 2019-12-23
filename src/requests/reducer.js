import { assoc, dissoc } from 'ramda'
import buildReducer from '../lib/buildReducer'
import { SET_REQUEST_STATUS, REMOVE_REQUEST_STATUS } from './actionTypes'

const initialState = {}

const actionHandlers = {
  [SET_REQUEST_STATUS]: (state, { payload, domain }) => {
    const { status, error } = payload
    return assoc(domain, { status, error }, state)
  },
  [REMOVE_REQUEST_STATUS]: (state, { domain }) => {
    return dissoc(domain, state)
  },
}

export default buildReducer(initialState, actionHandlers)
