const BaseRepository = require("./baseRepository");
const Util = require("../util/util");

class RentalRepository extends BaseRepository {
    async init({ file }) {
        this.file = await Util.prepareData(file);
    }
}

module.exports = RentalRepository;