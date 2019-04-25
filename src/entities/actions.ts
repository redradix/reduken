import * as ActionTypes from './actionTypes'

/**
 * Merges many entities at once
 */
export function mergeEntities(entityMap: object) {
  return {
    type: ActionTypes.MERGE_ENTITIES,
    payload: entityMap
  }
}

/**
 * Merges a field inside an entity
 */
export function mergeEntity(domain: string, id: string, data: any) {
  return {
    type: ActionTypes.MERGE_ENTITY,
    payload: {
      domain,
      id,
      data
    }
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
 * Update all entities with the new ones
 */
export function updateEntities(entityMap: object) {
  return {
    type: ActionTypes.UPDATE_ENTITIES,
    payload: entityMap
  }
}

/**
 * Update one entities with a new data
 */
export function updateEntity(domain: string, id: string, data: any) {
  return {
    type: ActionTypes.UPDATE_ENTITY,
    payload: {
      domain,
      id,
      data
    }
  }
}
