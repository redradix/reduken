interface Action {
  type: string
  payload: object
}

export function batch(type: string, actions: Action[]) {
  return {
    type,
    payload: actions,
    isBatch: true
  }
}
