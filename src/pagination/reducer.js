import { propOr, lensProp, set, assoc, lensPath, over } from 'ramda'
import * as actionTypes from './actionTypes'
import buildReducer from '../lib/buildReducer'

const cleanState = ({ perPage }) => ({
  records: [],
  page: 1,
  total: 0,
  perPage: perPage || 20
})

const actionHandlers = {
  [actionTypes.UPDATE_PAGINATION]: (state, { domain, payload }) => {
    // merge pagination results (useful for infinite scrolling)
    const { records: newRecords = [] } = payload
    const { records: oldRecords = [], ...data } = propOr({}, domain, state)
    const records = [...new Set([...oldRecords, ...newRecords])]
    return set(
      lensProp(domain),
      {
        ...data,
        ...payload,
        records
      },
      state
    )
  },
  [actionTypes.RESET_PAGINATION]: (
    state,
    { domain, payload = { perPage: 20 } }
  ) => {
    return assoc(domain, cleanState(payload), state)
  },
  [actionTypes.APPEND_PAGE]: (state, { domain, payload }) => {
    const page = payload
    return set(lensPath([domain, 'page']), page, state)
  },
  [actionTypes.GO_TO_PAGE]: (state, { domain, payload }) => {
    const page = payload
    return { ...state, [domain]: { ...state[domain], page, records: [] } }
  },
  [actionTypes.GO_NEXT_PAGE]: (state, { domain }) => {
    return over(
      lensProp(domain),
      pagination => ({
        ...pagination,
        page: pagination.page + 1,
        records: []
      }),
      state
    )
  },
  [actionTypes.GO_PREV_PAGE]: (state, { domain }) => {
    return over(
      lensProp(domain),
      pagination => ({
        ...pagination,
        page: pagination.page == 1 ? 1 : pagination.page - 1,
        records: []
      }),
      state
    )
  }
}

const initialState = {}

export default buildReducer(initialState, actionHandlers)
