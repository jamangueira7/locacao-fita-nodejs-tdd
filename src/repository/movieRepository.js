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

    async allMoviesByCategory(id) {
        if(!id) {
            return this.file;
        }

        return await this.file.filter(({categoryId}) => {
            return categoryId === id
        });
    }
}

module.exports = MovieRepository;