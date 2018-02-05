import reducer from '../index'
import * as ActionTypes from '../actionTypes'

describe('List - Reducer', () => {
  it('Returns initial state', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('LPUSH inserts a value at the head (left) of a list', () => {
    const action = {
      type: ActionTypes.LPUSH,
      payload: {
        target: 'test',
        value: 25
      }
    }
    const res = reducer(undefined, action)
    expect(res.test.length).toBe(1)
    expect(res.test).toEqual([25])
  })

  it('RPUSH inserts a value at the tail (right) of a list', () => {
    const action = {
      type: ActionTypes.RPUSH,
      payload: {
        target: 'test',
        value: 'foo'
      }
    }
    const mockState = {
      test: ['bar']
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(2)
    expect(res.test).toEqual(['bar', 'foo'])
  })

  it('LPOP removes the leftmost element in a list', () => {
    const action = {
      type: ActionTypes.LPOP,
      payload: {
        target: 'test'
      }
    }
    const mockState = {
      test: ['foo', 'bar']
    }
    const newState = reducer(mockState, action)
    expect(newState.test).toHaveLength(1)
    expect(newState.test).toEqual(['bar'])
  })

  it('RPOP removes the leftmost element in a list', () => {
    const action = {
      type: ActionTypes.RPOP,
      payload: {
        target: 'test'
      }
    }
    const mockState = {
      test: ['foo', 'bar']
    }
    const newState = reducer(mockState, action)
    expect(newState.test).toHaveLength(1)
    expect(newState.test).toEqual(['foo'])
  })

  it('RPOP removes the rightmost element in a list', () => {})

  it('LSET inserts a value at the specified index', () => {
    const action = {
      type: ActionTypes.LSET,
      payload: {
        target: 'test',
        value: 4,
        index: 3
      }
    }
    const mockState = {
      test: [1, 2, 3, 5]
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(mockState.test.length)
    expect(res.test[3]).toBe(4)
  })

  it('LSET is a noop when index is out of bounds (and displays warning)', () => {
    const action = {
      type: ActionTypes.LSET,
      payload: {
        target: 'test',
        value: 5,
        index: 2
      }
    }
    const oldWarn = console.warn
    console.warn = jest.fn()
    const res = reducer(undefined, action)
    expect(console.warn).toHaveBeenCalled()
    console.warn = oldWarn
    expect(typeof res.test).toBe('undefined')
  })

  it('LREPLACE replaces a list with new elements (or creates an empty one)', () => {
    const replace = {
      type: ActionTypes.LREPLACE,
      payload: {
        target: 'test',
        elements: ['foo']
      }
    }
    let state = reducer(undefined, replace)
    expect(state.test).toEqual(['foo'])
    const empty = {
      type: ActionTypes.LREPLACE,
      payload: {
        target: 'test',
        elements: []
      }
    }
    state = reducer(state, empty)
    expect(state.test).toEqual([])
  })

  it('LREM(target, count=0, value) removes all occurences of a value in a list', () => {
    const action = {
      type: ActionTypes.LREM,
      payload: {
        target: 'test',
        count: 0,
        value: 'foo'
      }
    }
    const mockState = {
      test: ['foo', 'foo', 'bar', 'baz', 'test', 'foo', 'cachopo']
    }
    const res = reducer(mockState, action)
    expect(res.test.indexOf(action.payload.value)).toBe(-1)
  })

  it('LREM(target, count=N, value) removes first N occurences of a value in a list', () => {
    const action = {
      type: ActionTypes.LREM,
      payload: {
        target: 'test',
        count: 2,
        value: 'foo'
      }
    }
    const mockState = {
      test: ['foo', 'foo', 'bar', 'baz', 'test', 'foo', 'cachopo']
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(mockState.test.length - 2)
    expect(res.test.indexOf(action.payload.value)).toBe(3)
  })

  it('LREM(target, count=-N, value) removes last N occurences of a value in a list', () => {
    const action = {
      type: ActionTypes.LREM,
      payload: {
        target: 'test',
        count: -2,
        value: 'foo'
      }
    }
    const mockState = {
      test: ['foo', 'foo', 'bar', 'baz', 'test', 'foo', 'cachopo']
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(mockState.test.length - 2)
    expect(res.test.indexOf(action.payload.value)).toBe(0)
  })

  it('LTRIM(target, start, stop) trims an existing list using a range', () => {
    const action = {
      type: ActionTypes.LTRIM,
      payload: {
        target: 'test',
        start: 0,
        stop: 3
      }
    }
    const mockState = {
      test: 'abcdefghijklmnopqrstuvwuxyz'.split('')
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(4)
    expect(res.test).toEqual(mockState.test.slice(0, 4))
  })
})
