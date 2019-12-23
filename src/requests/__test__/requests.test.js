import reducer from '../reducer'
import * as Actions from '../actions'
import * as Selectors from '../selectors'

describe('Requests Module', () => {
  const initialState = {
    list: { status: 'pending', error: null },
  }

  it('Exports by default a reducer', () => {
    expect(reducer).toBeInstanceOf(Function)
  })

  it('startRequest(domain) puts a pending request in store', () => {
    const action = Actions.startRequest('users')
    const requests = reducer(initialState, action)

    expect(Selectors.isRequestPending('users', { requests })).toBe(true)
    expect(Selectors.getRequestError('users', { requests })).toBe(null)
  })

  it('endRequestSuccess(domain) puts ok status in a request', () => {
    const action = Actions.endRequestSuccess('list')
    const requests = reducer(initialState, action)

    expect(Selectors.isRequestSucceeded('list', { requests })).toBe(true)
    expect(Selectors.getRequestError('list', { requests })).toBe(null)
  })

  it('endRequestError(domain) put the error in the request status', () => {
    const action = Actions.endRequestError('list', new Error('test error'))
    const requests = reducer(initialState, action)

    expect(Selectors.getRequestStatus('list', { requests })).toBe('error')
    expect(Selectors.getRequestError('list', { requests })).toBeDefined()
  })

  it('removeRequest(domain) removes a request', () => {
    const action = Actions.removeRequest('list')
    const requests = reducer(initialState, action)

    expect(Selectors.getRequestStatus('list', { requests })).toBe(undefined)
  })
})
