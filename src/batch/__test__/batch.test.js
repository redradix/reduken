import enableBatching from '../reducer'
import { batchActions } from '../actions'

// use with hash reducer and hash actions
import { hash as hashReducer } from '../../index'
import * as hash from '../../hash/'

describe('Batch Module', () => {
  const reducer = enableBatching(hashReducer)

  it('Batches single action under specified name', () => {
    const action = batchActions('single action', [
      hash.set('test', ['foo'], 'bar'),
    ])
    const result = reducer(undefined, action)

    expect(action.type).toEqual('single action')
    expect(hash.getFromPath('test', ['foo'], { hash: result })).toEqual('bar')
  })

  it('Batches multiple action under specified name', () => {
    const action = batchActions('multiple actions', [
      hash.set('test', ['foo'], 'bar'),
      hash.set('test', ['foo2'], 'bar2'),
      hash.set('test', ['foo3'], 'bar3'),
    ])
    const result = reducer(undefined, action)
    const testDomain = hash.getDomain('test', { hash: result })

    expect(action.type).toEqual('multiple actions')
    expect(testDomain.foo).toEqual('bar')
    expect(testDomain.foo2).toEqual('bar2')
    expect(testDomain.foo3).toEqual('bar3')
  })
})
