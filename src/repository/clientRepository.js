const { readFile } = require('fs/promises');
const Util = require('./../util/util');

class ClientRepository {
    constructor({ file }) {
        this.file = Util.prepareData(file);
    }

    async find(id) {

        const content = typeof this.file === "object" ? this.file : JSON.parse(await readFile(this.file));

        if(!id) {
            return content;
        }

        return content.find(({ id }) => id === id);
    }

    async all() {
        return this.file;
    }
}

module.exports = ClientRepository;