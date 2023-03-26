class BaseRepository {

    async find(id_param) {
        if(!id_param) {
            return this.file;
        }

        const data = this.file.find(({ id }) => id === id_param);

        if(!data) {
            return {}
        }
        return data
    }

    async all() {
        return this.file;
    }
}

module.exports = BaseRepository;