const CategoryRepository = require('./../repository/categoryRepository');

class CategoryService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getCategoryById(id) {
        const category = await this.repository.find(id);
        return category;
    }
}

module.exports = CategoryService;