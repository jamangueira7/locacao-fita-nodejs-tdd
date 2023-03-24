const BaseRepository = require("./baseRepository");
const Util = require('./../util/util');
class CategoryRepository extends BaseRepository {

    async init({ file }) {
        this.file = await Util.prepareData(file);
    }
}

module.exports = CategoryRepository;