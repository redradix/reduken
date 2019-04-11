import reducer from '../reducer'
import * as ActionTypes from '../actionTypes'

describe('Set - Reducer', () => {
  it('Returns initial state', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('SADD adds multiple elements to the set avoiding duplications', () => {
    const action = {
      type: ActionTypes.SADD,
      payload: {
        name: 'test',
        items: [1, 2, 3]
      }
    }
    const res = reducer(undefined, action)
    expect(res.test.length).toBe(3)
    expect(res.test.indexOf(1)).toBeGreaterThan(-1)
    expect(res.test.indexOf(2)).toBeGreaterThan(-1)
    expect(res.test.indexOf(3)).toBeGreaterThan(-1)
    const res2 = reducer(res, action)
    // no duplicates
    expect(res.test.length).toBe(3)
  })

  it('SREM removes multiple elements from a set', () => {
    const action = {
      type: ActionTypes.SREM,
      payload: {
        name: 'test',
        items: [1, 2, 3]
      }
    }
    const mockState = {
      test: [1, 2, 3, 4, 5]
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(2)
  })

  it('SDIFF calculates the set difference and stores it in a new set', () => {
    const action = {
      type: ActionTypes.SDIFF,
      payload: {
        sources: ['test1', 'test2', 'test3'],
        target: 'test4'
      }
    }
    const mockState = {
      test1: ['a', 'b', 'c', 'd'],
      test2: ['c'],
      test3: ['a', 'c', 'e']
    }
    const res = reducer(mockState, action)
    expect(res.test4.length).toBe(2)
    expect(res.test4.indexOf('d')).toBeGreaterThan(-1)
    expect(res.test4.indexOf('b')).toBeGreaterThan(-1)
    expect(res.test4.indexOf('a')).toBe(-1)
  })

  it('SUNION calculates the union of multiple sets and stores it in a new set', () => {
    const action = {
      type: ActionTypes.SUNION,
      payload: {
        sources: ['test1', 'test2'],
        target: 'test3'
      }
    }
    const mockState = {
      test1: ['John', 'Cobra'],
      test2: ['Will', 'Cobra', 'Smith']
    }
    const res = reducer(mockState, action)
    expect(res.test3.length).toBe(4)
  })

  it('SINTER calculates the intersection of multiple sets and stores it in a new set', () => {
    const action = {
      type: ActionTypes.SINTER,
      payload: {
        sources: ['test1', 'test2', 'test3'],
        target: 'test4'
      }
    }
    const mockState = {
      test1: 'abcd'.split(''),
      test2: ['c'],
      test3: 'ace'.split('')
    }
    const res = reducer(mockState, action)
    expect(res.test4.length).toBe(1)
    expect(res.test4).toEqual(['c'])
  })

  it('SINTER exits early if any of the sources is an empty set', () => {
    const action = {
      type: ActionTypes.SINTER,
      payload: {
        sources: ['test1', 'test2'],
        target: 'test3'
      }
    }
    const mockState = {
      test1: 'abcde'.split(),
      test2: []
    }
    const res = reducer(mockState, action)
    expect(res.test3.length).toBe(0)
  })

  it('SMOVE moves an element from a source set to a target set', () => {
    const action = {
      type: ActionTypes.SMOVE,
      payload: {
        source: 'test1',
        target: 'test2',
        value: 100
      }
    }
    const mockState = {
      test1: [100, 101],
      test2: []
    }
    const res = reducer(mockState, action)
    expect(res.test1).toEqual([101])
    expect(res.test2).toEqual([100])
  })

  it('SMOVE throws if source set does not exist', () => {
    const action = {
      type: ActionTypes.SMOVE,
      payload: {
        source: 'test1',
        target: 'test2',
        value: 'FOO'
      }
    }
    expect(() => {
      reducer(undefined, action)
    }).toThrowError(/source set/)
  })
})
