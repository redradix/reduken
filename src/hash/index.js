import dotProp from 'dot-prop-immutable'
import buildReducer from '../lib/buildReducer'
import * as ActionTypes from './actionTypes'
export * from './actions'
export * from './selectors'

const reducer = buildReducer(
  {},
  {
    [ActionTypes.HSET]: (state, action) => {
      const { value, path } = action.payload
      return dotProp.set(state, path, value)
    },
    [ActionTypes.HDEL]: (state, action) => {
      const { path } = action.payload
      return dotProp.delete(state, path)
    },
    [ActionTypes.HMSET]: (state, action) => {
      const { value, path } = action.payload
      return dotProp.merge(state, path, value)
    },
    [ActionTypes.HINCRBY]: (state, action) => {
      const { value, path } = action.payload
      if (dotProp.get(state, path)) {
        return dotProp.set(state, path, v => {
          return (Number(v) || 0) + value
        })
      } else {
        return dotProp.set(state, path, value)
      }
    },
    [ActionTypes.HTOGGLE]: (state, action) => {
      const { path } = action.payload
      const currentValue = Boolean(dotProp.get(state, path))
      return dotProp.set(state, path, !currentValue)
    }
  }
)

export default reducer
