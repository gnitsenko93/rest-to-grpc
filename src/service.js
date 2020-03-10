'use strict';

// Imports
const Logable = require('./lib/logable');
const Transport = require('./lib/transport');
const Route = require('./route');

// Typedef
/**
 * @typedef {{host: string, port: number}} SubOptions -
 * @typedef {{host: string, port: number, apiPrefix: string}} PubOptions -
 */

/**
 * @typedef {Object} ServiceOptions
 * @property {SubOptions} sub -
 * @property {PubOptions} pub -
 */

/**
 * @class Service
 * @extends Logable
 */
class Service extends Logable {

    /**
     * @param {ServiceOptions} options -
     * @constructor
     */
    constructor(options) {
        super(options);

        this._transport = options.transport || new Transport.TransportHttp(options.sub);
        this._route = new Route({...options, transport: this._transport});
    }

    /**
     * Starts service.
     * @returns {Promise<void>} -
     */
    async start() {
        this._route.init();
        return this._transport.start();
    }

    /**
     * Inits routes.
     * @returns {void} -
     * @private
     */
    _initRoute() {
        this._route.init();
    }

    /**
     * Stops service.
     * @returns {Promise<void>} -
     */
    async stop() {
        return this._transport.stop();
    }
}

module.exports = Service;
