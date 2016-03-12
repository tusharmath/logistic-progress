const Rx = require('rx')

/**
 * Creates an observable that starts with 0, has a sigmoid based body value and ends with 100 and eventually 0
 *
 * @private
 * @param {Function} getHead — function to get the Head values (0)
 * @param {Function} getBody — function to get the body values (sigmoid)
 * @param {Function} getTail — function to get the tail values (100, 0)
 * @param {Observable} source — the input stream representing the switch
 * @returns {Observable}
 */
module.exports = (getHead, getBody, getTail, source) => {
  const head = getHead(source)
  const body = getBody(source)
  const tail = getTail(source)
  return Rx.Observable.merge(head, body, tail)
}
