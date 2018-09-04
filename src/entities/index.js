import buildReducer from '../lib/buildReducer'
import omit from 'lodash.omit'
import {  get, set } from 'dot-prop-immutable'
import * as ActionTypes from './actionTypes'
export * from './actionTypes'
export * from './actions'
export * from './selectors'

const initialState = {}
const actions = {
  [ActionTypes.MERGE]: (state, { payload }) => {
    return Object.keys(payload).reduce((acc, domain) => {
      return {
        ...acc,
        [domain]: {
          ...acc[domain],
          ...payload[domain]
        }
      }
    }, state)
  },
  [ActionTypes.REMOVE]: (state, { payload }) => {
    const { domain, keys } = payload
    return {
      ...state,
      [domain]: omit(state[domain], keys)
    }
  },
  [ActionTypes.REMOVE_ALL]: (state, { payload }) => {
    return omit(state, payload.domain)
  },
  [ActionTypes.RESET]: () => {
    return initialState
  },
  [ActionTypes.UPDATE]: (state, { payload }) => {
    const { domain, id, data } = payload
    const existing = get(state, `${domain}.${id}`) || {}
    //console.log('Update existing', existing, data)
    const merged = {
      ...existing,
      ...data
    }
    return set(state, `${domain}.${id}`, merged)
  }
}


export default buildReducer(initialState, actions)
