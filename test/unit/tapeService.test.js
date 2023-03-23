const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { join } = require('path');
const { expect } = require('chai');

const TapeService = require('./../../src/service/tapeService');
const TapeRepository = require('./../../src/repository/tapeRepository');

const tapeDatabase  = join(__dirname, './../../database', "tapes.json");

const mocks = {
    validTape: require('./../mocks/tape/valid-tape.json'),
    validAllTapes: require('./../mocks/tape/valid-all-tapes.json'),
    validAllTapesByMovieId: require('./../mocks/tape/valid-all-tapes-by-movieid.json'),
    validAllTapesByColor: require('./../mocks/tape/valid-all-tapes-by-color.json'),
    validRandomTape: require('./../mocks/tape/valid-random-tape.json'),
};


tapeRepository = new TapeRepository();
tapeRepository.init({
    file: tapeDatabase
});


const mockRepositoryGetTapeById = sinon.stub(tapeRepository, 'find');
mockRepositoryGetTapeById.resolves(mocks.validTape);

const mockRepositoryGetAllTapes = sinon.stub(tapeRepository, 'all');
mockRepositoryGetAllTapes.resolves(mocks.validAllTapes);

describe('TapeService Suite Tests', () => {

    let tapeService = {};
    let sandbox = {};

    before(() => {
        tapeService = new TapeService({
            repository: tapeRepository
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return tape by id', async () => {
        const id = "8186123a-aaa3-414e-a1f6-8888e2cee196";
        const expected = mocks.validTape;

        const result = await tapeService.getTapeById(id);

        expect(result).to.eql(expected);
    });

    it('should return all tapes', async () => {
        const expected = mocks.validAllTapes;

        const result = await tapeService.getAllTapes();

        expect(result).to.eql(expected);
    });

    it('should return all tapes by movieId', async () => {
        const movieId = "a6e634fd-1c79-4062-9d4b-61ead6cf2b8c";
        const expected = mocks.validAllTapesByMovieId;

        const result = await tapeService.getAllTapesByMovieId(movieId);
        expect(result).to.eql(expected);
    });

    it('should return random tape by color', async () => {
        const color = "green";
        const expected = mocks.validAllTapesByColor;

        const result = await tapeService.getAllTapesByColor(color);
        expect(result).to.eql(expected);
    });

    it('should return random tape by movieId', async () => {
        const id = "a6e634fd-1c79-4062-9d4b-61ead6cf2b8c";

        sinon.stub(Math, Math.random.name).returns(0);

        const expected = mocks.validRandomTape;

        const result = await tapeService.getRandomTapeByMovieId(id);

        expect(result).to.eql(expected);
    });
});

