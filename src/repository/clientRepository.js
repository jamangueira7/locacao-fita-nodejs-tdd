const BaseRepository = require("./baseRepository");
const Util = require('./../util/util');

class ClientRepository extends BaseRepository {
    async init({ file }, filename= "clients.json") {
        this.file = await Util.prepareData(file);
        this.filename = filename;
    }
}

module.exports = ClientRepository;