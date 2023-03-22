const { readFile } = require('fs/promises');

class CategoryRepository {
    constructor({ file }) {
        this.file = file;
    }

    async find(id) {

        const content = typeof this.file === "object" ? this.file : JSON.parse(await readFile(this.file));

        if(!id) {
            return content;
        }

        return content.find(({ id }) => id === id);
    }
}

module.exports = CategoryRepository;