const e = require('./Utils')
/**
 * Dispatches a value between 0 - 100, never actually reaching 100.
 *
 * @param {Observable} source - The input source determining when to start/stop
 * @param {Function} sigmoid - The custom sigmoid function that converts an number into a value between 0 & 100.
 * @returns {Observable}
 */
module.exports = (source, sigmoid, getAnimationFrames) => {
  const start = e.getStart(source)
  const stop = e.getStop(source)
  return start
    .flatMap(() => getAnimationFrames())
    .takeUntil(stop)
    .map(x => sigmoid(x))
}
