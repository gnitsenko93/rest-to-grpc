'use strict';

const Logable = require('../../logable');
const HttpClient = require('../http');

/**
 * @typedef {{pub: {host: string, port: number, apiPrefix: string}}} BitcointClientOptions
 * @typedef {string} AddressId
 * @typedef {string} TransactionId
 * @typedef {Object} TransactionData
 * @typedef {{user: string, password: string}} UserAuth -
 */

/**
 * @class BitcointClient
 * @extends Logable
 */
class BitcointClient extends Logable {

    /**
     * @param {BitcointClientOptions} options -
     * @constructor
     */
    constructor(options) {
        super(options);

        this._httpClient = options.client || new HttpClient(options.pub);

        this._jsonrpc = options.jsonrpc;

    }

    /**
     * Creates an address at bitcoin server.
     * @param {Object} params -
     * @param {{userAuth: UserAuth}} options -
     * @returns {Promise<AddressId>} -
     */
    async createAddress(params, options) {
        const reqParams = this._getReqParams({
            method: BitcointClient.METHOD.GET_NEW_ADDRESS,
            data: []
        }, options);

        return this._httpClient.request(reqParams);
    }

    /**
     * Gets a transaction from bitcoin server.
     * @param {{transactionId: TransactionId}} params -
     * @param {{userAuth: UserAuth}} options -
     * @returns {Promise<TransactionData>} -
     */
    async getTransaction(params, options) {
        const {
            transactionId
        } = params;

        const reqParams = this._getReqParams({
            method: BitcointClient.METHOD.GET_TRANSACTION,
            data: [transactionId]
        }, options);

        const result = await this._httpClient.request(reqParams);

        return JSON.parse(result);
    }

    /**
     * Creates a transaction at bitcoin server.
     * @param {{amount: number, addressId: AddressId}} params -
     * @param {{userAuth: UserAuth}} options -
     * @returns {Promise<TransactionId>} -
     */
    async createTransaction(params, options) {
        const {
            addressId, amount
        } = params;

        const reqParams = this._getReqParams({
            method: BitcointClient.METHOD.SEND_TO_ADDRESS,
            data: [addressId, amount]
        }, options);

        return this._httpClient.request(reqParams);
    }

    async getTransactions() {
        // TODO: Implemen getTransactions
        throw new Error('Not yet implemented');
    }

    /**
     * Converts parameters to gRPC data.
     * @param {Object} params -
     * @param {{userAuth: UserAuth}} options -
     * @returns {{auth: string, body: {method: *, id: *, jsonrpc: *, params: *}}} -
     * @private
     */
    _getReqParams(params, options) {
        const {
            id, method, data
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
                params: data
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
