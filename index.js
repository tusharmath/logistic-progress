const Rx = require('rx')
const e = exports
e.getStart = (source) => source.filter(x => Boolean(x))
e.getStop = (source) => source.filter(x => !Boolean(x))
e.getAnimationFrames = (scheduler) => Rx
    .Observable
    .generate(0, () => true, x => x + 1, x => x, scheduler
)
e.getBody = (source, sigmoid, getAnimationFrames) => {
  const start = e.getStart(source)
  const stop = e.getStop(source)
  return start
    .flatMap(() => getAnimationFrames())
    .takeUntil(stop)
    .map(x => sigmoid(x))
}
e.getHead = () => Rx.Observable.just(0)
e.getTail = (scheduler, source) => e
    .getStop(source)
    .flatMap(() => Rx.Observable.from([100, 0], (x) => x, null, scheduler))
e.merge = (getHead, getBody, getTail) => {
  const head = getHead()
  const body = getBody()
  const tail = getTail()
  return Rx.Observable.merge(head, body, tail)
}
e.sigmoid = (x) => (2 / (1 + Math.pow(2, -x)) - 1) * 100
exports.create = (source, speed) => true
