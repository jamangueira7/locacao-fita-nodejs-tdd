const MovieRepository = require('./../repository/movieRepository');

class MovieService {
    constructor({ repository }) {
        this.repository = repository;
    }
}

module.exports = MovieService;