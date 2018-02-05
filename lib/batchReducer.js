import invariant from 'invariant'
export const BATCH = 'CORE/BATCH'

export default function batchReducer(reducer) {
  return function(state, action) {
    if (action.type === BATCH) {
      return action.payload.reduce(reducer, state)
    }
    return reducer(state, action)
  }
}

export function batch(actions) {
  invariant(
    Array.isArray(actions) && actions.every(a => typeof a === 'object'),
    'batch() expects an array of basic Redux actions'
  )
  return {
    type: BATCH,
    payload: actions
  }
}
