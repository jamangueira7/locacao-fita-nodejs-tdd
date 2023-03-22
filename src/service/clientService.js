const ClientRepository = require('./../repository/clientRepository');

class ClientService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getClientById(id) {
        const client = await this.repository.find(id);
        return client;
    }

    async getAllClients() {
        const clients = await this.repository.all();
        return clients;
    }
}

module.exports = ClientService;