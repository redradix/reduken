import { set, get, update } from 'lodash'
import * as actionTypes from './actionTypes'

export * from './actions'
export * from './selectors'
export * from './actionTypes'

const cleanState = () => ({
  record: [],
  page: 1,
  total: 0,
  perPage: 20
})

const ACTION_HANDLERS = {
  [actionTypes.UPDATE_PAGINATION]: (state, { domain, payload }) => {
    // merge pagination results (useful for infinite scrolling)
    const { records: newRecords = [] } = payload
    const { records: oldRecords = [] } = get(state, domain, {})
    const records = [...oldRecords, ...newRecords]
    return update({ ...state }, domain, (data = {}) => ({
      ...data,
      ...payload,
      records
    }))
  },
  [actionTypes.RESET_PAGINATION]: (state, { domain }) => {
    return set(state, domain, cleanState())
  },
  [actionTypes.GO_TO_PAGE]: (state, { domain, payload }) => {
    const page = payload
    return {
      ...state,
      [domain]: { ...state[domain], page, records: [] }
    }
  },
  [actionTypes.APPEND_PAGE]: (state, { domain, payload }) => {
    const page = payload
    return { ...state, [domain]: { ...state[domain], page } }
  },
  [actionTypes.GO_NEXT_PAGE]: (state, { domain }) => {
    const {
      [domain]: { page }
    } = state
    return {
      ...state,
      [domain]: { ...state[domain], page: page + 1, records: [] }
    }
  },
  [actionTypes.GO_PREV_PAGE]: (state, { domain }) => {
    const {
      [domain]: { page }
    } = state
    return {
      ...state,
      [domain]: { ...state[domain], page: page - 1, records: [] }
    }
  }
}

const initialState = {}

export default function paginationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
