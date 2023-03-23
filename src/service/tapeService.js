const TapeRepository = require('./../repository/tapeRepository');

class TapeService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getTapeById(id) {
        const tape = await this.repository.find(id);
        return tape;
    }

    async getAllTapes() {
        const tapes = await this.repository.all();
        return tapes;
    }
}

module.exports = TapeService;