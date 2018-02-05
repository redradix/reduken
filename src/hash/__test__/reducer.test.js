import reducer from '../index'
import * as ActionTypes from '../actionTypes'

describe('Hash Reducer', () => {
  it('Returns initial state when called with undefined', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('HSET sets a single value in a hash', () => {
    const action = {
      type: ActionTypes.HSET,
      payload: {
        path: 'test.foo',
        value: 1
      }
    }
    const res = reducer(undefined, action)
    expect(res.test.foo).toBe(action.payload.value)
  })

  it('HSET sets a single value in a deep path', () => {
    const action = {
      type: ActionTypes.HSET,
      payload: {
        path: 'test.foo.bar.baz',
        value: 25
      }
    }
    const res = reducer(undefined, action)
    expect(res.test.foo.bar.baz).toBe(action.payload.value)
  })

  it('HDEL removes a key from a hash', () => {
    const action = {
      type: ActionTypes.HDEL,
      payload: {
        path: 'test.foo'
      }
    }
    const state = {
      test: {
        foo: 'bar'
      }
    }
    const res = reducer(state, action)
    expect(res.test).not.toHaveProperty('foo')
  })

  it('HMSET merges an object at given path', () => {
    const action = {
      type: ActionTypes.HMSET,
      payload: {
        path: 'test.foo',
        value: {
          name: 'Test',
          number: 100
        }
      }
    }
    const initialState = {
      test: {
        foo: {
          existing: 'test'
        }
      }
    }
    const res = reducer(initialState, action)
    expect(res.test.foo.name).toBe(action.payload.value.name)
    expect(res.test.foo.number).toBe(action.payload.value.number)
    expect(res.test.foo.existing).toBe(initialState.test.foo.existing)
  })

  it('HINCRBY increments a key in a given hash', () => {
    const action = {
      type: ActionTypes.HINCRBY,
      payload: {
        path: 'test.foo',
        value: 1
      }
    }
    let res = reducer(undefined, action)
    expect(res.test.foo).toBe(1)
    res = reducer(res, action)
    res = reducer(res, action)
    res = reducer(res, action)
    expect(res.test.foo).toBe(4)
  })

  it('HINCRYBY increments a non numeric key by setting it to the value', () => {
    const initialState = {
      test: {
        foo: 'string'
      }
    }
    const action = {
      type: ActionTypes.HINCRBY,
      payload: {
        path: 'test.foo',
        value: 1
      }
    }
    const res = reducer(initialState, action)
    expect(res.test.foo).toBe(1)
  })

  it('HTOGGLE toggles a key in a given hash', () => {
    const action = {
      type: ActionTypes.HTOGGLE,
      payload: {
        path: 'test.bool',
        defaultValue: false
      }
    }
    let res = reducer(undefined, action)
    expect(res.test.bool).toBe(true)
    res = reducer(res, action)
    expect(res.test.bool).toBe(false)
  })
})
