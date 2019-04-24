import * as Selectors from '../selectors'

describe('Requests - Selectors', () => {
  const mockState = {
    requests: {
      pending: { status: 'pending', error: null },
      ok: { status: 'ok', error: null },
      error: { status: 'error', error: new Error('test error') }
    }
  }

  it('isRequestPending(domain, state) returns if the request still waiting', () => {
    const requestPending = Selectors.isRequestPending('pending', mockState)
    const requestOk = Selectors.isRequestPending('ok', mockState)

    expect(requestPending).toBeTruthy()
    expect(requestOk).toBeFalsy()
  })

  it('isRequestCompleted(domain, state) returns if the request ends OK', () => {
    const requestOk = Selectors.isRequestCompleted('ok', mockState)
    const requestPending = Selectors.isRequestCompleted('pending', mockState)

    expect(requestOk).toBeTruthy()
    expect(requestPending).toBeFalsy()
  })

  it('getRequestError(domain, state) gets the error in the request', () => {
    const requestError = Selectors.getRequestError('error', mockState)
    expect(requestError.message).toBe('test error')
  })

  it('getRequestError(domain, state) gets null if the request has no errors', () => {
    const requestError = Selectors.getRequestError('ok', mockState)
    expect(requestError).toBe(null)
  })
})
