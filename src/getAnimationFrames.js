const Rx = require('rx')

module.exports = (scheduler) => Rx
    .Observable
    .generate(0, () => true, x => x + 1, x => x, scheduler
)
