export default function enableBatching(reducer) {
  return function batchReducer(state, action) {
    if (actions.meta && action.meta.isBatch) {
      return action.payload.reduce(batchReducer, state)
    }
    return reducer(state, action)
  }
}
