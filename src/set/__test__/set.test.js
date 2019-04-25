import reducer from '../reducer'
import * as Actions from '../actions'
import * as Selectors from '../selectors'

describe('Set Module', () => {
  it('Returns initial state', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('SADD adds multiple elements to the set avoiding duplications', () => {
    const action = Actions.sadd('test', [1, 2, 3])
    const set = reducer(undefined, action)

    expect(Selectors.slen('test', { set })).toBe(3)
    expect(Selectors.sisMember('test', 1, { set })).toBe(true)
    expect(Selectors.sisMember('test', 2, { set })).toBe(true)
    expect(Selectors.sisMember('test', 3, { set })).toBe(true)

    // no duplicates
    reducer(set, action)
    expect(Selectors.slen('test', { set })).toBe(3)
  })

  it('SREM removes multiple elements from a set', () => {
    const mockState = {
      test: [1, 2, 3, 4, 5]
    }
    const action = Actions.srem('test', [1, 2, 3])
    const set = reducer(mockState, action)

    expect(Selectors.slen('test', { set })).toBe(2)
  })

  it('SDIFF calculates the set difference and stores it in a new set', () => {
    const mockState = {
      test1: ['a', 'b', 'c', 'd'],
      test2: ['c'],
      test3: ['a', 'c', 'e']
    }
    const action = Actions.sdiff('test4', ['test1', 'test2', 'test3'])
    const set = reducer(mockState, action)

    expect(Selectors.slen('test4', { set })).toBe(2)
    expect(Selectors.sisMember('test4', 'd', { set })).toBe(true)
    expect(Selectors.sisMember('test4', 'b', { set })).toBe(true)

    expect(Selectors.sisMember('test4', 'a', { set })).toBe(false)
  })

  it('SUNION calculates the union of multiple sets and stores it in a new set', () => {
    const action = Actions.sunion('test3', ['test1', 'test2'])

    const mockState = {
      test1: ['John', 'Cobra'],
      test2: ['Will', 'Cobra', 'Smith']
    }
    const set = reducer(mockState, action)

    expect(Selectors.slen('test3', { set })).toBe(4)
    expect(Selectors.smembers('test3', { set })).toEqual([
      'John',
      'Cobra',
      'Will',
      'Smith'
    ])
  })

  it('SINTER calculates the intersection of multiple sets and stores it in a new set', () => {
    const mockState = {
      test1: 'abcd'.split(''),
      test2: ['c'],
      test3: 'ace'.split('')
    }
    const action = Actions.sinter('test4', ['test1', 'test2', 'test3'])
    const set = reducer(mockState, action)

    expect(Selectors.slen('test4', { set })).toBe(1)
    expect(Selectors.smembers('test4', { set })).toEqual(['c'])
  })

  it('SINTER exits early if any of the sources is an empty set', () => {
    const mockState = {
      test1: 'abcde'.split(),
      test2: []
    }
    const action = Actions.sinter('test3', ['test1', 'test2'])
    const set = reducer(mockState, action)

    expect(Selectors.slen('test3', { set })).toBe(0)
  })

  it('SMOVE moves an element from a source set to a domain set', () => {
    const mockState = {
      test1: [100, 101],
      test2: []
    }
    const action = Actions.smove('test2', 'test1', 100)
    const set = reducer(mockState, action)

    expect(Selectors.smembers('test1', { set })).toEqual([101])
    expect(Selectors.smembers('test2', { set })).toEqual([100])
  })

  it('SMOVE throws if source set does not exist', () => {
    const action = Actions.smove('test2', 'test1', 'FOO')

    expect(() => {
      reducer(undefined, action)
    }).toThrowError(/source set/)
  })
})
