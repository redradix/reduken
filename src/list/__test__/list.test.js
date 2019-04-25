import reducer from '../reducer'
import * as ActionTypes from '../actionTypes'

import * as Actions from '../actions'
import * as Selectors from '../selectors'

describe('List Module', () => {
  it('Returns initial state', () => {
    const list = reducer(undefined, { type: 'FOO' })
    expect(list).toEqual({})
  })

  it('LPREPEND inserts a value at the head (left) of a list', () => {
    const mockState = {
      test: ['bar']
    }

    const action = Actions.lprepend('test', 'foo')
    const list = reducer(mockState, action)

    expect(Selectors.llen('test', { list })).toBe(2)
    expect(Selectors.getList('test', { list })).toEqual(['foo', 'bar'])
  })

  it('LAPPEND inserts a value at the tail (right) of a list', () => {
    const mockState = {
      test: ['foo']
    }

    const action = Actions.lappend('test', 'bar')
    const list = reducer(mockState, action)

    expect(Selectors.llen('test', { list })).toBe(2)
    expect(Selectors.getList('test', { list })).toEqual(['foo', 'bar'])
  })

  it('LSHIFT removes the leftmost element in a list', () => {
    const mockState = {
      test: ['foo', 'bar']
    }

    const action = Actions.lshift('test')
    const list = reducer(mockState, action)

    expect(Selectors.getList('test', { list })).toHaveLength(1)
    expect(Selectors.getList('test', { list })).toEqual(['bar'])
  })

  it('LPOP removes the leftmost element in a list', () => {
    const mockState = {
      test: ['foo', 'bar']
    }

    const action = Actions.lpop('test')
    const list = reducer(mockState, action)

    expect(Selectors.getList('test', { list })).toHaveLength(1)
    expect(Selectors.getList('test', { list })).toEqual(['foo'])
  })

  it('LSET inserts a value at the specified index', () => {
    const mockState = {
      test: [1, 2, 3, 5]
    }

    const action = Actions.lset('test', 3, 4)
    const list = reducer(mockState, action)

    expect(Selectors.llen('test', { list })).toBe(mockState.test.length)
    expect(Selectors.lget('test', 3, { list })).toBe(4)
  })

  it('LSET is a noop when index is out of bounds', () => {
    const action = Actions.lset('test', 2, 5)
    const list = reducer(undefined, action)

    expect(Selectors.getList('test', { list })).toEqual([])
  })

  it('LREPLACE replaces a list with new elements (or creates an empty one)', () => {
    const replace = Actions.lreplace('test', ['foo'])
    let list = reducer(undefined, replace)
    expect(Selectors.getList('test', { list })).toEqual(['foo'])

    const empty = Actions.lreplace('test', [])
    list = reducer(list, empty)
    expect(Selectors.getList('test', { list })).toEqual([])
  })

  it('LREM(domain, count=0, value) removes all occurrences of a value in a list', () => {
    const mockState = {
      test: ['foo', 'foo', 'bar', 'baz', 'test', 'foo', 'cachopo']
    }
    const action = Actions.lrem('test', 0, 'foo')
    const list = reducer(mockState, action)

    expect(Selectors.lcontains('test', 'foo', { list })).toBe(false)
  })

  it('LREM(domain, count=N, value) removes first N occurrences of a value in a list', () => {
    const mockState = {
      test: ['foo', 'foo', 'bar', 'baz', 'test', 'foo', 'cachopo']
    }
    const action = Actions.lrem('test', 2, 'foo')
    const list = reducer(mockState, action)

    expect(Selectors.loccurrences('test', 'foo', { list })).toBe(1)
    expect(Selectors.llen('test', { list })).toBe(mockState.test.length - 2)
    expect(Selectors.lpos('test', 'foo', { list })).toBe(3)
  })

  it('LREM(domain, count=-N, value) removes last N occurrences of a value in a list', () => {
    const action = {
      type: ActionTypes.LREM,
      payload: {
        domain: 'test',
        count: -2,
        value: 'foo'
      }
    }
    const mockState = {
      test: ['foo', 'foo', 'bar', 'baz', 'test', 'foo', 'cachopo']
    }
    const list = reducer(mockState, action)

    expect(Selectors.loccurrences('test', 'foo', { list })).toBe(1)
    expect(Selectors.llen('test', { list })).toBe(mockState.test.length - 2)
    expect(Selectors.lpos('test', 'foo', { list })).toBe(0)
  })

  it('LTRIM(domain, start, stop) trims an existing list using a range', () => {
    const mockState = {
      test: 'abcdefghijklmnopqrstuvwuxyz'.split('')
    }
    const action = Actions.ltrim('test', 0, 3)
    const list = reducer(mockState, action)

    expect(Selectors.llen('test', { list })).toBe(4)
    expect(Selectors.getList('test', { list })).toEqual(
      mockState.test.slice(0, 4)
    )
  })
})
