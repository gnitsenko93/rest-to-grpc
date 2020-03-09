/* global console */
'use strict';

// Typedef
/**
 * @typedef {{debug: function(string, string), error: function(string, string)}} Logger -
 * @typedef {{logger: Logger}} LogableOptions
 */

/**
 * @class Logable
 */
class Logable {

    /**
     * @param {LogableOptions} options -
     * @constructor
     */
    constructor(options = {}) {
        this._logger = options.logger || console;
    }

    /**
     * Debugs a message.
     * @param {string} message -
     * @param {string} [requestId] -
     * @returns {void} -
     */
    debug(message, requestId) {
        this._logger.log(`[${requestId}]: ${message}`);
    }

    /**
     * Debugs an error.
     * @param {string} message -
     * @param {string} [requestId] -
     * @returns {void} -
     */
    error(message, requestId) {
        this._logger.error(`[${requestId}]: ${message}`);
    }
}

module.exports = Logable;
