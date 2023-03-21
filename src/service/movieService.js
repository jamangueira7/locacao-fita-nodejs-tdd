const MovieRepository = require('./../repository/movieRepository');

class MovieService {
    constructor({ movies }) {
        this.movieRepository = new MovieRepository({ file: movies });
    }
}

module.exports = MovieService;