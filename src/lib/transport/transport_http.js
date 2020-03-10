'use strict';

// Libraries
const express = require('express');

// Imports
const Logable = require('../logable');

// Typedef
/**
 * @typedef {{host: string, port: number}} HttpTransportOptions
 */

// Globals
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3000;

/**
 * @class TransportHttp
 * @extends Logable
 */
class TransportHttp extends Logable {

    /**
     * @param {HttpTransportOptions} options -
     * @constructor
     */
    constructor(options) {
        super(options);

        this._app = options.app || express();

        this._host = options.host || DEFAULT_HOST;
        this._port = options.port || DEFAULT_PORT;
    }

    /**
     * Starts transport.
     * @returns {Promise<void>} -
     */
    async start() {
        return new Promise((res, rej) => {
            this._server = this._app.listen(this._port, this._host, error => {
                if (error) return rej(error);

                return res();
            });
        });
    }

    /**
     * Stops transport.
     * @returns {Promise<void>} -
     */
    async stop() {
        return new Promise((res, rej) => {
            this._server.close(error => {
                if (error) return rej(error);

                return res();
            })
        })
    }

    get app() {
        return this._app;
    }
}

module.exports = TransportHttp;
