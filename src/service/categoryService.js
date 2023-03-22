const CategoryRepository = require('./../repository/categoryRepository');

class CategoryService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getCategoryById(id) {
        const category = await this.repository.find(id);
        return category;
    }

    async getAllCategory(id) {
        const categories = await this.repository.all();
        return categories;
    }
}

module.exports = CategoryService;