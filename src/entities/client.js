const Base = require('./base');

class Client extends Base {
    constructor({ id, name, birthDate, address, gender }) {
        super({ id, name });

        this.birthDate = birthDate;
        this.address = address;
        this.gender = gender;

    }
}

module.exports = Client;