import reducer from '../reducer'
import * as Actions from '../actions'
import * as Selectors from '../selectors'

describe('Hash Module', () => {
  it('Returns initial state when called with undefined', () => {
    const res = reducer(undefined, { type: 'FOO' })
    expect(res).toEqual({})
  })

  it('HSET sets a single value in a hash', () => {
    const action = Actions.hset('test', ['foo'], 1)
    const hash = reducer(undefined, action)

    expect(Selectors.hget('test', ['foo'], { hash })).toBe(action.payload.value)
  })

  it('HSET sets a single value in a deep path', () => {
    const action = Actions.hset('test', ['foo', 'bar', 'baz'], 25)
    const hash = reducer(undefined, action)

    expect(Selectors.hget('test', ['foo', 'bar', 'baz'], { hash })).toBe(
      action.payload.value
    )
  })

  it('HDEL removes a key from a hash', () => {
    const state = {
      test: {
        foo: 'bar',
        bar: 'foo'
      }
    }
    const action = Actions.hdel('test', ['foo'])
    const hash = reducer(state, action)

    expect(Selectors.hgetall('test', { hash })).not.toHaveProperty('foo')
  })

  it('HMSET merges an object at given path', () => {
    const initialState = {
      test: {
        foo: {
          existing: 'test'
        }
      }
    }
    const value = { name: 'Test', number: 100 }
    const action = Actions.hmset(['test', 'foo'], value)
    const hash = reducer(initialState, action)

    expect(Selectors.hget('test', ['foo', 'name'], { hash })).toBe(value.name)
    expect(Selectors.hget('test', ['foo', 'number'], { hash })).toBe(
      value.number
    )
    expect(Selectors.hget('test', ['foo', 'existing'], { hash })).toBe(
      initialState.test.foo.existing
    )
  })

  it('HINCRBY increments a key in a given hash', () => {
    const action = Actions.hincrby('test', ['foo'], 1)

    let hash = reducer(undefined, action)

    expect(Selectors.hget('test', ['foo'], { hash })).toBe(1)

    hash = reducer(hash, action)
    hash = reducer(hash, action)
    hash = reducer(hash, action)

    expect(Selectors.hget('test', ['foo'], { hash })).toBe(4)
  })

  it('HINCRYBY increments a non numeric key by setting it to the value', () => {
    const initialState = {
      test: {
        foo: 'string'
      }
    }

    const action = Actions.hincrby('test', ['foo'], 1)
    const hash = reducer(initialState, action)

    expect(Selectors.hget('test', ['foo'], { hash })).toBe(1)
  })

  it('HTOGGLE toggles a key in a given hash', () => {
    const action = Actions.htoggle('test', ['bool'])
    let hash = reducer(undefined, action)
    expect(Selectors.hget('test', ['bool'], { hash })).toBe(true)

    hash = reducer(hash, action)
    expect(Selectors.hget('test', ['bool'], { hash })).toBe(false)
  })
})