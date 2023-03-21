class Rental {
    constructor({ id, tapeId, clientId, startDate, endDate }) {

        this.id = id;
        this.tapeId = tapeId;
        this.clientId = clientId;
        this.startDate = startDate;
        this.endDate = endDate;


    }
}

module.exports = Rental;