import { path } from 'ramda'

const getStatus = (domain: string, state: object) =>
  path(['requests', domain, 'status'], state)

export const isRequestPending = (domain: string, state: object) => {
  return getStatus(domain, state) === 'pending'
}

export const isRequestCompleted = (domain: string, state: object) => {
  return getStatus(domain, state) === 'ok'
}

export const getRequestError = (domain: string, state: object) => {
  const status = getStatus(domain, state)
  return status === 'error' ? path(['requests', domain, 'error'], state) : null
}
