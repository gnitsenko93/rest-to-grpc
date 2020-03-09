'use strict';

// Imports
const Logable = require('../lib/logable');
const Transport = require('../lib/transport');
const Middleware = require('./middleware');
const Controller = require('./controller');


/**
 * @class Route
 * @extends Logable
 */
class Route extends Logable {

    constructor(options) {
        super(options);

        this._options = options;
        this._transport = options.transport || Transport.TransportHttp(options.sub);

    }

    /**
     * Inits routing of a service.
     * @returns {void} -
     */
    init() {
        this._transport.app.all('*', Middleware.Common.AddUserAuth);

        this._transport.app.post('/addresses', Controller.factory(Controller.Address.Create, this._options));

        this._transport.app.post('/transactions', Middleware.Common.AddJsonBody);
        this._transport.app.post('/transactions', Controller.factory(Controller.Transaction.Create, this._options));

        this._transport.app.get('/transactions', Controller.factory(Controller.Transaction.Get, this._options));
        this._transport.app.get('/transactions/:transactionId', Controller.factory(Controller.Transaction.Get, this._options));
    }
}

module.exports = Route;
