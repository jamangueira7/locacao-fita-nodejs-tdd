const ClientRepository = require('./../repository/clientRepository');

class CategoryService {
    constructor({ clients }) {
        this.clientRepository = new ClientRepository({ file: clients });
    }
}

module.exports = CategoryService;