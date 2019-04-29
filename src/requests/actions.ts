import { SET_REQUEST_STATUS, REMOVE_REQUEST_STATUS } from './actionTypes'

export const startRequest = (domain: string) => ({
  type: SET_REQUEST_STATUS,
  domain,
  payload: { status: 'pending', error: null }
})

export const endRequestSuccess = (domain: string) => ({
  type: SET_REQUEST_STATUS,
  domain,
  payload: { status: 'ok', error: null }
})

export const endRequestError = (domain: string, error: Error) => ({
  type: SET_REQUEST_STATUS,
  domain,
  payload: { status: 'error', error }
})

export const removeRequest = (domain: string) => ({
  type: REMOVE_REQUEST_STATUS,
  domain
})
