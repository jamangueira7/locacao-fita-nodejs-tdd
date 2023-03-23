const BaseRepository = require("./baseRepository");
const Util = require("../util/util");

class MovieRepository extends BaseRepository  {
    async init({ file }) {
        this.file = await Util.prepareData(file);
    }
}

module.exports = MovieRepository;