'use strict';

// Imports
const Logable = require('./lib/logable');
const Transport = require('./lib/transport');
const Route = require('./route');

// Typedef
/**
 * @typedef {import('./lib/logable').Logger} Logger -
 * @typedef {import('./lib/transport').TransportOptions} TransportOptions -
 */

/**
 * @typedef {Object} ServiceOptions
 * @property {TransportOptions} options.transportOptions -
 * @property {Transport} [transport] -
 * @property {Logger} [logger] -
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

    async start() {
        this._route.init();
        return this._transport.start();
    }

    _initRoute() {
        this._route.init();
    }

    async stop() {
        return this._transport.stop();
    }
}

module.exports = Service;
