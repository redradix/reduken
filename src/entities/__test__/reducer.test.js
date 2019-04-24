import {
  mergeEntities,
  update,
  removeOne,
  removeMany,
  removeAll,
  reset
} from '../actions'
import reducer from '../reducer'

describe('Entities module', () => {
  const initialState = {
    users: {
      1: { id: 1, name: 'the first one' },
      25: { id: 25, name: 'the second one' }
    }
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
    const state = reducer(initialState, action)

    expect(state.users['2'].id).toBe(2)
    expect(state.users['1'].id).toBe(1)
  })

  it('mergeEntities() merges existing entities', () => {
    const mockPayload = {
      users: { 1: { id: 1, name: 'overwritten' } }
    }
    const action = mergeEntities(mockPayload)
    const state = reducer(initialState, action)

    expect(state.users['1'].name).toBe('overwritten')
    expect(state.users['1'].id).toBe(1)
  })

  it('mergeEntities() keeps non affected entities equal as previous', () => {
    const mockPayload = {
      domains: { 1: { id: 1, name: 'overwritten' } }
    }
    const action = mergeEntities(mockPayload)
    const state = reducer(initialState, action)

    const userNotRemoved = state.users['25']
    expect(userNotRemoved).toBe(initialState.users['25'])
  })

  it('mergeEntities() accepts multiple entity maps', () => {
    const mockPayload = {
      users: { 2: { id: 2, name: 'second' } },
      domains: { 1: { id: 1, name: 'AB4FB' } }
    }
    const state = reducer(initialState, mergeEntities(mockPayload))
    const existingUser = state.users['25']
    expect(existingUser).toBe(initialState.users['25'])
    expect(state.domains['1'].name).toBe('AB4FB')
    expect(state.users['2'].name).toBe('second')
  })

  it('update() merges one single entity with data', () => {
    const data = {
      lastName: 'foobar'
    }
    const state = reducer(initialState, update('users', '1', data))
    const user = state.users['1']
    expect(user).toBeDefined()
    expect(user.lastName).toBe(data.lastName)
    expect(user.id).toBe(1)
  })

  it('update() works if there is not an existing entity', () => {
    const data = {
      lastName: 'foobar'
    }
    const state = reducer(initialState, update('users', 'foobar', data))
    const user = state.users['foobar']
    expect(user).toBeDefined()
    expect(user.lastName).toBe('foobar')
  })

  it('removeOne() removes a single entity by domain and id', () => {
    const state = reducer(initialState, removeOne('users', 1))
    expect(state.users['1']).not.toBeDefined()
  })

  it('removeMany() clears entities of a given type/domain by an Array of ids', () => {
    const state = reducer(initialState, removeMany('users', [1]))
    const userNotRemoved = state.users['25']
    expect(state.users['1']).not.toBeDefined()
    expect(userNotRemoved).toBeDefined()
  })

  it('removeAll() clears all entities in a given type/domain', () => {
    const state = reducer(initialState, removeAll('users'))
    expect(state.users).not.toBeDefined()
  })

  it('reset() clears the full entity cache', () => {
    const state = reducer(initialState, reset())
    expect(state).toEqual({})
  })
})
