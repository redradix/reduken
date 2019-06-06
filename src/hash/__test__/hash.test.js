import reducer from '../reducer'
import * as Actions from '../actions'
import * as Selectors from '../selectors'

describe('Hash Module', () => {
  it('Returns initial state when called with undefined', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('SET sets a single value in a hash', () => {
    const action = Actions.set('test', ['foo'], 1)
    const hash = reducer(undefined, action)

    expect(Selectors.getFromPath('test', ['foo'], { hash })).toBe(
      action.payload.value
    )
  })

  it('SET sets a single value in a deep path', () => {
    const action = Actions.set('test', ['foo', 'bar', 'baz'], 25)
    const hash = reducer(undefined, action)

    expect(Selectors.getFromPath('test', ['foo', 'bar', 'baz'], { hash })).toBe(
      action.payload.value
    )
  })

  it('DELETE removes a key from a hash', () => {
    const state = {
      test: {
        foo: 'bar',
        bar: 'foo'
      }
    }
    const action = Actions.remove('test', ['foo'])
    const hash = reducer(state, action)

    expect(Selectors.getDomain('test', { hash })).not.toHaveProperty('foo')
  })

  it('MERGE merges an object at given path', () => {
    const initialState = {
      test: {
        foo: {
          existing: 'test'
        }
      }
    }
    const value = { name: 'Test', number: 100, existing: 'overwrite' }
    const action = Actions.merge('test', 'foo', value)
    const hash = reducer(initialState, action)

    expect(Selectors.getFromPath('test', ['foo', 'name'], { hash })).toBe(
      value.name
    )
    expect(Selectors.getFromPath('test', ['foo', 'number'], { hash })).toBe(
      value.number
    )
    expect(Selectors.getFromPath('test', ['foo', 'existing'], { hash })).toBe(
      value.existing
    )
  })

  it('INCREMENT_BY increments a key in a given hash', () => {
    const action = Actions.incrementBy('test', ['foo'], 1)

    let hash = reducer(undefined, action)

    expect(Selectors.getFromPath('test', ['foo'], { hash })).toBe(1)

    hash = reducer(hash, action)
    hash = reducer(hash, action)
    hash = reducer(hash, action)

    expect(Selectors.getFromPath('test', ['foo'], { hash })).toBe(4)
  })

  it('INCREMENT_BY increments a non numeric key by setting it to the value', () => {
    const initialState = {
      test: {
        foo: 'string'
      }
    }

    const action = Actions.incrementBy('test', ['foo'], 1)
    const hash = reducer(initialState, action)

    expect(Selectors.getFromPath('test', ['foo'], { hash })).toBe(1)
  })

  it('TOGGLE toggles a key in a given hash', () => {
    const action = Actions.toggle('test', ['bool'])
    let hash = reducer(undefined, action)

    expect(Selectors.getFromPath('test', ['bool'], { hash })).toBe(true)
    hash = reducer(hash, action)
    expect(Selectors.getFromPath('test', ['bool'], { hash })).toBe(false)
  })
})
