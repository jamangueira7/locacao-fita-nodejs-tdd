const RentalRepository = require('./../repository/rentalRepository');

class RentalService {
    constructor({ repository }) {
        this.repository = repository;
    }
}

module.exports = RentalService;