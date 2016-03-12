const e = require('./Utils')

module.exports = (source, sigmoid, getAnimationFrames) => {
  const start = e.getStart(source)
  const stop = e.getStop(source)
  return start
    .flatMap(() => getAnimationFrames())
    .takeUntil(stop)
    .map(x => sigmoid(x))
}
