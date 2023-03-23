const Util = require("../util/util");

class MovieRepository {
    async init({ file }) {
        this.file = await Util.prepareData(file);
    }

    async find(id) {
        if(!id) {
            return this.file;
        }

        return this.file.find(({ id }) => id === id);
    }

    async all() {
        return this.file;
    }

    async getMoviesByClassification(classification) {
        if(!classification) {
            return this.file;
        }

        return await this.file.filter(({ classification }) => classification === classification);
    }

    async getMoviesThatHaveThatWordInTheName(part) {
        if(!part) {
            return this.file;
        }

        return await this.file.filter(({ name }) => name.toLowerCase().includes(part.toLowerCase()));
    }


}

module.exports = MovieRepository;