const e = exports
const RxDOM = require('rx-dom')
const Rx = require('rx')
const injector = require('funjector')
const partialize = injector.partialize
const RequestAnimationFrame = RxDOM.Scheduler.requestAnimationFrame

const DEFAULTS = {rate: Math.E, start: 0}

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
    .map(x => sigmoid(x + initialValue, rate))
}
  , e.sigmoid, e.getAnimationFrames)

e.getHead = () => Rx.Observable.just(0)

e.getTail = partialize((getAnimationFrames, source, body) => e
    .getStop(source)
    .withLatestFrom(body.map(Math.floor), (a, b) => b)
    .flatMap(i => getAnimationFrames()
        .map(x => (x + i + 1))
        .takeWhile(x => x <= 101)
        .map(x => x === 101 ? 0 : x))

  , e.getAnimationFrames)

e.merge = partialize((getHead, getBody, getTail, source, options) => {
  const head = getHead()
  const body = getBody(source, options.rate, options.start)
  const tail = getTail(source, body)
  return Rx.Observable.merge(head, body, tail)
}
  , e.getHead, e.getBody, e.getTail)

exports.create = (source, options) => injector
    .call(e.merge, source, Object.assign({}, DEFAULTS, options))
    .distinctUntilChanged()
