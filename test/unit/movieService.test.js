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
    validAllMoviesRange: require('../mocks/movie/valid-all-movies-range-1997-2010.json'),
    validAllMoviesClassification12: require('../mocks/movie/valid-all-movies-by-classification-12.json'),
    validAllMoviesByPartOfName: require('../mocks/movie/valid-all-movies-by-part-of-name.json'),
    validAllMoviesByPartOfDescription: require('../mocks/movie/valid-all-movies-by-part-of-description.json'),
};

movieRepository = new MovieRepository();

movieRepository.init({
    file: movieDatabase
})

const mockRepositoryGetMovieById = sinon.stub(movieRepository, 'find');
mockRepositoryGetMovieById.resolves(mocks.validMovie);

const mockRepositoryGetAllMovies = sinon.stub(movieRepository, 'all');
mockRepositoryGetAllMovies.resolves(mocks.validAllMovies);

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

    it('should return all movies major 1997 and minor 2010', async () => {
        const init = 1997;
        const end = 2010;
        const expected = mocks.validAllMoviesRange;

        const result = await movieService.getMoviesByTimeRange(init, end);

        expect(result).to.eql(expected);
    });

    it('should return all movies by classification: 12', async () => {
        const classification = 12;
        const expected = mocks.validAllMoviesClassification12;

        const result = await movieService.getMoviesByClassification(classification);
        expect(result).to.eql(expected);
    });

    it('should return all movies that have that word in the name', async () => {
        const name = "South";
        const expected = mocks.validAllMoviesByPartOfName;

        const result = await movieService.getMoviesThatHaveThatWordInTheName(name);
        expect(result).to.eql(expected);
    });

    it('should return all movies that have that word in the description', async () => {
        const name = "South";
        const expected = mocks.validAllMoviesByPartOfDescription;

        const result = await movieService.getMoviesThatHaveThatWordInTheDescription(name);

        expect(result).to.eql(expected);
    });
});