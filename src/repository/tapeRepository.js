const BaseRepository = require("./baseRepository");
const Util = require("../util/util");

class TapeRepository extends BaseRepository {
    async init({ file }, filename= "tapes.json") {
        this.file = await Util.prepareData(file);
        this.filename = filename;
    }
}

module.exports = TapeRepository;