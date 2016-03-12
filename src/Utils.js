const e = exports

/**
 * Filters truthty values
 *
 * @private
 * @param {Observable} source
 * @returns {Observable}
 */
e.getStart = (source) => source.filter(x => Boolean(x))

/**
 * Filters falsey values
 *
 * @private
 * @param {Observable} source
 * @returns {Observable}
 */
e.getStop = (source) => source.filter(x => !Boolean(x))
