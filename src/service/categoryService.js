const { v4: uuidv4 } = require('uuid');
const Category = require("../entities/category");

class CategoryService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getCategoryById(id) {
        const category = await this.repository.find(id);
        return category;
    }

    async getAllCategory() {
        const categories = await this.repository.all();
        return categories;
    }

    async createCategory(new_category) {
        try {
            if(
                !new_category.name
                || new_category.name === "undefined"
                || new_category.name === ""
            ) {

                throw new Error("Field name is required");
            }

            const category = new Category({
                id: uuidv4(),
                name: new_category.name
            });

            return await this.repository.create(category);
        } catch (err) {
            return { error: err.message }
        }
    }

    async changeCategory(category_param) {
        try {
            if(
                !category_param.id
                || category_param.id === "undefined"
                || category_param.id === ""
            ) {

                throw new Error("Field id is required");
            }

            const old_category = await this.repository.find(category_param.id.toString());

            if(!old_category) {
                throw new Error("Category does not exist");
            }

            const category = new Category({
                id: category_param.id,
                name: category_param.name
            });

            return await this.repository.update(category);
        } catch (err) {
            return { error: err.message }
        }
    }

    async deleteCategory(id) {
        try {
            if(
                !id
                || id === "undefined"
                || id === ""
            ) {

                throw new Error("Field id is required");
            }

            const old_category = await this.repository.find(id.toString());

            if(!old_category) {
                throw new Error("Category does not exist");
            }

            await this.repository.delete(id);

            return { msg: `Category ${id} remove`}
        } catch (err) {
            return { error: err.message }
        }
    }
}

module.exports = CategoryService;