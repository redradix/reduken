import * as ActionTypes from './actionTypes'

interface PaginationOptions {
  records: any[]
  page: number
  total?: number
  perPage?: number
}

export const updatePagination = (
  domain: string,
  options: PaginationOptions
) => {
  const { records, page, total, perPage } = options
  return {
    type: ActionTypes.UPDATE_PAGINATION,
    domain: domain,
    payload: { records, page, total, ...(perPage ? { perPage } : {}) }
  }
}

export const resetPagination = (
  domain: string,
  options: PaginationOptions
) => ({
  type: ActionTypes.RESET_PAGINATION,
  domain: domain,
  payload: options
})

export const goNextPage = (domain: string) => ({
  type: ActionTypes.GO_NEXT_PAGE,
  domain: domain
})

export const goPrevPage = (domain: string) => ({
  type: ActionTypes.GO_PREV_PAGE,
  domain: domain
})

export const goToPage = (domain: string, page: number) => ({
  type: ActionTypes.GO_TO_PAGE,
  payload: page,
  domain: domain
})

export const appendPage = (domain: string, page: number) => ({
  type: ActionTypes.APPEND_PAGE,
  payload: page,
  domain: domain
})
