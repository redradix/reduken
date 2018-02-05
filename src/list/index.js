import buildReducer from '../lib/buildReducer'
import { set } from 'dot-prop-immutable'
import * as ActionTypes from './actionTypes'
export * from './actions'
export * from './selectors'

function lrem(list = [], count = 0, value) {
  if (count === 0) {
    return list.filter(x => x !== value)
  }
  if (count > 0) {
    let removed = 0
    return list.filter((item, index) => {
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
      .filter((item, index) => {
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
    return set(state, target, [value, ...prevItems])
  },
  [ActionTypes.RPUSH]: (state, action) => {
    const { target, value } = action.payload
    const prevItems = state[target] || []
    return set(state, target, [...prevItems, value])
  },
  [ActionTypes.LPOP]: (state, action) => {
    const { target } = action.payload
    const newList = (state[target] || []).slice(1)
    return set(state, target, newList)
  },
  [ActionTypes.RPOP]: (state, action) => {
    const { target } = action.payload
    const list = state[target] || []
    return set(state, target, list.slice(0, list.length - 1))
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
    return set(state, target, newList)
  },
  [ActionTypes.LREPLACE]: (state, action) => {
    const { target, elements } = action.payload
    return set(state, target, [].concat(elements))
  },
  [ActionTypes.LREM]: (state, action) => {
    const { target, count, value } = action.payload
    if (!state[target]) {
      return state
    }
    return set(state, target, lrem(state[target], count, value))
  },
  [ActionTypes.LTRIM]: (state, action) => {
    const { target, start, stop } = action.payload
    if (!state[target]) {
      return state
    }
    return set(state, target, ltrim(state[target], start, stop))
  }
})
