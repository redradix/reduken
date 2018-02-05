import * as Selectors from '../selectors'

describe('Hash Module - Selectors', () => {
  const mockState = {
    hash: {
      test: {
        keyA: 1,
        keyB: 2,
        keyC: 3,
        keyD: {
          foo: 'bar'
        }
      }
    }
  }
  it('hget() returns a single value from a hash', () => {
    const res = Selectors.hget('test', 'keyA', mockState)
    expect(res).toBe(1)
  })

  it('hget() accepts a keypath', () => {
    const res = Selectors.hget('test', 'keyD.foo', mockState)
    expect(res).toBe('bar')
  })

  it('hget() works curryfied', () => {
    const getKeyA = Selectors.hget('test', 'keyA')
    expect(getKeyA(mockState)).toBe(1)
  })

  it('hgetAll() returns a full object under a path', () => {
    const res = Selectors.hgetAll('test', mockState)
    expect(res).toEqual(mockState.hash.test)
  })

  it('hgetAll() works curryfied', () => {
    const getTest = Selectors.hgetAll('test')
    expect(getTest(mockState)).toEqual(mockState.hash.test)
  })

  it('hkeys() returns an Array of keys given a path', () => {
    const res = Selectors.hkeys('test', mockState)
    expect(res).toEqual(Object.keys(mockState.hash.test))
  })

  it('hlen() returns the number of keys present in a given hash', () => {
    const res = Selectors.hlen('test', mockState)
    expect(res).toBe(4)
    const res2 = Selectors.hlen('foobar', mockState)
    expect(res2).toBe(0)
  })

  it('hexists() returns a Boolean indicating wether a specific key exist in a hash', () => {
    const res = Selectors.hexists('test', 'keyA', mockState)
    expect(res).toBe(true)
    const res2 = Selectors.hexists('test', 'NONE', mockState)
    expect(res2).toBe(false)
  })
})
