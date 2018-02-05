import reducer, * as Selectors from '../index'

describe('Entities - Selectors', () => {
  const mockState = {
    entities: {
      test: {
        foo: { id: 'foo', name: 'foo' },
        bar: { id: 'bar', name: 'bar' }
      }
    }
  }

  it('getEntities(state) returns all entities', () => {
    const entities = Selectors.getEntities(mockState)
    expect(entities).toEqual(mockState.entities)
  })

  it('getDomain(domain, state) returns all entities under a domain / key', () => {
    const testEntities = Selectors.getDomain('test')(mockState)
    expect(testEntities).toEqual(mockState.entities.test)
  })

  it('getDomain(domain,state) returns an empty object for non existing domain', () => {
    const entities = Selectors.getDomain('foobar')(mockState)
    expect(entities).toEqual({})
  })

  it('getById(domain, id) returns a specific entity from a domain', () => {
    const foo = Selectors.getById('test', 'foo', mockState)
    expect(foo).toEqual(mockState.entities.test.foo)
  })

  it('getAll(domain) returns all entities from a domain as an Array', () => {
    const allTest = Selectors.getAll('test')(mockState)
    expect(Array.isArray(allTest)).toBe(true)
    expect(allTest[0]).toEqual(mockState.entities.test.foo)
    expect(allTest[1]).toEqual(mockState.entities.test.bar)
  })
})
