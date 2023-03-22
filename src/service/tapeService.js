const TapeRepository = require('./../repository/tapeRepository');

class TapeService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getTapeById(id) {
        const tape = await this.repository.find(id);
        return tape;
    }
}

module.exports = TapeService;