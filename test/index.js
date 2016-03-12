import test from 'ava'
const create = require('../index').create
test(t => {
  t.is(typeof create, 'function')
})
