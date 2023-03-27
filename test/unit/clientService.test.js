const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const ClientService = require('./../../src/service/clientService');
const ClientRepository = require('./../../src/repository/clientRepository');

const clientDatabase  = join(__dirname, './../../database', "clients.json");

const mocks = {
    validClient: require('./../mocks/client/valid-client.json'),
    validAllClients: require('./../mocks/client/valid-all-clients.json'),
};


clientRepository = new ClientRepository();
clientRepository.init({ file: clientDatabase }, "clients_test.json");


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

    it('should return all clients', async () => {
        const expected = mocks.validAllClients;

        const result = await clientService.getAllClients();

        expect(result).to.eql(expected);

    });

    it('should error by empty id with delete a client', async () => {
        const id = "";

        const expected = { "error": "Field id is required" };

        let result = await clientService.deleteClient(id);

        expect(result).to.eql(expected);

    });

    it('should delete a tape', async () => {
        const id = "35008d04-e815-4abe-9ea8-215c5b893381";

        const expected = { msg: `Client ${id} remove` };

        let result = await clientService.deleteClient(id);

        expect(result).to.eql(expected);
    });

    it('should by error empty field name with a create new client ', async () => {
        const new_client = {
            "name": ""
        }

        const expected = { error: "Field name is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field name with a create new client ', async () => {
        const new_client = {
            "id": ""
        }

        const expected = { error: "Field name is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error empty field birthDate with a create new client ', async () => {
        const new_client = {
            "name": "Joe Doe",
            "birthDate": ""
        }

        const expected = { error: "Field birthDate is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field birthDate with a create new client ', async () => {
        const new_client = {
            "name": "Joe Doe",
        }

        const expected = { error: "Field birthDate is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error empty field address with a create new client ', async () => {
        const new_client = {
            "name": "Joe Doe",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": ""
        }

        const expected = { error: "Field address is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field address with a create new client ', async () => {
        const new_client = {
            "name": "Joe Doe",
            "birthDate": "1962-02-25T02:27:39.938Z",
        }

        const expected = { error: "Field address is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error empty field gender with a create new client ', async () => {
        const new_client = {
            "name": "Joe Doe",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": "Hyatt Road, 0648 Santa Monica = CO",
            "gender": "",

        }

        const expected = { error: "Field gender is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field gender with a create new client ', async () => {
        const new_client = {
            "name": "Joe Doe",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": "Hyatt Road, 0648 Santa Monica = CO",
        }

        const expected = { error: "Field gender is required" };

        const result = await clientService.createClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should create a new client ', async () => {
        const expected = {
            "name": "Joe Doe",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": "Hyatt Road, 0648 Santa Monica = CO",
            "gender": "male",
        }

        let result = await clientService.createClient(expected);
        result = JSON.parse(result);

        expect(result.name).to.be.exist;
        expect(result.name).to.eql(expected.name);
        expect(result.birthDate).to.be.exist;
        expect(result.birthDate).to.eql(expected.birthDate);
        expect(result.gender).to.be.exist;
        expect(result.gender).to.eql(expected.gender);
        expect(result.address).to.be.exist;
        expect(result.address).to.eql(expected.address);
    });

    it('should by error empty field gender with update a client ', async () => {
        const new_client = {
            "name": "Joe Doe",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": "Hyatt Road, 0648 Santa Monica = CO",
            "gender": "male",

        }

        const expected = { error: "Field id is required" };

        const result = await clientService.changeClient(new_client);

        expect(result).to.eql(expected);
    });

    it('should by update a client ', async () => {
        const expected = {
            "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
            "name": "Joe Doe change",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": "Change Hyatt Road, 0648 Santa Monica = CO",
            "gender": "male",
        }

        let result = await clientService.changeClient(expected);
        result = JSON.parse(result);
        expect(result).to.eql(expected);
    });

    it('should error by delete client does not exist ', async () => {
        mockRepositoryGetClientById.resolves(null);
        const id = "951ce87c-ffff-ffff-883b-55f9b038cd9e";

        const expected = { "error": "Client does not exist" };

        let result = await clientService.deleteClient(id);

        expect(result).to.eql(expected);
    });

    it('should by update a client ', async () => {
        const client = {
            "id": "1f671f49-ffff-ffff-b764-f0a4222b5a3e",
            "name": "Joe Doe change",
            "birthDate": "1962-02-25T02:27:39.938Z",
            "address": "Change Hyatt Road, 0648 Santa Monica = CO",
            "gender": "male",
        }

        const expected = { "error": "Client does not exist" };

        let result = await clientService.changeClient(client);

        expect(result).to.eql(expected);
    });
});