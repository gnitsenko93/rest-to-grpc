'use strict';

const Logable = require('../../lib/logable');
const BitcoinClient = require('../../lib/client/bitcoin');

/**
 * @typedef {string} AddressId
 * @typedef {string} TransactionId
 * @typedef {Object} TransactionData
 */

/**
 * @class Transaction
 * @extends Logable
 */
class Transaction extends Logable {

    constructor(options) {
        super(options);

        this._bitcoinClient = options.bitcointClient || new BitcoinClient(options);
    }

    /**
     * Creates a transaction.
     * @param {{addressId: AddressId, amount: number}} params -
     * @param {Object} options -
     * @returns {Promise<TransactionId>} -
     */
    async create(params, options) {
        return this._bitcoinClient.createTransaction(params, options);
    }

    /**
     * Retrieves transactions.
     * @param {Object} params -
     * @param {TransactionId} [params.transactionId] -
     * @param {AddressId} [params.addressId] -
     * @param {number} [params.amount] -
     * @param {number} [params.time] -
     * @param {Object} options -
     * @returns {Promise<TransactionData|TransactionData[]>} -
     */
    async get(params, options) {
        const { transactionId } = params;

        let result;

        if (typeof transactionId !== 'undefined') {
            result = await this._bitcoinClient.getTransaction({ transactionId }, options);
        } else {
            result = await this._bitcoinClient.getTransactions(params, options);
        }

        return result;
    }
}

module.exports = Transaction;
