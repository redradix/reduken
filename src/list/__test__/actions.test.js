import * as ActionTypes from '../actionTypes'
import * as Actions from '../actions'

describe('List - Actions', () => {
  it('lprepend(target, value) creates PREPEND action', () => {
    const action = Actions.lprepend('test', 'foo')
    expect(action.type).toBe(ActionTypes.PREPEND)
    expect(action.payload.target).toBe('test')
    expect(action.payload.value).toBe('foo')
  })

  it('lappend(target, value) creates LAPPEND action', () => {
    const action = Actions.lappend('test', 'foo')
    expect(action.type).toBe(ActionTypes.LAPPEND)
    expect(action.payload.target).toBe('test')
    expect(action.payload.value).toBe('foo')
  })

  it('lset(target, index, value) creates LSET action', () => {
    const action = Actions.lset('test', 0, 'foo')
    expect(action.type).toBe(ActionTypes.LSET)
    expect(action.payload.target).toBe('test')
    expect(action.payload.index).toBe(0)
    expect(action.payload.value).toBe('foo')
  })

  it('lrem(target, count, value) creates LREM action', () => {
    const action = Actions.lrem('test', 3, 'foo')
    expect(action.type).toBe(ActionTypes.LREM)
    expect(action.payload.target).toBe('test')
    expect(action.payload.count).toBe(3)
    expect(action.payload.value).toBe('foo')
  })

  it('ltrim(target,start,stop) creates LTRIM action', () => {
    const action = Actions.ltrim('test', 0, 1)
    expect(action.type).toBe(ActionTypes.LTRIM)
    expect(action.payload.target).toBe('test')
    expect(action.payload.start).toBe(0)
    expect(action.payload.stop).toBe(1)
  })

  it('ltrim(target,start) creates LTRIM action with stop=-1 by default', () => {
    const action = Actions.ltrim('test', 0)
    expect(action.type).toBe(ActionTypes.LTRIM)
    expect(action.payload.target).toBe('test')
    expect(action.payload.start).toBe(0)
    expect(action.payload.stop).toBe(-1)
  })

  it('lshift(target) creates LSHIFT action', () => {
    const lshift = Actions.lshift('test')
    expect(lshift.type).toBe(ActionTypes.LSHIFT)
    expect(lshift.payload).toHaveProperty('target', 'test')
  })

  it('lpop(target) creates LSHIFT action', () => {
    const lpop = Actions.lpop('test')
    expect(lpop.type).toBe(ActionTypes.LPOP)
    expect(lpop.payload).toHaveProperty('target', 'test')
  })
})
