const {v4: uuidv4} = require("uuid");
const Rental = require("../entities/rental");
const TapeService = require("../service/tapeService");

class RentalService {
    constructor({ repository, clientRepository, movieRepository, tapeRepository, categoryRepository }) {
        this.repository = repository;
        this.clientRepository = clientRepository;
        this.movieRepository = movieRepository;
        this.tapeRepository = tapeRepository;
        this.categoryRepository = categoryRepository;

        this.tapeService = new TapeService({
            repository: tapeRepository,
            movieRepository: movieRepository,
            rentalRepository: repository,
        });
    }

    async makeRental(rental_param) {
        try {
            if(
                !rental_param.clientId
                || rental_param.clientId === "undefined"
                || rental_param.clientId === ""
            ) {
                throw new Error("Field clientId is required");
            }

            if(
                !rental_param.movies
                || rental_param.movies === "undefined"
                || !rental_param.movies[0]
                || rental_param.movies[0] === ""
            ) {
                throw new Error("Send at least one movie");
            }

            const client = await this.clientRepository.find(rental_param.clientId.toString());
            if(!client) {
                throw new Error("Client does not exist");
            }

            let movie = [];

            const client_age = await this.calculateClientAge(client.birthDate);

            let tapeIds = [];

            for await (let movie_id of rental_param.movies) {
                movie = await this.movieRepository.find(movie_id.toString());
                if(!movie) {
                    throw new Error(`Movie ${movie_id} does not exist`);
                }

                if(client_age < movie.classification) {
                    throw new Error(`Client ${client.id} is not old enough to watch this movie`);
                }

                const tape = await this.tapeService.getRandomTapeByMovieId(movie_id);
                if(!tape) {
                    throw new Error(`Movie ${movie_id} no tapes available`);
                }
                tapeIds.push(tape.id);
            }


            const end_date = await this.calculateEndDate(1);



            const rental = new Rental({
                id: uuidv4(),
                tapeId: tapeIds,
                clientId: client.id,
                startDate: new Date(),
                endDate: end_date,
                amount: 0,
                isRent: true,
            })

            return await this.repository.create(rental);

        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async calculateEndDate(more_days) {
        let end_date = new Date();
        end_date.setDate(end_date.getDate() + more_days);

        return end_date;
    }

    async calculateClientAge(birth_date) {
        const ageDifMs = Date.now() - new Date(birth_date)
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        let client_age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return client_age;
    }

}

module.exports = RentalService;