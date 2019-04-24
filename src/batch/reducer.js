export default function batchReducer(reducer) {
  return (state, action) => {
    if (action.isBatch) {
      return action.payload.reduce(reducer, state)
    }
    return reducer(state, action)
  }
}
