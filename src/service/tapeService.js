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

    async getAllTapesByMovieId(id) {
        const tapes = await this.repository.all();
        const result = await tapes.filter(({ movieId }) => movieId === id);
        return result;
    }

    async getAllTapesByColor(color_param) {
        const tapes = await this.repository.all();
        const result = await tapes.filter(({ color }) => color === color_param);
        return result;
    }

    async getRandomTapeByMovieId(id) {
        const tapes = await this.repository.all();
        const result = await tapes.filter(({ movieId }) => movieId === id);
        const tape_index = Math.floor(Math.random() * result.length);
        return result[tape_index];
    }
}

module.exports = TapeService;