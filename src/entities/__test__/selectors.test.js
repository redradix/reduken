import * as Selectors from '../selectors'

describe('Entities - Selectors', () => {
  const mockState = {
    entities: {
      test: {
        1: { id: 'foo', name: 'foo' },
        2: { id: 'bar', name: 'bar' }
      }
    }
  }

  it('getSome(state) returns some entities', () => {
    const entities = Selectors.getSome('test', [1], mockState)
    expect(entities).toEqual([mockState.entities.test[1]])
  })

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
    const foo = Selectors.getById('test', 1, mockState)
    expect(foo).toEqual(mockState.entities.test[1])
  })

  it('getAll(domain) returns all entities from a domain as an Array', () => {
    const allTest = Selectors.getAll('test')(mockState)
    expect(Array.isArray(allTest)).toBe(true)
    expect(allTest[0]).toEqual(mockState.entities.test[1])
    expect(allTest[1]).toEqual(mockState.entities.test[2])
  })
})
