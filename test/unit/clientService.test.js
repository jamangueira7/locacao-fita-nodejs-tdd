const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const ClientService = require('./../../src/service/clientService');
const ClientRepository = require('./../../src/repository/clientRepository');

const clientDatabase  = join(__dirname, './../../database', "categories.json");

const mocks = {
    validClient: require('./../mocks/client/valid-client.json'),
};


clientRepository = new ClientRepository({
    file: clientDatabase
});

const mockRepositoryGetClientById = sinon.stub(clientRepository, 'find');
mockRepositoryGetClientById.resolves(mocks.validClient);

describe('ClientService Suite Tests', () => {

    let clientService = {};
    let sandbox = {};

    before(() => {
        clientService = new ClientService({
            repository: clientRepository
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return client by id', async () => {
        const id = "1f671f49-0e3f-442e-b764-f0a4222b5a3e";
        const expected = mocks.validClient;

        const result = await clientService.getClientById(id);

        expect(result).to.eql(expected);

    });
});