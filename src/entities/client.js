const Base = require('./base/base');

class Client extends Base {
    constructor({ id, name, birthDate, address }) {
        super({ id, name });

        this.birthDate = birthDate;
        this.address = address;

    }
}

module.exports = Tape;