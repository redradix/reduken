import * as ActionTypes from './actionTypes'

export function mergeEntities(entityMap) {
  return {
    type: ActionTypes.MERGE,
    payload: entityMap
  }
}

/**
 * Removes multiple entities at once (of a single type/domain)
 */
export function removeMany(domain, keys) {
  return {
    type: ActionTypes.REMOVE,
    payload: {
      domain,
      keys
    }
  }
}

/* Utility - removes a single one */
export function removeOne(domain, key) {
  return removeMany(domain, [key])
}

/* Clears all entities by domain */
export function removeAll(domain) {
  return {
    type: ActionTypes.REMOVE_ALL,
    payload: {
      domain
    }
  }
}

/* Empties the whole entity cache */
export function reset() {
  return {
    type: ActionTypes.RESET
  }
}

export function update(domain, id, data) {
  return {
    type: ActionTypes.UPDATE,
    payload: {
      domain,
      id,
      data
    }
  }
}
