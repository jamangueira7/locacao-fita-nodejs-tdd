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

    async getAllMoviesByCategoryId(id) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ categoryId }) => categoryId === id);
        return result;
    }

    async getMoviesByTimeRange(ini, end) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ year }) => ini <= year && end >= end);
        return result;
    }

    async getMoviesByClassification(classification) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ classification }) => classification === classification);
        return result;
    }

    async getMoviesThatHaveThatWordInTheName(part) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ name }) => name.toLowerCase().includes(part.toLowerCase()));
        return result;
    }

    async getMoviesThatHaveThatWordInTheDescription(part) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ description }) => description.toLowerCase().includes(part.toLowerCase()));
        return result;
    }
}

module.exports = MovieService;