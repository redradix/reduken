import * as ActionTypes from '../actionTypes'
import * as Actions from '../actions'

describe('Set - Action creators', () => {
  it('sadd() creates a SADD action and accepts a single value', () => {
    const action = Actions.sadd('test1', 24)
    expect(action.type).toBe(ActionTypes.SADD)
    expect(action.payload.name).toBe('test1')
    expect(action.payload.items).toEqual([24])
  })

  it('sadd() accepts an Array of items to add', () => {
    const action = Actions.sadd('test1', [24, 25, 26])
    expect(action.payload.items).toEqual([24, 25, 26])
  })

  it('sadd() emits warning when complex object are added to a set', () => {
    const oldWarn = console.warn
    console.warn = jest.fn()
    const action = Actions.sadd('test1', [{ obj: 25 }])
    expect(console.warn).toHaveBeenCalled()
    console.warn = oldWarn
  })

  it('srem() creates a SREM action with one or more items to remove', () => {
    const action = Actions.srem('test1', 'foo')
    expect(action.type).toBe(ActionTypes.SREM)
    expect(action.payload).toEqual({
      name: 'test1',
      items: ['foo']
    })
  })

  it('srem() emits warning when complex object are to be removed from a set', () => {
    const oldWarn = console.warn
    console.warn = jest.fn()
    const action = Actions.srem('test1', [{ obj: 25 }])
    expect(console.warn).toHaveBeenCalled()
    console.warn = oldWarn
  })

  it('sdiff() creates a SDIFF action with sources and target', () => {
    const action = Actions.sdiff('test1', 'test2', 'test3')
    expect(action.type).toBe(ActionTypes.SDIFF)
    expect(action.payload).toEqual({
      target: 'test1',
      sources: ['test2', 'test3']
    })
  })

  it('sinter() creates a SINTER action with sources and target', () => {
    const action = Actions.sinter('target', 'test1', 'test2', 'test3')
    expect(action.type).toBe(ActionTypes.SINTER)
    expect(action.payload).toEqual({
      target: 'target',
      sources: ['test1', 'test2', 'test3']
    })
  })

  it('sunion() creates a SUNION action', () => {
    const action = Actions.sunion('target', 'source1', 'source2')
    expect(action.type).toBe(ActionTypes.SUNION)
    expect(action.payload).toEqual({
      target: 'target',
      sources: ['source1', 'source2']
    })
  })

  it('smove() creates a SMOVE action', () => {
    const action = Actions.smove('target', 'source', 25)
    expect(action.type).toBe(ActionTypes.SMOVE)
    expect(action.payload).toEqual({
      source: 'source',
      target: 'target',
      value: 25
    })
  })
})
