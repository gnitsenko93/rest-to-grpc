'use strict';

// Libraries
const express = require('express');

// Imports
const Logable = require('../logable');

// Typedef
/**
 * @typedef {import('./index').TransportOptions} TransportOptions
 */

// Globals
const DEFAULT_PORT = 3000;
const DEFAULT_HOST = '127.0.0.1';

/**
 * @class TransportHttp
 */
class TransportHttp extends Logable {

    /**
     * @param {TransportOptions} options -
     * @constructor
     */
    constructor(options) {
        super(options);

        this._app = options.app || express();

        this._port = options.port || DEFAULT_PORT;
        this._host = options.host || DEFAULT_HOST;
    }

    async start() {
        return new Promise((res, rej) => {
            this._server = this._app.listen(this._port, this._host, error => {
                if (error) return rej(error);

                return res();
            });
        });
    }

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
