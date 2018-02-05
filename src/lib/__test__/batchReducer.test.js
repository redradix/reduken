import batchReducer, { batch, BATCH } from '../batchReducer'

describe('Batch Reducer', () => {
  const reducer = function(state=0, action){
    switch(action.type){
      case 'INCREMENT':
        return state+1
      case 'DECREMENT':
        return state-1
      default:
        return state
    }
  }
  const batched = batchReducer(reducer)

  it('batchReducer() returns a wrapped reducer function', () => {
    expect(typeof batched).toBe('function')
  })

  it('batch() creates a batched action from an array of actions', () => {
    const action = batch([
      { type: 'INCREMENT' },
      { type: 'INCREMENT' },
      { type: 'INCREMENT' },
      { type: 'DECREMENT' },
    ])
    expect(action.type).toBe(BATCH)
    expect(action.payload.length).toBe(4)
  })

  it('batchReducer() executes an array of actions in a single call', () => {
    const action = batch([
      { type: 'INCREMENT' },
      { type: 'INCREMENT' },
      { type: 'INCREMENT' },
      { type: 'DECREMENT' },
    ])
    const state = batched(undefined, action)
    expect(state).toBe(2)
  })
})