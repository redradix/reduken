// buildReducer :: (State, {Function}) -> (State, Action) -> State
export default function buildReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type]
    return handler ? handler(state, action) : state
  }
}
