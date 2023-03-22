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

    async getAllMoviesByCategoryId(categoryId) {
        const movies = await this.repository.allMoviesByCategory(categoryId);
        return movies;
    }

    async getMoviesByTimeRange(ini, end) {
        const movies = await this.repository.getMoviesByTimeRange(ini, end);
        return movies;
    }

    async getMoviesByClassification(classification) {
        const movies = await this.repository.getMoviesByClassification(classification);
        return movies;
    }

    async getMoviesThatHaveThatWordInTheName(name) {
        const movies = await this.repository.getMoviesThatHaveThatWordInTheName(name);
        return movies;
    }
}

module.exports = MovieService;