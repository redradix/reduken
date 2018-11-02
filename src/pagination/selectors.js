import { get } from 'lodash'

export const getCurrentPage = (state, domain) =>
  get(state, ['pagination', domain, 'page'], 1)

export const getTotal = (state, domain) =>
  get(state, ['pagination', domain, 'total'], 0)

export const getPerPage = (state, domain) =>
  get(state, ['pagination', domain, 'perPage'], 1)

export const getTotalPages = (state, domain) => {
  const total = getTotal(state, domain)
  const perPage = getPerPage(state, domain)
  return Math.ceil(total / perPage)
}

export const hasPage = (state, domain, pageN) =>
  pageN > 0 && pageN <= getTotalPages(state, domain)

export const hasNextPage = (state, domain) =>
  hasPage(state, domain, getCurrentPage(state, domain) + 1)

export const hasPrevPage = (state, domain) =>
  hasPage(state, domain, getCurrentPage(state, domain) - 1)

export const getResults = (state, domain) =>
  get(state, ['pagination', domain, 'records'], undefined)
