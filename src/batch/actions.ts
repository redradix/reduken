interface Action {
  type: string
  payload: object
}

export function batchActions(type: string, actions: Action[]) {
  return {
    type,
    payload: actions,
    meta: { isBatch: true }
  }
}
