import buildReducer from '../lib/buildReducer'
import * as ActionTypes from './actionTypes'
export * from './selectors'
export * from './actions'

function sadd(set=[], item){
  if(set.indexOf(item) === -1){
    return [item, ...set]
  }
  return set
}

function srem(set=[], item){
  return set.filter(x => x !== item)
}

function sunion(sets){
  return sets.reduce((acc, set) => {
    return set.reduce(sadd, acc)
  }, [])
}

function sdiff(sets){
  const [ first, ...rest ] = sets
  return first.filter(item =>
    rest.every(set => set.indexOf(item) === -1))
  .reduce(sadd, [])
}

function sinter(sets){
  const [ first, ...rest ] = sets
  if(!sets.every(set => set.length)) {
    return []
  }
  return first.filter(item =>
    rest.every(set => set.indexOf(item) > -1))
  .reduce(sadd, [])
}

export default buildReducer({}, {
  [ActionTypes.SADD]: (state, action) => {
    const { name, items } = action.payload
    return {
      ...state,
      [name]: items.reduce(sadd, state[name])
    }
  },
  [ActionTypes.SREM]: (state, action) => {
    const { name, items } = action.payload
    return {
      ...state,
      [name]: items.reduce(srem, state[name])
    }
  },
  [ActionTypes.SUNION]: (state, action) => {
    const { sources, target } = action.payload
    return {
      ...state,
      [target]: sunion(sources.map(setName => state[setName] || []))
    }
  },
  [ActionTypes.SDIFF]: (state, action) => {
    const { sources, target } = action.payload
    return {
      ...state,
      [target]: sdiff(sources.map(setName => state[setName] || []))
    }
  },
  [ActionTypes.SINTER]: (state, action) => {
    const { sources, target } = action.payload
    return {
      ...state,
      [target]: sinter(sources.map(setName => state[setName] || []))
    }
  },
  [ActionTypes.SMOVE]: (state, action) => {
    const { source, target, value } = action.payload
    if(!state[source]){
      throw new Error(`SMOVE - source set ${source} does not exist`)
    }
    return {
      ...state,
      [source]: srem(state[source], value),
      [target]: sadd(state[target], value)
    }
  }
})