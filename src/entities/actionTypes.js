const MOD = 'ENTITIES'

// Merges many entities at once (domain: { [id]: {}, [id]: {} }, domain2: ..., domain3:...)
export const MERGE = `${MOD}/MERGE`
// Removes many entities at once (domain, ids)
export const REMOVE = `${MOD}/REMOVE`
// Removes all entities by domain/type
export const REMOVE_ALL = `${MOD}/REMOVE_ALL`
// Clears the whole entity cache!
export const RESET = `${MOD}/RESET`
// Updates a field inside an entity
export const UPDATE = `${MOD}/UPDATE`
