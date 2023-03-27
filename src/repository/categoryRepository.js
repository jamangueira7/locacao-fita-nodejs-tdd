const BaseRepository = require("./baseRepository");
const Util = require('./../util/util');

class CategoryRepository extends BaseRepository {

    async init({ file }, filename= "categories.json") {
        this.file = await Util.prepareData(file);
        this.filename = filename;
    }
}

module.exports = CategoryRepository;