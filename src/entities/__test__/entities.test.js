import {
  mergeEntities,
  updateEntity,
  removeOne,
  removeMany,
  removeAll,
  reset,
  updateEntities
} from '../actions'
import reducer from '../reducer'
import * as Selectors from '../selectors'

describe('Entities Module', () => {
  const initialEntities = {
    users: {
      1: { id: 1, name: 'the first one' },
      25: { id: 25, name: 'the second one' }
    },
    test: { 20: { id: 20, name: 'testing' } }
  }

  it('Exports by default a reducer', () => {
    expect(reducer).toBeInstanceOf(Function)
  })

  it('mergeEntities() merges entities keeping the existing ones', () => {
    const mockPayload = {
      users: {
        2: { id: 2, name: 'second' }
      }
    }
    const action = mergeEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    expect(Selectors.getById('users', 2, { entities }).id).toBe(2)
    expect(Selectors.getById('users', 1, { entities }).id).toBe(1)
  })

  it('mergeEntities() merges existing entities', () => {
    const mockPayload = {
      users: { 1: { id: 1, name: 'overwritten' } }
    }
    const action = mergeEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    const userOne = Selectors.getById('users', 1, { entities })
    expect(userOne.name).toBe('overwritten')
    expect(userOne.id).toBe(1)
  })

  it('mergeEntities() keeps non affected entities equal as previous', () => {
    const mockPayload = {
      domains: { 1: { id: 1, name: 'overwritten' } }
    }
    const action = mergeEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    const userNotRemoved = Selectors.getById('users', 25, { entities })
    expect(userNotRemoved).toBe(
      Selectors.getById('users', 25, { entities: initialEntities })
    )
  })

  it('mergeEntities() accepts multiple entity maps', () => {
    const mockPayload = {
      users: { 2: { id: 2, name: 'second' } },
      domains: { 1: { id: 1, name: 'AB4FB' } }
    }
    const entities = reducer(initialEntities, mergeEntities(mockPayload))

    const existingUser = Selectors.getById('users', 25, { entities })
    expect(existingUser).toBe(
      Selectors.getById('users', 25, { entities: initialEntities })
    )
    expect(Selectors.getById('domains', 1, { entities }).name).toBe('AB4FB')
    expect(Selectors.getById('users', 2, { entities }).name).toBe('second')
  })

  it('removeOne() removes a single entity by domain and id', () => {
    const entities = reducer(initialEntities, removeOne('users', 1))
    expect(Selectors.getById('users', 1, { entities })).not.toBeDefined()
  })

  it('removeMany() clears entities of a given type/domain by an Array of ids', () => {
    const entities = reducer(initialEntities, removeMany('users', [1]))

    const userNotRemoved = Selectors.getById('users', 25, { entities })
    expect(Selectors.getById('users', 1, { entities })).not.toBeDefined()
    expect(userNotRemoved).toBeDefined()
  })

  it('removeAll() clears all entities in a given type/domain', () => {
    const entities = reducer(initialEntities, removeAll('users'))
    expect(Selectors.getDomain('users', { entities })).toEqual({})
  })

  it('reset() clears the full entity cache', () => {
    const entities = reducer(initialEntities, reset())
    expect(Selectors.getEntities({ entities })).toEqual({})
  })

  it('updateEntities() overwrites one domain entity with new data', () => {
    const mockPayload = {
      users: { 2: { name: 'hello' } }
    }

    const action = updateEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    const users = Selectors.getDomain('users', { entities })
    const test = Selectors.getDomain('test', { entities })
    expect(users).toEqual(mockPayload.users)
    expect(test).toEqual(initialEntities.test)
  })

  it('updateEntity() updates the value of a single entity in a domain', () => {
    const mockPayload = { id: 1, name: 'other name' }

    const entities = reducer(
      initialEntities,
      updateEntity('users', 1, mockPayload)
    )

    const user = Selectors.getById('users', 1, { entities })
    const userDomain = Selectors.getDomain('users', { entities })
    expect(user.name).toEqual(mockPayload.name)
    expect(Object.values(userDomain).length).toBe(2)
  })
})
