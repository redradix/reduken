import reducer from '../reducer'
import * as actions from '../actions'

describe('Set - Reducer', () => {
  it('Returns initial state', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('SADD adds multiple elements to the set avoiding duplications', () => {
    const action = actions.sadd('test', [1, 2, 3])

    const res = reducer(undefined, action)
    expect(res.test.length).toBe(3)
    expect(res.test.indexOf(1)).toBeGreaterThan(-1)
    expect(res.test.indexOf(2)).toBeGreaterThan(-1)
    expect(res.test.indexOf(3)).toBeGreaterThan(-1)

    reducer(res, action)
    // no duplicates
    expect(res.test.length).toBe(3)
  })

  it('SREM removes multiple elements from a set', () => {
    const action = actions.srem('test', [1, 2, 3])

    const mockState = {
      test: [1, 2, 3, 4, 5]
    }
    const res = reducer(mockState, action)
    expect(res.test.length).toBe(2)
  })

  it('SDIFF calculates the set difference and stores it in a new set', () => {
    const action = actions.sdiff('test4', ['test1', 'test2', 'test3'])

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
    const action = actions.sunion('test3', ['test1', 'test2'])

    const mockState = {
      test1: ['John', 'Cobra'],
      test2: ['Will', 'Cobra', 'Smith']
    }
    const res = reducer(mockState, action)
    expect(res.test3.length).toBe(4)
  })

  it('SINTER calculates the intersection of multiple sets and stores it in a new set', () => {
    const action = actions.sinter('test4', ['test1', 'test2', 'test3'])

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
    const action = actions.sinter('test3', ['test1', 'test2'])

    const mockState = {
      test1: 'abcde'.split(),
      test2: []
    }
    const res = reducer(mockState, action)
    expect(res.test3.length).toBe(0)
  })

  it('SMOVE moves an element from a source set to a domain set', () => {
    const action = actions.smove('test2', 'test1', 100)

    const mockState = {
      test1: [100, 101],
      test2: []
    }
    const res = reducer(mockState, action)
    expect(res.test1).toEqual([101])
    expect(res.test2).toEqual([100])
  })

  it('SMOVE throws if source set does not exist', () => {
    const action = actions.smove('test2', 'test1', 'FOO')

    expect(() => {
      reducer(undefined, action)
    }).toThrowError(/source set/)
  })
})
