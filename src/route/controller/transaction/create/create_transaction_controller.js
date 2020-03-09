'use strict';

const Controller = require('../../../../lib/controller');
const Transaction = require('../../../../model/transaction');

/**
 * @class CreateTransactionController
 * @extends Controller
 */
class CreateTransactionController extends Controller {

    constructor(options) {
        super(options);

        this._transaction = new Transaction(options);
    }

    async _processRequest(req) {
        const {
            body: { amount },
            params: { addressId },
            userAuth
        } = req;

        return await this._transaction.create({ addressId, amount }, { userAuth });
    }
}

module.exports = CreateTransactionController;
