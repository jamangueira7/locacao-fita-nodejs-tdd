const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const Util = require('./../../src/util/util');

const clientDatabase  = join(__dirname, './../../database', "clients.json");

const mocks = {
    validAllClients: require('./../mocks/client/valid-all-clients.json'),
};

describe('Util Suite Tests', () => {

    let sandbox = {};

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('return all client file', async () => {
        const expected = mocks.validAllClients;

        const result = await Util.prepareData(clientDatabase);

        expect(result).to.eql(expected);
    });

    it('return all client file with object JSON', async () => {
        const expected = {
            "id":"1f671f49-0e3f-442e-b764-f0a4222b5a3e",
            "name":"Estelle Pacocha",
            "birthDate":"2002-09-07T13:17:48.098Z",
            "address":"Dickens Mall, 9551 Georgetown = IN",
            "gender":"male"
        };

        const result = await Util.prepareData(expected);
        expect(result).to.eql(expected);
    });
});