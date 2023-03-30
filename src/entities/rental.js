class Rental {
    constructor({ id, tapeId, clientId, startDate, endDate, amount, isRent }) {

        this.id = id;
        this.tapeId = tapeId;
        this.clientId = clientId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.isRent = isRent;
    }
}

module.exports = Rental;