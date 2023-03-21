const CategoryRepository = require('./../repository/categoryRepository');

class CategoryService {
    constructor({ categories }) {
        this.categoryRepository = new CategoryRepository({ file: categories });
    }
}

module.exports = CategoryService;