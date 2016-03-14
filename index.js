const e = exports
const RxDOM = require('rx-dom')
const Rx = require('rx')
const injector = require('funjector')
const partialize = injector.partialize
const RequestAnimationFrame = RxDOM.Scheduler.requestAnimationFrame

const DEFAULTS = {
  startRate: Math.E,
  startAt: 0,
  endRate: 2
}

e.sigmoid = (x, rate) => (2 / (1 + Math.pow(rate, -x)) - 1) * 100

e.getStart = (source) => source.filter(x => Boolean(x))

e.getStop = (source) => source.filter(x => !Boolean(x))

e.getAnimationFrames = partialize((scheduler) => Rx
    .Observable
    .generate(0, () => true, x => x + 1, x => x, scheduler)
  , RequestAnimationFrame)

e.getBody = partialize((sigmoid, getAnimationFrames, source, rate, initialValue) => {
  const start = e.getStart(source)
  const stop = e.getStop(source)
  return start
    .flatMap(() => getAnimationFrames().takeUntil(stop))
    .map(x => sigmoid(x, rate))
    .map(x => x + initialValue)
}
  , e.sigmoid, e.getAnimationFrames)

e.getHead = () => Rx.Observable.just(0)

e.getTail = partialize((getAnimationFrames, source, body, endRate) => e
    .getStop(source)
    .withLatestFrom(body, (a, b) => b)
    .flatMap(i => {
      const valueList = [0, 100]
      const lastTwoValues = () => getAnimationFrames()
          .take(2)
          .map(() => valueList.pop())

      const tail = getAnimationFrames()
        .map(x => Math.pow(x, endRate))
        .map(x => x + i + 1)
        .map(x => Math.min(x, 100))
        .takeWhile(x => x < 100)

      return Rx.Observable.merge(tail, tail.last().flatMap(lastTwoValues))
    })
  , e.getAnimationFrames)

e.merge = partialize((getHead, getBody, getTail, source, options) => {
  const head = getHead()
  const body = getBody(source, options.startRate, options.startAt)
  const tail = getTail(source, body, options.endRate)
  return Rx.Observable.merge(head, body, tail)
}
  , e.getHead, e.getBody, e.getTail)

exports.create = (source, options) => injector
    .call(e.merge, source, Object.assign({}, DEFAULTS, options))
    .distinctUntilChanged()
