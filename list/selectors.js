import curry from 'lodash/curry'

const root = state => state.list

export const getList = curry(function getList(list, state) {
  return root(state)[list] || []
})

export const len = curry(function len(target, state) {
  const data = getList(target, state)
  return data.length
})

export const lget = curry(function lget(target, index, state) {
  const data = getList(target, state)
  if (index > data.length - 1) {
    throw new Error(`index ${index} is out of bounds for list '${target}'`)
  }
  return data[index]
})

export const lrange = curry(function lrange(target, start, stop, state) {
  const data = getList(target, state)
  return data.slice(start, stop)
})
