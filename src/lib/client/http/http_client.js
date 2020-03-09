'use strict';

const http = require('http');

const Logable = require('../../logable');

class HttpClient extends Logable {

    constructor(options) {
        super(options);

        this._host = options.host;
        this._port = options.port;

        this._apiPrefix = options.apiPrefix;
    }

    async request(params) {
        let result;

        const req = http.request({
            host: this._host,
            port: this._port,
            path: this._apiPrefix,
            auth: params.auth,
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        }, res => {
            res.on('data', (chunk) => {
                result += result;
            });
            res.on('end', () => {
                return result;
            });
        });

        req.on('error', error => {
            throw error;
        });

        req.write(JSON.stringify(params.body));
        req.end();
    }
}

module.exports = HttpClient;
