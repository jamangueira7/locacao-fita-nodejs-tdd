const MovieRepository = require('./../repository/movieRepository');

class MovieService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getMovieById(id) {
        const movie = await this.repository.find(id);
        return movie;
    }
}

module.exports = MovieService;