import * as Selectors from '../selectors'

describe('List - Selectors', () => {
  const mockState = {
    list: {
      test: [1, 2, 3, 4]
    }
  }
  it('llen(state, domain) returns the length of a list', () => {
    expect(Selectors.llen('test', mockState)).toBe(4)
  })

  it('lget(state, domain, index) returns an element by index', () => {
    expect(Selectors.lget('test', 0, mockState)).toBe(1)
    expect(Selectors.lget('test', 3, mockState)).toBe(4)
  })

  it('lget() throws for out of bound index', () => {
    expect(Selectors.lget('test', 25)(mockState)).toEqual(undefined)
  })

  it('lrange(state, domain, start, stop) returns a range from a list', () => {
    const range = Selectors.lrange('test', 0, 2)(mockState)
    expect(range).toEqual([1, 2])
  })
})
