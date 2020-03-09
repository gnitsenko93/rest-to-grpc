/* global describe, it, afterEach */
'use strict';

const sinon = require('sinon');
const should = require('should');

const GetTransActionController = require('../get_transaction_controller');

describe('GetTransactionController handler', () => {
    let transactionId = 'transactionId';
    let transactionData = { foo: 'foo' };

    let getTransactionController, bitcoinClientMock;

    const reqMock = {
        end: () => reqMock, json: () => reqMock, status: () => reqMock
    };

    let processRequestSpy, statusSpy;

    afterEach(() => {
        processRequestSpy.restore();
        statusSpy.restore();
    });


    it('should return transactionId if a transaction exists', async () => {
        bitcoinClientMock = {
            getTransaction: () => Promise.resolve(transactionData)
        };

        getTransactionController = new GetTransActionController({
            bitcoinClient: bitcoinClientMock
        });

        processRequestSpy = sinon.spy(getTransactionController, '_processRequest');
        statusSpy = sinon.spy(reqMock, 'status');

        await getTransactionController.handler({
            params: { transactionId }
        }, reqMock);

        should(processRequestSpy.getCall(0).returnValue).be.resolvedWith(transactionData);
        should(statusSpy.getCall(0).args[0]).be.eql(200);
    });

    it('should respond with 5xx error if not connection with bitcoin server', async () => {
        bitcoinClientMock = {
            getTransaction: () => Promise.reject('no connection')
        };

        getTransactionController = new GetTransActionController({
            bitcoinClient: bitcoinClientMock
        });

        processRequestSpy = sinon.spy(getTransactionController, '_processRequest');
        statusSpy = sinon.spy(reqMock, 'status');

        await getTransactionController.handler({
            params: { transactionId }
        }, reqMock);

        should(processRequestSpy.getCall(0).returnValue).be.rejectedWith('no connection');
        should(statusSpy.getCall(0).args[0]).be.eql(500);
    });
});
