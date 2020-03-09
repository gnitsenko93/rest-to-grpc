'use strict';

const Controller = require('../../../../lib/controller');
const Address = require('../../../../model/address');

class CreateAddressController extends Controller {

    constructor(options) {
        super(options);

        this._address = new Address(options);
    }

    async _processRequest(req) {
        const { userAuth } = req;

        return await this._address.create({}, { userAuth });
    }
}

module.exports = CreateAddressController;
