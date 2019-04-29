export default function enableBatching(reducer) {
  return function batchReducer(state, action) {
    if (action.meta && action.meta.isBatch) {
      return action.payload.reduce(batchReducer, state)
    }
    return reducer(state, action)
  }
}
