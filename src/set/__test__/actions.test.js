import * as ActionTypes from '../actionTypes'
import * as Actions from '../actions'

describe('Set - Action creators', () => {
  it('sadd() creates a SADD action and accepts a single value', () => {
    const action = Actions.sadd('test1', 24)
    expect(action.type).toBe(ActionTypes.SADD)
    expect(action.payload.domain).toBe('test1')
    expect(action.payload.items).toEqual([24])
  })

  it('sadd() accepts an Array of items to add', () => {
    const action = Actions.sadd('test1', [24, 25, 26])
    expect(action.payload.items).toEqual([24, 25, 26])
  })

  it('srem() creates a SREM action with one or more items to remove', () => {
    const action = Actions.srem('test1', 'foo')
    expect(action.type).toBe(ActionTypes.SREM)
    expect(action.payload).toEqual({
      domain: 'test1',
      items: ['foo']
    })
  })

  it('sdiff() creates a SDIFF action with sources and domain', () => {
    const action = Actions.sdiff('test1', ['test2', 'test3'])
    expect(action.type).toBe(ActionTypes.SDIFF)
    expect(action.payload).toEqual({
      domain: 'test1',
      sources: ['test2', 'test3']
    })
  })

  it('sinter() creates a SINTER action with sources and domain', () => {
    const action = Actions.sinter('domain', ['test1', 'test2', 'test3'])
    expect(action.type).toBe(ActionTypes.SINTER)
    expect(action.payload).toEqual({
      domain: 'domain',
      sources: ['test1', 'test2', 'test3']
    })
  })

  it('sunion() creates a SUNION action', () => {
    const action = Actions.sunion('domain', ['source1', 'source2'])
    expect(action.type).toBe(ActionTypes.SUNION)
    expect(action.payload).toEqual({
      domain: 'domain',
      sources: ['source1', 'source2']
    })
  })

  it('smove() creates a SMOVE action', () => {
    const action = Actions.smove('domain', 'source', 25)
    expect(action.type).toBe(ActionTypes.SMOVE)
    expect(action.payload).toEqual({
      source: 'source',
      domain: 'domain',
      items: [25]
    })
  })
})
