const Util = require("../util/util");

class RentalRepository {
    async init({ file }) {
        this.file = await Util.prepareData(file);
    }
}

module.exports = RentalRepository;