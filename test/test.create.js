import * as Rx from 'rx'
import test from 'ava'

const create = require('../index').create
test(t => {
  t.is(typeof create, 'function')
})

test.cb(t => {
  const out = []
  const s = new Rx.BehaviorSubject(true)
  create(s)
    .take(10)
    .subscribe((x) => out.push(x), null, () => {
      t.same(out, [
        0,
        46.21171572600098,
        76.15941559557646,
        90.51482536448663,
        96.4027580075817,
        98.66142981514305,
        99.50547536867307,
        99.81778976111988,
        99.93292997390672,
        99.97532108480274
      ])
      t.end()
    })
})
