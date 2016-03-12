const merge = require('./src/merge')
const getBody = require('./src/getBody')
const getTail = require('./src/getTail')
const scheduler = require('rx-dom').Scheduler.requestAnimationFrame

const factory = () => {

}

exports.create = (source, speed) => factory(source, speed)
