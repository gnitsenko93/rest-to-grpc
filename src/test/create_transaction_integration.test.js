/* global describe, it, after */
'use strict';

const should = require('should');
const nock = require('nock');
const http = require('http');

const Service = require('../service');

describe('Service ', () => {
    let service;

    after(async () => {
        await service.stop();
    });

    it('should handle Transaction creation request', async () => {
        const transactionId = 'transactionId';

        const subHost = '127.0.0.1';
        const subPort = 3000;

        const pubHost = '127.0.0.1';
        const pubPort = 3001;

        service = new Service({
            "sub": {
                "host": subHost,
                "port": subPort
            },
            "pub": {
                "host": pubHost,
                "port": pubPort,
                "apiPrefix": "/api"
            }
        });

        nock(`http://${pubHost}:${pubPort}`)
            .get('/api')
            .reply(200, transactionId);

        await service.start();

        await new Promise((resolve, reject) => {
            let data = '';
            const req = http.request({
                host: subHost,
                port: subPort,
                method: 'POST',
                headers: {
                    user: 'user',
                    password: 'password'
                },
                path: '/transactions'
            }, res => {
                res.on('data', chunk => {
                    data += chunk.toString();
                });

                res.on('end', () => {
                    should(data).be.eqls(transactionId);

                    resolve();
                });
            });

            req.on('error', error => {

                reject(error);
            });

            req.write(JSON.stringify({
                amount: 10,
                addressId: 'addressId'
            }));
            req.end();
        });
    });

});
