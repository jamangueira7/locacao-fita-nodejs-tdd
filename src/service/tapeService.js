const TapeRepository = require('./../repository/tapeRepository');

class TapeService {
    constructor({ tapes }) {
        this.tapeRepository = new TapeRepository({ file: tapes });
    }
}

module.exports = TapeService;