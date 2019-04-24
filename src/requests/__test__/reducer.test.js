import * as Actions from '../actions'
import reducer from '../reducer'

describe('Requests module', () => {
  const initialState = {
    list: { status: 'pending', error: null }
  }

  it('Exports by default a reducer', () => {
    expect(reducer).toBeInstanceOf(Function)
  })

  it('startRequest(domain) puts a pending request in store', () => {
    const action = Actions.startRequest('users')
    const state = reducer(initialState, action)

    expect(state.users).toBeDefined()
    expect(state.users.status).toBe('pending')
    expect(state.users.error).toBe(null)
  })

  it('requestOk(domain) puts ok status in a request', () => {
    const action = Actions.requestOk('list')
    const state = reducer(initialState, action)

    expect(state.list.status).toBe('ok')
    expect(state.list.error).toBe(null)
  })

  it('requestError(domain) put the error in the request status', () => {
    const action = Actions.requestError('list', new Error('test error'))
    const state = reducer(initialState, action)

    expect(state.list.status).toBe('error')
    expect(state.list.error).toBeDefined()
  })

  it('removeRequest(domain) removes a request', () => {
    const action = Actions.removeRequest('list')
    const state = reducer(initialState, action)

    expect(state.list).toBe(undefined)
  })
})
