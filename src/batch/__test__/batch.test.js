import batchReducer from '../reducer'
import { batch } from '../actions'

// use with hash reducer and hash actions
import { hash } from '../../index'
import * as Actions from '../../hash/actions'
import * as Selectors from '../../hash/selectors'

describe('Batch Module', () => {
  const reducer = batchReducer(hash)

  it('Batches single action under specified name', () => {
    const action = batch('single action', [
      Actions.hset('test', ['foo'], 'bar')
    ])
    const result = reducer(undefined, action)

    expect(action.type).toEqual('single action')
    expect(Selectors.hget('test', ['foo'], { hash: result })).toEqual('bar')
  })

  it('Batches multiple action under specified name', () => {
    const action = batch('multiple actions', [
      Actions.hset('test', ['foo'], 'bar'),
      Actions.hset('test', ['foo2'], 'bar2'),
      Actions.hset('test', ['foo3'], 'bar3')
    ])
    const result = reducer(undefined, action)
    const testDomain = Selectors.hgetall('test', { hash: result })

    expect(action.type).toEqual('multiple actions')
    expect(testDomain.foo).toEqual('bar')
    expect(testDomain.foo2).toEqual('bar2')
    expect(testDomain.foo3).toEqual('bar3')
  })
})
