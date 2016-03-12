/**
 * A custom sigmoid function that returns a value between 0 - 100
 *
 * @private
 * @param {Number} x - the value that needs to be transformed
 * @returns {Number}
 */
module.exports = (x) => (2 / (1 + Math.pow(2, -x)) - 1) * 100
