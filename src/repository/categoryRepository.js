const { readFile } = require('fs/promises');
const Util = require('./../util/util');
class CategoryRepository {
    constructor({ file }) {
        this.file = Util.prepareData(file);
    }

    async find(id) {
        if(!id) {
            return this.file;
        }

        return this.file.find(({ id }) => id === id);
    }

    async all() {
        return this.file;
    }
}

module.exports = CategoryRepository;