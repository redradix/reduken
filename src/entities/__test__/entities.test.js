import {
  mergeEntities,
  updateEntity,
  removeOne,
  removeMany,
  removeAll,
  clear,
  updateEntities,
  mergeEntity,
} from '../actions'
import reducer from '../reducer'
import * as Selectors from '../selectors'

describe('Entities Module', () => {
  const initialEntities = {
    users: {
      1: { id: 1, name: 'the first one', surname: 'the first surname' },
      25: { id: 25, name: 'the second one' },
    },
    test: { 20: { id: 20, name: 'testing' } },
  }

  it('Exports by default a reducer', () => {
    expect(reducer).toBeInstanceOf(Function)
  })

  it('mergeEntities() merges entities keeping the existing ones', () => {
    const mockPayload = {
      users: {
        2: { id: 2, name: 'second' },
      },
    }
    const action = mergeEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    expect(Selectors.getOne('users', 1, { entities })).toBeDefined()
  })

  it('mergeEntities() merges existing entities', () => {
    const mockPayload = {
      users: { 1: { id: 1, name: 'overwritten', profession: 'developer' } },
    }
    const action = mergeEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    const userOne = Selectors.getOne('users', 1, { entities })
    expect(userOne.name).toBe('overwritten')
    expect(userOne.surname).toBe('the first surname')
    expect(userOne.profession).toBe('developer')
  })

  it('mergeEntities() keeps non affected entities equal as previous', () => {
    const mockPayload = {
      domains: { 1: { id: 1, name: 'overwritten' } },
    }
    const action = mergeEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    const userNotRemoved = Selectors.getOne('users', 25, { entities })
    expect(userNotRemoved).toBe(
      Selectors.getOne('users', 25, { entities: initialEntities }),
    )
  })

  it('mergeEntities() accepts multiple entity maps', () => {
    const mockPayload = {
      users: { 2: { id: 2, name: 'second' } },
      domains: { 1: { id: 1, name: 'AB4FB' } },
    }
    const entities = reducer(initialEntities, mergeEntities(mockPayload))

    const existingUser = Selectors.getOne('users', 25, { entities })
    expect(existingUser).toBe(
      Selectors.getOne('users', 25, { entities: initialEntities }),
    )
    expect(Selectors.getOne('domains', 1, { entities }).name).toBe('AB4FB')
    expect(Selectors.getOne('users', 2, { entities }).name).toBe('second')
  })

  it('mergeEntity() merges one entity and preserves old properties', () => {
    const action = mergeEntity('users', 1, { name: 'overwritten' })
    const entities = reducer(initialEntities, action)

    const existingUser = Selectors.getOne('users', 1, { entities })

    expect(existingUser.name).toBe('overwritten')
    expect(existingUser.surname).toBe(
      Selectors.getOne('users', 1, { entities: initialEntities }).surname,
    )
  })

  it('removeOne() removes a single entity by domain and id', () => {
    const entities = reducer(initialEntities, removeOne('users', 1))
    expect(Selectors.getOne('users', 1, { entities })).not.toBeDefined()
  })

  it('removeMany() clears entities of a given type/domain by an Array of ids', () => {
    const entities = reducer(initialEntities, removeMany('users', [1]))

    const userNotRemoved = Selectors.getOne('users', 25, { entities })
    expect(Selectors.getOne('users', 1, { entities })).not.toBeDefined()
    expect(userNotRemoved).toBeDefined()
  })

  it('removeAll() clears all entities in a given type/domain', () => {
    const entities = reducer(initialEntities, removeAll('users'))
    expect(Selectors.getDomain('users', { entities })).toEqual({})
  })

  it('clear() clears the full entity cache', () => {
    const entities = reducer(initialEntities, clear())
    expect(Selectors.getEntities({ entities })).toEqual({})
  })

  it('updateEntities() updates one domain and preserves previous data', () => {
    const mockPayload = {
      users: { 2: { name: 'hello' } },
    }

    const action = updateEntities(mockPayload)
    const entities = reducer(initialEntities, action)

    const users = Selectors.getDomain('users', { entities })
    const previousUser = Selectors.getOne('users', 25, { entities })
    const test = Selectors.getDomain('test', { entities })

    expect(Object.values(users)).toHaveLength(3)
    expect(previousUser).toEqual(initialEntities.users['25'])
    expect(test).toEqual(initialEntities.test)
  })

  it('updateEntity() updates the value of a single entity in a domain', () => {
    const mockPayload = { id: 1, name: 'other name' }

    const entities = reducer(
      initialEntities,
      updateEntity('users', 1, mockPayload),
    )

    const user = Selectors.getOne('users', 1, { entities })
    const userDomain = Selectors.getDomain('users', { entities })
    expect(user.name).toEqual(mockPayload.name)
    expect(Object.values(userDomain)).toHaveLength(2)
  })

  it('getSome() works with string and numbers arrays', () => {
    const requestedKeys = [1, '25']

    const users = Selectors.getSome('users', requestedKeys, {
      entities: initialEntities,
    })

    const receivedKeys = users.map(user => String(user.id))

    expect(receivedKeys).toEqual(requestedKeys.map(String))
    expect(users).toHaveLength(2)
  })
})
