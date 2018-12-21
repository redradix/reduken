import * as ActionTypes from './actionTypes'
import { formatWithOptions } from 'util'

export const updatePagination = (domain, payload) => {
  const { records, page, total, perPage } = payload
  return {
    type: ActionTypes.UPDATE_PAGINATION,
    domain: domain,
    payload: { records, page, total, ...(perPage ? { perPage } : {}) }
  }
}

export const resetPagination = (domain, options) => ({
  type: ActionTypes.RESET_PAGINATION,
  domain: domain,
  payload: options
})

export const goNextPage = domain => ({
  type: ActionTypes.GO_NEXT_PAGE,
  domain: domain
})

export const goPrevPage = domain => ({
  type: ActionTypes.GO_PREV_PAGE,
  domain: domain
})

export const goToPage = (domain, page) => ({
  type: ActionTypes.GO_TO_PAGE,
  payload: page,
  domain: domain
})

export const appendPage = (domain, page) => ({
  type: ActionTypes.APPEND_PAGE,
  payload: page,
  domain: domain
})
