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
};


tapeRepository = new TapeRepository();
tapeRepository.init({
    file: tapeDatabase
});


const mockRepositoryGetTapeById = sinon.stub(tapeRepository, 'find');
mockRepositoryGetTapeById.resolves(mocks.validTape);

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
});