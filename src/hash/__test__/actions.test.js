import * as Actions from '../index'
import * as ActionTypes from '../actionTypes'

describe('Hash Module - Actions', () => {
  it('hset() dispatches HSET action', () => {
    const action = Actions.hset('test', ['prop'], 25)
    expect(action.type).toBe(ActionTypes.HSET)
    expect(action.payload).toEqual({
      path: ['test', 'prop'],
      value: 25
    })
  })

  it('hdel() dispatches HDEL action', () => {
    const action = Actions.hdel('test', ['prop'])
    expect(action).toHaveProperty('type', ActionTypes.HDEL)
    expect(action.payload).toHaveProperty('path', ['test', 'prop'])
  })

  it('hmset() dispatches HMSET action', () => {
    const map = { foo: 1, bar: 2 }
    const action = Actions.hmset('test', map)
    expect(action.type).toBe(ActionTypes.HMSET)
    expect(action.payload.path).toBe('test')
    expect(action.payload.value).toEqual(map)
  })

  it('hincrby() dispatches HINCRBY action', () => {
    const action = Actions.hincrby('test', ['counter'], 1)
    expect(action.type).toBe(ActionTypes.HINCRBY)
    expect(action.payload.path).toEqual(['test', 'counter'])
    expect(action.payload.value).toBe(1)
  })

  it('htoggle() dispatches a HTOGGLE action', () => {
    const action = Actions.htoggle('test', ['boolean'])
    expect(action.type).toBe(ActionTypes.HTOGGLE)
    expect(action.payload.path).toEqual(['test', 'boolean'])
  })
})
