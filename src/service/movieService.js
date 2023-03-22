const MovieRepository = require('./../repository/movieRepository');

class MovieService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getMovieById(id) {
        const movie = await this.repository.find(id);
        return movie;
    }

    async getAllMovies() {
        const movies = await this.repository.all();
        return movies;
    }
}

module.exports = MovieService;