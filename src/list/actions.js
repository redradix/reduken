import * as ActionTypes from './actionTypes'

export function lpush(target, value) {
  return {
    type: ActionTypes.LPUSH,
    payload: {
      target,
      value
    }
  }
}

export function rpush(target, value) {
  return {
    type: ActionTypes.RPUSH,
    payload: {
      target,
      value
    }
  }
}

export function lpop(target) {
  return {
    type: ActionTypes.LPOP,
    payload: {
      target
    }
  }
}

export function rpop(target) {
  return {
    type: ActionTypes.RPOP,
    payload: {
      target
    }
  }
}

export function lset(target, index, value) {
  return {
    type: ActionTypes.LSET,
    payload: {
      target,
      index,
      value
    }
  }
}

export function lreplace(target, elements) {
  return {
    type: ActionTypes.LREPLACE,
    payload: {
      target,
      elements
    }
  }
}

export function lrem(target, count, value) {
  return {
    type: ActionTypes.LREM,
    payload: {
      target,
      count,
      value
    }
  }
}

export function ltrim(target, start, stop = -1) {
  return {
    type: ActionTypes.LTRIM,
    payload: {
      target,
      start,
      stop
    }
  }
}
