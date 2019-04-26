interface Action {
  type: string
  payload: object
}

export function batchActions(type: string, actions: Action[]) {
  return {
    type,
    payload: actions,
    isBatch: true
  }
}
