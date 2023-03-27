const {v4: uuidv4} = require("uuid");
const TapeRepository = require('./../repository/tapeRepository');
const Tape = require("../entities/tape");

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


    async createTape(new_tape) {
        try {
            if(
                !new_tape.color
                || new_tape.color === "undefined"
                || new_tape.color === ""
            ) {

                throw new Error("Field color is required");
            }

            if(
                !new_tape.movieId
                || new_tape.movieId === "undefined"
                || new_tape.movieId === ""
            ) {

                throw new Error("Field movieId is required");
            }

            const tape = new Tape({
                id: uuidv4(),
                color: new_category.color,
                movieId: new_category.movieId
            });

            return await this.repository.create(tape);
        } catch (err) {
            return { error: err.message }
        }
    }
}

module.exports = TapeService;