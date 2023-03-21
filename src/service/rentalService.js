const RentalRepository = require('./../repository/rentalRepository');

class RentalService {
    constructor({ rentals }) {
        this.rentalRepository = new RentalRepository({ file: rentals });
    }
}

module.exports = RentalService;