const ClientRepository = require('./../repository/clientRepository');

class CategoryService {
    constructor({ repository }) {
        this.repository = repository;
    }
}

module.exports = CategoryService;