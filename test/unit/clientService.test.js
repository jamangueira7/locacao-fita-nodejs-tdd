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
        const id = "97587e96-fa58-48d2-acb7-9f2b27a0064f";
        const expected = mocks.validCategory;

        const result = await clientService.getCategoryById(id);

        expect(result).to.eql(expected);

    });
});