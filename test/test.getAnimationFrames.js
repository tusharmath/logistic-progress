import test from 'ava'
import { TestScheduler } from 'rx'
import {getAnimationFrames} from '../index'

const testSubscriber = x => {
  const out = []
  x.subscribe(x => out.push(x))
  return out
}

test(t => {
  const sh = new TestScheduler()
  const out = testSubscriber(getAnimationFrames(sh).take(5))
  sh.start()
  t.same(out, [0, 1, 2, 3, 4])
})
