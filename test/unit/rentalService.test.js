const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');
const { writeFile } = require('fs/promises');

const RentalService = require('./../../src/service/rentalService');
const ClientService = require('./../../src/service/clientService');
const MovieService = require('./../../src/service/movieService');
const TapeService = require('./../../src/service/tapeService');
const CategoryService = require('./../../src/service/categoryService');

const RentalRepository = require('./../../src/repository/rentalRepository');
const ClientRepository = require('./../../src/repository/clientRepository');
const MovieRepository = require('./../../src/repository/movieRepository');
const TapeRepository = require('./../../src/repository/tapeRepository');
const CategoryRepository = require('./../../src/repository/categoryRepository');

const mocks = {
    allMovies: require('../mocks/movie/valid-all-movies.json'),
    allTapes: require('../mocks/tape/valid-all-tapes.json'),
    allCategories: require('../mocks/category/valid-all-categories.json'),
    allClients: require('../mocks/client/valid-all-clients.json'),
    allRentals: require('../mocks/movie/valid-all-movies.json'),
};

const seederBaseFoder = join(__dirname, "../../", "database");
const write = (filename, data) => writeFile(join(seederBaseFoder, filename), JSON.stringify(data));

const rentalDatabase  = join(__dirname, './../../database', "movies_test.json");
const movieDatabase  = join(__dirname, './../../database', "movies_test.json");
const clientDatabase  = join(__dirname, './../../database', "clients_test.json");
const tapeDatabase  = join(__dirname, './../../database', "tapes_test.json");
const categoryDatabase  = join(__dirname, './../../database', "categories_test.json");

rentalRepository = new RentalRepository();
clientRepository = new ClientRepository();
movieRepository = new MovieRepository();
tapeRepository = new TapeRepository();
categoryRepository = new CategoryRepository();

rentalRepository.init({ file: rentalDatabase }, "rental_test.json");
clientRepository.init({ file: clientDatabase }, "clients_test.json");
movieRepository.init({ file: movieDatabase }, "movies_test.json");
tapeRepository.init({ file: tapeDatabase }, "tapes_test.json");
categoryRepository.init({ file: categoryDatabase }, "categories_test.json");

/*const mockRepositoryGetMovieById = sinon.stub(movieRepository, 'find');
mockRepositoryGetMovieById.resolves(mocks.validMovie);

const mockRepositoryGetAllMovies = sinon.stub(movieRepository, 'all');
mockRepositoryGetAllMovies.resolves(mocks.validAllMovies);*/

describe('RentalService Suite Tests', () => {

    let rentalService = {};
    let clientService = {};
    let movieService = {};
    let tapeService = {};
    let categoryService = {};

    let sandbox = {};

    before(async () => {
        rentalService = new RentalService({
            repository: rentalRepository,
            clientRepository: clientRepository,
            movieRepository: movieRepository,
            tapeRepository: tapeRepository,
            categoryRepository: categoryRepository,
        });

        clientService = new ClientService({ repository: clientRepository });
        movieService = new MovieService({
            repository: movieRepository,
            categoryRepository: categoryRepository
        });
        tapeService = new TapeService({
            repository: tapeRepository,
            movieRepository: movieRepository,
        });
        categoryService = new CategoryService({ repository: categoryRepository });
    });

    beforeEach( async () => {
        sandbox = sinon.createSandbox();
        await write('categories_test.json', mocks.allCategories);
        await write('clients_test.json', mocks.allClients);
        await write('movies_test.json', mocks.allMovies);
        await write('tapes_test.json', mocks.allTapes);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create rental error by clientId is empty', async () => {
        const rental = {
            "clientId": "",
            "movies": [
                "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = { "error": "Field clientId is required"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by clientId is undefined', async () => {
        const rental = {
            "movies": [
                "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = { "error": "Field clientId is required"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by clientId is empty', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [],
        };
        const expected = { "error": "Send at least one movie"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by clientId first element is empty', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [""],
        };
        const expected = { "error": "Send at least one movie"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by client does not exist', async () => {
        const rental = {
            "clientId": "8591436b-ffff-ffff-a58d-ebef5753383f",
            "movies": [
                "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = { "error": "Client does not exist"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by movie does not exist', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "e841e9fc-a1f3-ffff-ffff-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = { "error": "Movie e841e9fc-a1f3-ffff-ffff-cd4fdd4d59ae does not exist"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by client age is not enough', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = { "error": "Client 8591436b-669b-4d4e-a58d-ebef5753383f is not old enough to watch this movie"};

        const rentalServiceMock = sinon.stub(rentalService, "calculateClientAge")
        rentalServiceMock.resolves(15)

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental error by clientId is undefined', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
        };
        const expected = { "error": "Send at least one movie"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    /*it('should return movie by id', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = mocks.validMovie;

        const result = await rentalService.makeRental(rental);

        expect(result).to.eql(expected);

    });*/
});