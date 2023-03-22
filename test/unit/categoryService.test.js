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
};


categoryRepository = new CategoryRepository({
    file: categoryDatabase
});

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
});