'use strict';

// Imports
const Logable = require('../logable');


/**
 * @class Controller
 * @extends Logable
 */
class Controller extends Logable {

    constructor(options) {
        super(options);
    }

    async handler(req, res) {
        try {
            const result = await this._processRequest(req);

            if (typeof result === 'undefined' || result === null) {
                res.status(204);
            } else {
                res.status(200);
                res.json(result);
            }
        } catch (error) {
            res.status(500).json({error})
        }

        return res.end();
    }

    async _processRequest(req) {
        throw new Error('_processRequest is not implemented');
    }
}

module.exports = Controller;
