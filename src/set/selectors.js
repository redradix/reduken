import curry from 'lodash.curry'

const root = state => state.set

const emptySet = []
const getSet = curry((name, state) => root(state)[name] || emptySet)

export const scard = curry(function scard(name, state){
  return getSet(name, state).length
})

export const sisMember = curry(function sisMember(name, value, state){
  const set = getSet(name, state)
  return set.indexOf(value) > -1
})

export const smembers = curry(function smembers(name, state){
  return getSet(name, state)
})

export const srand = curry(function srand(name, state){
  const set = getSet(name, state)
  const idx = Math.floor(Math.random()*set.length)
  return set[idx]
})