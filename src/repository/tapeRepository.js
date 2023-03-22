const Util = require("../util/util");
class TapeRepository {
    async init({ file }) {
        this.file = await Util.prepareData(file);
    }

    async find(id) {

        const content = typeof this.file === "object" ? this.file : JSON.parse(await readFile(this.file));

        if(!id) {
            return content;
        }

        return content.find(({ id }) => id === id);
    }
}

module.exports = TapeRepository;