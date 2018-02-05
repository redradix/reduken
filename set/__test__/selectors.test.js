import * as Selectors from '../selectors'

describe('Set - Selectors', () => {
  const mockState = {
    set: {
      test1: ['a', 'b', 'c'],
      test2: 'abcdefghijklmnopqrstuvwxyz'.split('')
    }
  }
  it('scard() returns the cardinality of a set', () => {
    expect(Selectors.scard('test1', mockState)).toBe(mockState.set.test1.length)
    expect(Selectors.scard('test2', mockState)).toBe(mockState.set.test2.length)
    expect(Selectors.scard('foo', mockState)).toBe(0)
  })

  it('sisMember() returns a Boolean indicating set membership', () => {
    expect(Selectors.sisMember('test1', 'a', mockState)).toBeTruthy()
    expect(Selectors.sisMember('test1', 'e', mockState)).toBe(false)
    expect(Selectors.sisMember('foo', 'bar', mockState)).toBe(false)
  })

  it('smembers() return all elements in a set', () => {
    expect(Selectors.smembers('test1')(mockState)).toEqual(mockState.set.test1)
  })

  it('srand() returns a random element from a set', () => {
    for(let i=0; i < mockState.set.test2.length; i++){
      const member = Selectors.srand('test2', mockState)
      expect(mockState.set.test2.indexOf(member)).not.toBe(-1)
    }
  })
})
