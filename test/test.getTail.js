import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import {getTail} from '../index'
const {onNext} = ReactiveTest

const testSubscriber = x => {
  const out = []
  x.subscribe(x => out.push(x))
  return out
}

test(t => {
  const sh = new TestScheduler()
  const source = sh.createHotObservable(
    onNext(210, true),
    onNext(220, false),
    onNext(230, true),
    onNext(240, false)
  )
  const out = testSubscriber(getTail(sh, source))
  sh.start()
  t.same(out, [100, 0, 100, 0])
})
