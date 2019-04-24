import * as ActionTypes from './actionTypes'

/**
 * Merges many entities at once
 */
export function mergeEntities(entityMap: any[]) {
  return {
    type: ActionTypes.MERGE,
    payload: entityMap
  }
}

/**
 * Removes multiple entities at once (of a single type/domain)
 */
export function removeMany(domain: string, keys: string[]) {
  return {
    type: ActionTypes.REMOVE,
    payload: {
      domain,
      keys
    }
  }
}

/**
 * Removes one entity by id
 */
export function removeOne(domain: string, key: string) {
  return removeMany(domain, [key])
}

/**
 * Removes all entities by domain
 */
export function removeAll(domain: string) {
  return {
    type: ActionTypes.REMOVE_ALL,
    payload: {
      domain
    }
  }
}

/**
 * Clears the whole entity cache
 */
export function reset() {
  return {
    type: ActionTypes.RESET
  }
}

/**
 * Updates a field inside an entity
 */
export function update(domain: string, id: string, data: any) {
  return {
    type: ActionTypes.UPDATE,
    payload: {
      domain,
      id,
      data
    }
  }
}
