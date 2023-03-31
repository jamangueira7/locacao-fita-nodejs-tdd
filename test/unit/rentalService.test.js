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
    allRentals: require('../mocks/rental/valid-all-rentals.json'),
    validRent: require('../mocks/rental/valid-rent.json'),
    validRentDayNot5Or6: require('../mocks/rental/valid-rent-day-not-5-or-6.json'),
    validRentDayNot5Or6MoreDays2: require('../mocks/rental/valid-rent-day-not-5-or-6-more_days-2.json'),
    validRentIsSaturday: require('../mocks/rental/valid-rent-is-saturday.json'),
};

const seederBaseFoder = join(__dirname, "../../", "database");
const write = (filename, data) => writeFile(join(seederBaseFoder, filename), JSON.stringify(data));

const rentalDatabase  = join(__dirname, './../../database', "rentals_test.json");
const movieDatabase  = join(__dirname, './../../database', "movies_test.json");
const clientDatabase  = join(__dirname, './../../database', "clients_test.json");
const tapeDatabase  = join(__dirname, './../../database', "tapes_test.json");
const categoryDatabase  = join(__dirname, './../../database', "categories_test.json");

rentalRepository = new RentalRepository();
clientRepository = new ClientRepository();
movieRepository = new MovieRepository();
tapeRepository = new TapeRepository();
categoryRepository = new CategoryRepository();

rentalRepository.init({ file: rentalDatabase }, "rentals_test.json");
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
            rentalRepository: rentalRepository,
        });
        categoryService = new CategoryService({ repository: categoryRepository });
    });

    beforeEach( async () => {
        sandbox = sinon.createSandbox();
        await write('categories_test.json', mocks.allCategories);
        await write('clients_test.json', mocks.allClients);
        await write('movies_test.json', mocks.allMovies);
        await write('tapes_test.json', mocks.allTapes);
        await write('rentals_test.json', mocks.allRentals);
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


    it('should create rental error by clientId is undefined', async () => {
        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
        };
        const expected = { "error": "Send at least one movie"};

        const result = await rentalService.makeRental(rental);

        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should create rental', async () => {
        const timestamp = Date.parse("2023-03-31T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "d9db55c2-6095-4ec1-975a-d32ee844c9a8",
                "d665028c-050b-4a39-820e-79d197bca25f",
            ],
        };
        const expected = mocks.validRent;

        let result = await rentalService.makeRental(rental);

        result = JSON.parse(result);
        expect(result.id).to.be.exist;
        expect(result.clientId).to.be.exist;
        expect(result.clientId).to.eql(expected.clientId);
        expect(result.startDate).to.be.exist;
        expect(result.startDate).to.eql(expected.startDate);
        expect(result.endDate).to.be.exist;
        expect(result.endDate).to.eql(expected.endDate);
        expect(result.amount).to.be.exist;
        expect(result.amount).to.eql(expected.amount);
        expect(result.startDate).to.be.exist;
        expect(result.isRent).to.eql(expected.isRent);
    });

    it('should create rental when day is saturday ', async () => {
        const timestamp = Date.parse("2023-04-01T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "d9db55c2-6095-4ec1-975a-d32ee844c9a8",
                "d665028c-050b-4a39-820e-79d197bca25f",
            ],
        };
        const expected = mocks.validRentIsSaturday;

        let result = await rentalService.makeRental(rental);

        result = JSON.parse(result);
        expect(result.id).to.be.exist;
        expect(result.clientId).to.be.exist;
        expect(result.clientId).to.eql(expected.clientId);
        expect(result.startDate).to.be.exist;
        expect(result.startDate).to.eql(expected.startDate);
        expect(result.endDate).to.be.exist;
        expect(result.endDate).to.eql(expected.endDate);
        expect(result.amount).to.be.exist;
        expect(result.amount).to.eql(expected.amount);
        expect(result.startDate).to.be.exist;
        expect(result.isRent).to.eql(expected.isRent);
    });


    it('should create rental when days other than Friday and Saturday and number of tapes less than 2', async () => {
        const timestamp = Date.parse("2023-03-29T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "d9db55c2-6095-4ec1-975a-d32ee844c9a8",
                "d665028c-050b-4a39-820e-79d197bca25f",
            ],
        };
        const expected = mocks.validRentDayNot5Or6;

        let result = await rentalService.makeRental(rental);

        result = JSON.parse(result);
        expect(result.id).to.be.exist;
        expect(result.clientId).to.be.exist;
        expect(result.clientId).to.eql(expected.clientId);
        expect(result.startDate).to.be.exist;
        expect(result.startDate).to.eql(expected.startDate);
        expect(result.endDate).to.be.exist;
        expect(result.endDate).to.eql(expected.endDate);
        expect(result.amount).to.be.exist;
        expect(result.amount).to.eql(expected.amount);
        expect(result.startDate).to.be.exist;
        expect(result.isRent).to.eql(expected.isRent);
    });

    it('should create rental when days other than friday and saturday and number of tapes greater than 2', async () => {
        const timestamp = Date.parse("2023-03-29T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "d9db55c2-6095-4ec1-975a-d32ee844c9a8",
                "fda3e16a-2e6e-41fb-8368-3dba38372eda",
                "95e55b5b-a601-4b92-8ad6-267ed8eabc77",
            ],
        };

        const expected = mocks.validRentDayNot5Or6MoreDays2;

        let result = await rentalService.makeRental(rental);
console.log(result)
        result = JSON.parse(result);
        expect(result.id).to.be.exist;
        expect(result.clientId).to.be.exist;
        expect(result.clientId).to.eql(expected.clientId);
        expect(result.startDate).to.be.exist;
        expect(result.startDate).to.eql(expected.startDate);
        expect(result.endDate).to.be.exist;
        expect(result.endDate).to.eql(expected.endDate);
        expect(result.amount).to.be.exist;
        expect(result.amount).to.eql(expected.amount);
        expect(result.startDate).to.be.exist;
        expect(result.isRent).to.eql(expected.isRent);
    });

    it('should create rental error by no tapes available', async () => {
        const timestamp = Date.parse("2023-03-31T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const rental = {
            "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
            "movies": [
                "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
                "9c85295f-e021-4f00-9a78-e575ae08c451",
            ],
        };
        const expected = { error: "Movie 9c85295f-e021-4f00-9a78-e575ae08c451 no tapes available"};

        const result = await rentalService.makeRental(rental);
        expect(JSON.parse(result)).to.eql(expected);
    });

    it('should calculate client age', async () => {

        const timestamp = Date.parse("2023-01-04T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const result = await rentalService.calculateClientAge("2000-11-26T06:24:37.249Z");

        expect(JSON.parse(result)).to.eql(22);
    });

    it('should calculate end date', async () => {

        const timestamp = Date.parse("2023-01-04T10:11:12.000");
        sinon.useFakeTimers(timestamp);

        const result = await rentalService.calculateEndDate(1);
        const expected = "2023-1-5";

        let aux = new Date(result);
        const date_result = `${aux.getFullYear()}-${aux.getMonth() + 1}-${aux.getDate()}`;
        expect(date_result).to.eql(expected);
    });

    it('should create rental error by client age is not enough', async () => {
        const timestamp = Date.parse("2023-01-04T10:11:12.000");
        sinon.useFakeTimers(timestamp);
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
});