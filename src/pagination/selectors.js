import { propOr } from 'ramda'

export const getCurrentPage = (domain, state) =>
  propOr(1, ['pagination', domain, 'page'], state)

export const getTotal = (domain, state) =>
  propOr(0, ['pagination', domain, 'total'], state)

export const getPerPage = (domain, state) =>
  propOr(1, ['pagination', domain, 'perPage'], state)

export const getTotalPages = (domain, state) => {
  const total = getTotal(domain, state)
  const perPage = getPerPage(domain, state)
  return Math.ceil(total / perPage)
}

export const hasPage = (domain, pageN, state) =>
  pageN > 0 && pageN <= getTotalPages(domain, state)

export const hasNextPage = (domain, state) =>
  hasPage(domain, getCurrentPage(domain, state) + 1, state)

export const hasPrevPage = (domain, state) =>
  hasPage(domain, getCurrentPage(domain, state) - 1, state)

export const getResults = (domain, state) =>
  propOr(undefined, ['pagination', domain, 'records'], state)
