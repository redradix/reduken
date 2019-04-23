import { propOr } from 'ramda'

export const getCurrentPage = (domain: string, state: object): number =>
  propOr(1, ['pagination', domain, 'page'], state)

export const getTotal = (domain: string, state: object): number =>
  propOr(0, ['pagination', domain, 'total'], state)

export const getPerPage = (domain: string, state: object): number =>
  propOr(1, ['pagination', domain, 'perPage'], state)

export const getTotalPages = (domain: string, state: object): number => {
  const total = getTotal(domain, state)
  const perPage = getPerPage(domain, state)
  return Math.ceil(total / perPage)
}

export const hasPage = (
  domain: string,
  pageN: number,
  state: object
): boolean => pageN > 0 && pageN <= getTotalPages(domain, state)

export const hasNextPage = (domain: string, state: object): boolean =>
  hasPage(domain, getCurrentPage(domain, state) + 1, state)

export const hasPrevPage = (domain: string, state: object): boolean =>
  hasPage(domain, getCurrentPage(domain, state) - 1, state)

export const getResults = (domain: string, state: object): any[] =>
  propOr(undefined, ['pagination', domain, 'records'], state)
