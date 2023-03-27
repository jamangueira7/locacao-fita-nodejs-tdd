const BaseRepository = require("./baseRepository");
const Util = require("../util/util");

class MovieRepository extends BaseRepository  {
    async init({ file }, filename= "movies.json") {
        this.file = await Util.prepareData(file);
        this.filename = filename;
    }
}

module.exports = MovieRepository;