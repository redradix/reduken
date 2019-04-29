import { path } from 'ramda'

export const getRequestStatus = (domain: string, state: object): string =>
  path(['requests', domain, 'status'], state)

export const isRequestPending = (domain: string, state: object) => {
  return getRequestStatus(domain, state) === 'pending'
}

export const isRequestSucceeded = (domain: string, state: object) => {
  return getRequestStatus(domain, state) === 'ok'
}

export const getRequestError = (
  domain: string,
  state: object
): Error | null => {
  const status = getRequestStatus(domain, state)
  return status === 'error' ? path(['requests', domain, 'error'], state) : null
}
