export const alwaysArray = data => (Array.isArray(data) ? data : [data])

// Object keys must be strings, if not assocPath creates
// an array instead of an object.
export const alwaysStringPath = path => path.map(String)
