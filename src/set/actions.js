import * as ActionTypes from './actionTypes'

export function sadd(name, value){
  const items = [].concat(value)
  if(items.some(x => typeof x === 'object')){
    console.warn('sadd() received a Javascript object as element, you should store primitive values that can be compared with ===')
  }
  return {
    type: ActionTypes.SADD,
    payload: {
      name,
      items
    }
  }
}

export function srem(name, value){
  const items = [].concat(value)
  if(items.some(x => typeof x === 'object')){
    console.warn('srem() received a Javascript object as element, you should store primitive values that can be compared with ===')
  }
  return {
    type: ActionTypes.SREM,
    payload: {
      name,
      items
    }
  }
}

export function sunion(target, ...sets){
  return {
    type: ActionTypes.SUNION,
    payload: {
      target,
      sources: sets
    }
  }
}

export function sdiff(target, ...sets){
  return {
    type: ActionTypes.SDIFF,
    payload: {
      sources: sets,
      target
    }
  }
}

export function sinter(target, ...sets){
  return {
    type: ActionTypes.SINTER,
    payload: {
      sources: sets,
      target
    }
  }
}

export function smove(target, source, value){
  return {
    type: ActionTypes.SMOVE,
    payload: {
      target,
      source,
      value
    }
  }
}