const {v4: uuidv4} = require("uuid");
const Tape = require("../entities/tape");

class TapeService {
    constructor({ repository, movieRepository, rentalRepository }) {
        this.repository = repository;
        this.movieRepository = movieRepository;
        this.rentalRepository = rentalRepository;
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

        for await (let tape of result) {
            let rentals = await this.rentalRepository.all();

            rentals.filter(async (rental) => {
                for await (let tape_id of rental.tapeId) {

                    if (tape_id === tape.id && rental.isRent) {
                        const index = result.indexOf(rental);
                        result.splice(index, 1);
                        return true;
                    }
                }
            });
        }

        if(result.length === 0) {
            return false;
        }

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
            const movie = await this.movieRepository.find(new_tape.movieId.toString());
            if(!movie) {
                throw new Error("Movie does not exist");
            }

            const tape = new Tape({
                id: uuidv4(),
                color: new_tape.color,
                movieId: new_tape.movieId
            });

            return await this.repository.create(tape);
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async deleteTape(id) {
        try {
            if(
                !id
                || id === "undefined"
                || id === ""
            ) {

                throw new Error("Field id is required");
            }

            const old = await this.repository.find(id.toString());

            if(!old) {
                throw new Error("Tape does not exist");
            }

            await this.repository.delete(id);

            return JSON.stringify({ msg: `Tape ${id} remove`});
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }
}

module.exports = TapeService;