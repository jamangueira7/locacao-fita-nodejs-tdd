const TapeRepository = require('./../repository/tapeRepository');

class TapeService {
    constructor({ repository }) {
        this.repository = repository;
    }
}

module.exports = TapeService;