import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import { getBody } from '../index'
const {onNext} = ReactiveTest

const testSubscriber = x => {
  const out = []
  x.subscribe(x => out.push(x))
  return out
}

test(t => {
  const sh = new TestScheduler()
  const sigmoid = (x, i) => x * i * 10
  const source = sh.createHotObservable(
    onNext(210, true),
    onNext(220, false)
  )
  const getAnimationFrames = () => sh.createHotObservable(
      onNext(205, 1),
      onNext(215, 2),
      onNext(225, 3)
  )
  const out = testSubscriber(getBody(sigmoid, getAnimationFrames, source, 3, 0))
  sh.start()
  t.same(out, [30, 60])
})

test('start', t => {
  const sh = new TestScheduler()
  const sigmoid = (x, i) => x * i
  const source = sh.createHotObservable(
    onNext(210, true),
    onNext(220, false)
  )
  const animationFrames = sh.createHotObservable(
    onNext(205, 1),
    onNext(215, 2),
    onNext(225, 3)
  )
  const getAnimationFrames = () => animationFrames
  const out = testSubscriber(getBody(sigmoid, getAnimationFrames, source, 3, 100))
  sh.start()
  t.same(out, [306])
})

test('start:multiple', t => {
  const sh = new TestScheduler()
  const sigmoid = (x, i) => x * i
  const source = sh.createHotObservable(
    onNext(210, true),
    onNext(220, false),
    onNext(230, true),
    onNext(240, false)
  )
  const animationFrames = sh.createHotObservable(
    onNext(205, 1),
    onNext(215, 2),
    onNext(225, 3),
    onNext(235, 4),
    onNext(245, 5)
  )
  const getAnimationFrames = () => animationFrames
  const out = testSubscriber(getBody(sigmoid, getAnimationFrames, source, 3, 100))
  sh.start()
  t.same(out, [306, 312])
})
