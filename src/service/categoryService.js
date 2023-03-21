const CategoryRepository = require('./../repository/categoryRepository');

class CategoryService {
    constructor({ repository }) {
        this.repository = repository;
    }
}

module.exports = CategoryService;