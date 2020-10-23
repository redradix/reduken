import { path as getPath, curry } from 'ramda'
import { alwaysArray } from './utils'

/**
 * Get a single property from a hash
 */
export const getFromPath: (
  path: string[],
  state: object,
) => any = curry((path, state) => {
  return getPath(['hash',...alwaysArray(path)], state)
})
