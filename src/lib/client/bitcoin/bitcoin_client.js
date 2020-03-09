'use strict';

const Logable = require('../../logable');
const HttpClient = require('../http');

class BitcointClient extends Logable {

    constructor(options) {
        super(options);

        this._httpClient = options.client || new HttpClient(options);

        this._jsonrpc = options.jsonrpc;

    }

    async createAddress(params, options) {
        const reqParams = this._getReqParams({
            method: BitcointClient.METHOD.GET_NEW_ADDRESS,
            params: []
        });

        return this._httpClient.request(reqParams);
    }

    async getTransaction(params, options) {
        const {
            transactionId
        } = params;

        const reqParams = this._getReqParams({
            method: BitcointClient.METHOD.GET_TRANSACTION,
            params: [transactionId]
        });

        const result = await this._httpClient.request(reqParams);

        return JSON.parse(result);
    }

    async createTransaction(params, options) {
        const {
            addressId, amount
        } = params;

        const reqParams = this._getReqParams({
            method: BitcointClient.METHOD.SEND_TO_ADDRESS,
            params: [addressId, amount]
        });

        return this._httpClient.request(reqParams);
    }

    async getTransactions(params, options) {
        // TODO

        throw new Error('Not yet implemented');
    }

    _getReqParams(params, options) {
        const {
            id, method, params
        } = params;
        const {
            userAuth
        } = options;

        return {
            auth: this._getReqAuth(userAuth),
            body: {
                id,
                jsonrpc: this._jsonrpc,
                method,
                params
            }
        }
    }

    _getReqAuth(userAuth) {
        return `${userAuth.user}:${userAuth.password}`;
    }

    static get METHOD() {
        return {
            GET_NEW_ADDRESS: 'getnewaddress',
            SEND_TO_ADDRESS: 'sendtoaddress',
            GET_TRANSACTION: 'gettransaction'
        }
    }
}

module.exports = BitcointClient;
