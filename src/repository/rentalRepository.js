const BaseRepository = require("./baseRepository");
const Util = require("../util/util");

class RentalRepository extends BaseRepository {
    async init({ file }, filename= "rentals.json") {
        this.file = await Util.prepareData(file);
        this.filename = filename;
    }
}

module.exports = RentalRepository;