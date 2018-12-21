import buildReducer from '../lib/buildReducer'
import { assoc } from 'ramda'
import * as ActionTypes from './actionTypes'
export * from './actions'
export * from './selectors'

function lrem(list = [], count = 0, value) {
  if (count === 0) {
    return list.filter(x => x !== value)
  }
  if (count > 0) {
    let removed = 0
    return list.filter(item => {
      if (item === value && removed < count) {
        removed += 1
        return false
      }
      return true
    })
  }
  if (count < 0) {
    let removed = count
    return list
      .reverse()
      .filter(item => {
        if (item === value && removed < 0) {
          removed += 1
          return false
        }
        return true
      })
      .reverse()
  }
}

function ltrim(list = [], start, stop = start) {
  return list.slice(start, stop + 1)
}

const initialState = {}
export default buildReducer(initialState, {
  [ActionTypes.LPUSH]: (state, action) => {
    const { target, value } = action.payload
    const prevItems = state[target] || []
    return assoc(target, [value, ...prevItems], state)
  },
  [ActionTypes.RPUSH]: (state, action) => {
    const { target, value } = action.payload
    const prevItems = state[target] || []
    return assoc(target, [...prevItems, value], state)
  },
  [ActionTypes.LPOP]: (state, action) => {
    const { target } = action.payload
    const newList = (state[target] || []).slice(1)
    return assoc(target, newList, state)
  },
  [ActionTypes.RPOP]: (state, action) => {
    const { target } = action.payload
    const list = state[target] || []
    return assoc(target, list.slice(0, list.length - 1), state)
  },
  [ActionTypes.LSET]: (state, action) => {
    const { target, value, index } = action.payload
    const prevItems = state[target] || []
    if (index > prevItems.length) {
      console.warn(
        `LSET specified out of bounds index (${index}) for list ${target}`
      )
      return state
    }
    const newList = [].concat(prevItems)
    newList[index] = value
    return assoc(target, newList, state)
  },
  [ActionTypes.LREPLACE]: (state, action) => {
    const { target, elements } = action.payload
    return assoc(target, [].concat(elements), assoc)
  },
  [ActionTypes.LREM]: (state, action) => {
    const { target, count, value } = action.payload
    if (!state[target]) {
      return state
    }
    return assoc(target, lrem(state[target], count, value), state)
  },
  [ActionTypes.LTRIM]: (state, action) => {
    const { target, start, stop } = action.payload
    if (!state[target]) {
      return state
    }
    return assoc(target, ltrim(state[target], start, stop), state)
  }
})
