const RentalRepository = require('./../repository/rentalRepository');

class RentalService {
    constructor({ repository, clientRepository, movieRepository, tapeRepository, categoryRepository }) {
        this.repository = repository;
        this.clientRepository = clientRepository;
        this.movieRepository = movieRepository;
        this.tapeRepository = tapeRepository;
        this.categoryRepository = categoryRepository;
    }

    async makeRental(rental) {
        try {
            if(
                !rental.clientId
                || rental.clientId === "undefined"
                || rental.clientId === ""
            ) {
                throw new Error("Field clientId is required");
            }

            if(
                !rental.movies
                || rental.movies === "undefined"
                || !rental.movies[0]
                || rental.movies[0] === ""
            ) {
                throw new Error("Send at least one movie");
            }

            const client = await this.clientRepository.find(rental.clientId.toString());
            if(!client) {
                throw new Error("Client does not exist");
            }

            let movie = [];

            const client_age = await this.calculateClientAge(client.birthDate);

            for await (let movie_id of rental.movies) {
                movie = await this.movieRepository.find(movie_id.toString());
                if(!movie) {
                    throw new Error(`Movie ${movie_id} does not exist`);
                }

                if(client_age < movie.classification) {
                    throw new Error(`Client ${client.id} is not old enough to watch this movie`);
                }
            }

        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async calculateClientAge(birth_date) {
        const ageDifMs = Date.now() - new Date(birth_date)
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        let client_age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return client_age;
    }

}

module.exports = RentalService;