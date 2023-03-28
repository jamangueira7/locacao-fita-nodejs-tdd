const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const CategoryService = require('./../../src/service/categoryService');
const CategoryRepository = require('./../../src/repository/categoryRepository');

const categoryDatabase  = join(__dirname, './../../database', "categories.json");

const mocks = {
    validCategory: require('./../mocks/category/valid-category.json'),
    validAllCategories: require('./../mocks/category/valid-all-categories.json'),
    validCategoryRemove: require('./../mocks/category/valid-category-remove.json'),
};


categoryRepository = new CategoryRepository();
categoryRepository.init({ file: categoryDatabase }, "categories_test.json");

const mockRepositoryGetCategoryById = sinon.stub(categoryRepository, 'find');
mockRepositoryGetCategoryById.resolves(mocks.validCategory);

describe('CategoryService Suite Tests', () => {

    let categoryService = {};
    let sandbox = {};

    before(() => {
        categoryService = new CategoryService({
            repository: categoryRepository
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return category by id', async () => {

        const id = "97587e96-fa58-48d2-acb7-9f2b27a0064f";
        const expected = mocks.validCategory;

        const result = await categoryService.getCategoryById(id);

        expect(result).to.eql(expected);

    });

    it('should return all categories', async () => {

        const expected = mocks.validAllCategories;

        const result = await categoryService.getAllCategory();

        expect(result).to.eql(expected);

    });

    it('should create new category by error empty field name', async () => {
        const new_category = {
            "name": ""
        }

        const expected = { error: "Field name is required" };

        const result = await categoryService.createCategory(new_category);

        expect(JSON.parse(result)).to.eql(expected);

    });

    it('should create new category by error undefined field name', async () => {
        const new_category = {
            "id": ""
        }

        const expected = { error: "Field name is required" };

        const result = await categoryService.createCategory(new_category);

        expect(JSON.parse(result)).to.eql(expected);

    });

    it('should create new category', async () => {
        const expected = {
            "name": "test"
        }

        let result = await categoryService.createCategory(expected);
        result = JSON.parse(result);

        expect(result.name).to.be.exist;

    });

    it('should update category by error empty field name', async () => {
        const new_category = {
            "id": ""
        }

        const expected = { error: "Field id is required" };

        const result = await categoryService.changeCategory(new_category);

        expect(JSON.parse(result)).to.eql(expected);

    });

    it('should update category by error undefined field id', async () => {
        const new_category = {
            "name": ""
        }

        const expected = { error: "Field id is required" };

        const result = await categoryService.changeCategory(new_category);

        expect(JSON.parse(result)).to.eql(expected);

    });

    it('should update a category', async () => {
        const expected = {
            "id": "06a7b337-18dc-4690-a12b-911b01937376",
            "name": "update"
        }

        let result = await categoryService.changeCategory(expected);
        result = JSON.parse(result);

        expect(result).to.eql(expected);

    });

    it('should update a category error by does not exist', async () => {
        mockRepositoryGetCategoryById.resolves(null);
        const param = {
            "id": "06a7b337-ffff-4fff-a12b-911b01937376",
            "name": "update"
        }

        const expected = { error: "Category does not exist" };

        let result = await categoryService.changeCategory(param);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should delete a category', async () => {
        mockRepositoryGetCategoryById.resolves(mocks.validCategoryRemove);

        const id = "06a7b337-18dc-4690-a12b-911b01937376";

        const expected = { msg: `Category ${id} remove` };

        let result = await categoryService.deleteCategory(id);

        expect(JSON.parse(result)).to.eql(expected);

    });

    it('should delete a category error by empty id', async () => {
        mockRepositoryGetCategoryById.resolves(mocks.validCategoryRemove);

        const id = "";

        const expected = { "error": "Field id is required" };

        let result = await categoryService.deleteCategory(id);

        expect(JSON.parse(result)).to.eql(expected);

    });

    it('should delete a category error by category does not exist', async () => {
        mockRepositoryGetCategoryById.resolves(null);

        const id = "06a7b337-ffff-4690-ffff-911b01937376";

        const expected = { "error": "Category does not exist" };

        let result = await categoryService.deleteCategory(id);

        expect(JSON.parse(result)).to.eql(expected);

    });
});