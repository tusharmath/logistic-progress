const Rx = require('rx')
/**
 * Schedules value generation from 0 to Infinity using Rx.Scheduler.requestAnimationFrame
 *
 * @private
 * @param {Scheduler} scheduler - Rx.Scheduler.requestAnimationFrame
 * @returns {Observable}
 */
module.exports = (scheduler) => Rx
    .Observable
    .generate(0, () => true, x => x + 1, x => x, scheduler
)
