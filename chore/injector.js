const toArray = x => Array.prototype.slice.call(x)
const get = exports.get = (func) => {
  if (typeof func !== 'function') {
    return func
  }
  if (func.inject) {
    const injections = func.inject.map(get)
    return function () {
      const args = toArray(arguments)
      return func.apply(this, injections.concat(args))
    }
  }
  return func
}
