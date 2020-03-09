'use strict';

const Controller = require('../../../../lib/controller');
const Transaction = require('../../../../model/transaction');

/**
 * @class GetTransactionController
 * @extends Controller
 */
class GetTransactionController extends Controller {

    constructor(options) {
        super(options);

        this._transaction = new Transaction(options);
    }

    async _processRequest(req) {
        const {
            params: { transactionId },
            query,
            userAuth
        } = req;

        return await this._transaction.get({ transactionId, ...query }, { userAuth });
    }
}

module.exports = GetTransactionController;
