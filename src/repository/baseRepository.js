class BaseRepository {

    async find(id_param) {
        if(!id_param) {
            return this.file;
        }

        return this.file.find(({ id }) => id === id_param);
    }

    async all() {
        return this.file;
    }
}

module.exports = BaseRepository;