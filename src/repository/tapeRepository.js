const BaseRepository = require("./baseRepository");
const Util = require("../util/util");

class TapeRepository extends BaseRepository {
    async init({ file }) {
        this.file = await Util.prepareData(file);
    }
}

module.exports = TapeRepository;