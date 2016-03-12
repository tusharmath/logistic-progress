const Rx = require('rx')
const u = require('./Utils')

/**
 * Returns the tail part ie. 100% and then back to 0%
 *
 * @private
 * @param {Scheduler} scheduler - should be Rx.Scheduler.requestAnimationFrame
 * @param {Observable} source - The source stream which emits boolean values
 * @returns {Observable}
 */
module.exports = (scheduler, source) => u
    .getStop(source)
    .flatMap(() => Rx.Observable.from([100, 0], (x) => x, null, scheduler))
