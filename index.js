const Rx = require('rx')
const RxDOM = require('rx-dom')
const e = exports

e.getAnimationFrames = () => Rx
    .Observable
    .generate(
      0, () => true, x => x + 1, x => x,
      RxDOM.Scheduler.requestAnimationFrame
)

e.getStart = (source) => source.filter(x => Boolean(x))
e.getStop = (source) => source.filter(x => !Boolean(x))
e.getTail = () => Rx.Observable.from(
    [100, 0],
    (x) => x, null, RxDOM.Scheduler.requestAnimationFrame
)
e.tail = (source) => e.start(source).flatMap(() => e.createTail())

e.sigmoid = (x, speed) => (2 / (1 + Math.pow(2, -x * speed)) - 1) * 100

e.body = (e, source, speed) => {
  const start = e.start(source)
  const stop = e.stop(source)
  return start
    .flatMap(() => e.getAnimationFrames())
    .map(x => e.sigmoid(x, speed))
    .takeUntil(stop)
}

e.create = (e, source, speed) => {
  const head = Rx.Observable.return(0)
  const body = e.body(source, speed)
  const tail = e.tail(source)

  return Rx.Observable.merge(head, body, tail)
}
