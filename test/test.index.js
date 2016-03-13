import * as Rx from 'rx'
import test from 'ava'
const create = require('../index').create
test(t => {
  t.is(typeof create, 'function')
})

test(t => {
  const s = new Rx.BehaviorSubject(true)
  create(s).take(5)
    .subscribe(x => x)
})
