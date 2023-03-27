const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const MovieService = require('./../../src/service/movieService');
const MovieRepository = require('./../../src/repository/movieRepository');
const CategoryRepository = require('./../../src/repository/categoryRepository');

const movieDatabase  = join(__dirname, './../../database', "movies.json");
const categoryDatabase  = join(__dirname, './../../database', "categories.json");

const mocks = {
    validMovie: require('./../mocks/movie/valid-movie.json'),
    validAllMovies: require('../mocks/movie/valid-all-movies.json'),
    validAllMoviesByCategory: require('./../mocks/movie/valid-all-movies-by-category.json'),
    validAllMoviesRange: require('../mocks/movie/valid-all-movies-range-1997-2010.json'),
    validAllMoviesClassification12: require('../mocks/movie/valid-all-movies-by-classification-12.json'),
    validAllMoviesByPartOfName: require('../mocks/movie/valid-all-movies-by-part-of-name.json'),
    validAllMoviesByPartOfDescription: require('../mocks/movie/valid-all-movies-by-part-of-description.json'),
};

categoryRepository = new CategoryRepository();
categoryRepository.init({ file: categoryDatabase }, "category_test.json");

movieRepository = new MovieRepository();
movieRepository.init({ file: movieDatabase }, "movies_test.json");


const mockRepositoryGetMovieById = sinon.stub(movieRepository, 'find');
mockRepositoryGetMovieById.resolves(mocks.validMovie);

const mockRepositoryGetAllMovies = sinon.stub(movieRepository, 'all');
mockRepositoryGetAllMovies.resolves(mocks.validAllMovies);

describe('MovieService Suite Tests', () => {

    let movieService = {};
    let sandbox = {};

    before(() => {
        movieService = new MovieService({
            repository: movieRepository,
            categoryRepository: categoryRepository,
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

    it('should error by empty id with delete a movie', async () => {
        const id = "";

        const expected = { "error": "Field id is required" };

        let result = await movieService.deleteMovie(id);

        expect(result).to.eql(expected);

    });

    it('should delete a movie', async () => {
        const id = "9fdecb96-bbec-46f7-bfc3-ded2ac16d54b";

        const expected = { msg: `Movie ${id} remove` };

        let result = await movieService.deleteMovie(id);

        expect(result).to.eql(expected);
    });

    it('should by error empty field name with a create new movie ', async () => {
        const new_movie = {
            "name": "",
        }

        const expected = { error: "Field name is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field name with a create new client ', async () => {
        const new_movie = {
            "id": "",
        }

        const expected = { error: "Field name is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error empty field description with a create new movie ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "",
        }

        const expected = { error: "Field description is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field description with a create new client ', async () => {
        const new_movie = {
            "name": "Test Name",
        }

        const expected = { error: "Field description is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error empty field categoryId with a create new movie ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "",
        }

        const expected = { error: "Field categoryId is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field categoryId with a create new client ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "test description",
        }

        const expected = { error: "Field categoryId is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error empty field year with a create new movie ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
            "year": "",
        }

        const expected = { error: "Field year is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field year with a create new client ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
        }

        const expected = { error: "Field year is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error empty field classification with a create new movie ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
            "year": 2023,
            "classification": "",
        }

        const expected = { error: "Field classification is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should by error undefined field classification with a create new client ', async () => {
        const new_movie = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
            "year": 2023,
        }

        const expected = { error: "Field classification is required" };

        const result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });

    it('should create a new client ', async () => {
        const expected = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
            "year": 2023,
            "classification": 18,
        }

        let result = await movieService.createMovie(expected);
        result = JSON.parse(result);

        expect(result.name).to.be.exist;
        expect(result.name).to.eql(expected.name);
        expect(result.description).to.be.exist;
        expect(result.description).to.eql(expected.description);
        expect(result.categoryId).to.be.exist;
        expect(result.categoryId).to.eql(expected.categoryId);
        expect(result.year).to.be.exist;
        expect(result.year).to.eql(expected.year);
        expect(result.classification).to.be.exist;
        expect(result.classification).to.eql(expected.classification);
    });

    it('should error by delete movie does not exist ', async () => {
        mockRepositoryGetMovieById.resolves(null);
        const id = "951ce87c-ffff-ffff-883b-55f9b038cd9e";

        const expected = { "error": "Movie does not exist" };

        let result = await movieService.deleteMovie(id);

        expect(result).to.eql(expected);
    });

    it('should error by update movie does not exist ', async () => {

        const new_movie = {
            "name": "Test Name",
            "description": "test description",
            "categoryId": "951ce87c-ffff-ffff-883b-55f9b038cd9e",
            "year": 2023,
            "classification": 18,
        }

        const expected = { "error": "Category does not exist" };

        let result = await movieService.createMovie(new_movie);

        expect(result).to.eql(expected);
    });
});