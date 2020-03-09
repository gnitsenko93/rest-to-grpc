'use strict';

const Logable = require('../../lib/logable');
const BitcoinClient = require('../../lib/client/bitcoin');

/**
 * @class Address
 * @extends Logable
 */
class Address extends Logable {

    constructor(options) {
        super(options);

        this._bitcoinClient = options.bitcoinClient || new BitcoinClient(options);
    }

    async create(options) {
        return this._bitcoinClient.createAddress(options);
    }
}

module.exports = Address;
