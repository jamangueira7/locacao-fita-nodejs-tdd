const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const MovieService = require('./../../src/service/movieService');
const MovieRepository = require('./../../src/repository/movieRepository');

const movieDatabase  = join(__dirname, './../../database', "movies.json");

const mocks = {
    validMovie: require('./../mocks/movie/valid-movie.json'),
    validAllMovies: require('../mocks/movie/valid-all-movies.json'),
    validAllMoviesByCategory: require('./../mocks/movie/valid-all-movies-by-category.json'),
};

movieRepository = new MovieRepository();

movieRepository.init({
    file: movieDatabase
})

const mockRepositoryGetMovieById = sinon.stub(movieRepository, 'find');
mockRepositoryGetMovieById.resolves(mocks.validMovie);

describe('MovieService Suite Tests', () => {

    let movieService = {};
    let sandbox = {};

    before(() => {
        movieService = new MovieService({
            repository: movieRepository
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return movie by id', async () => {
        const id = "8186123a-aaa3-414e-a1f6-8888e2cee196";
        const expected = mocks.validMovie;

        const result = await movieService.getMovieById(id);

        expect(result).to.eql(expected);

    });

    it('should return all movies', async () => {
        const expected = mocks.validAllMovies;

        const result = await movieService.getAllMovies();

        expect(result).to.eql(expected);
    });

   it('should return all movies by Category', async () => {
        const id = "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9";
        const expected = mocks.validAllMoviesByCategory;

        const result = await movieService.getAllMoviesByCategoryId(id);

        expect(result).to.eql(expected);
    });
});