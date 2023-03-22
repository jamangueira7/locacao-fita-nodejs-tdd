const ClientRepository = require('./../repository/clientRepository');

class ClientService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getClientById(id) {
        const client = await this.repository.find(id);
        return client;
    }
}

module.exports = ClientService;