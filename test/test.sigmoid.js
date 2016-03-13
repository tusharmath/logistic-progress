import test from 'ava'
import { sigmoid } from '../index'

test(t => {
  t.is(sigmoid(0, 2), 0)
  t.is(sigmoid(1, 2), 33.33333333333333)
  t.is(sigmoid(10, 1.01), 4.971064598627817)
})
