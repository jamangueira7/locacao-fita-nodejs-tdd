const { writeFile } = require('fs/promises');
const { join } = require('path');

const seederBaseFolder = join(__dirname, "../../", "database");

class BaseRepository {

    async find(id_param) {
        if(!id_param) {
            return this.file;
        }

        const data = this.file.find(({ id }) => id === id_param);

        if(!data) {
            return;
        }
        return data
    }

    async all() {
        return this.file;
    }

    async create(entity) {

        this.file.push(entity);

        await writeFile(join(seederBaseFolder, this.filename), JSON.stringify(this.file));
        return JSON.stringify(entity);
    }

    async update(entity) {
        await this.delete(entity.id);
        this.file.push(entity);
        await writeFile(join(seederBaseFolder, this.filename), JSON.stringify(this.file));
        return JSON.stringify(entity);
    }

    async delete(id_param) {
        const aux = await this.find(id_param.toString());

        const index = this.file.indexOf(aux);
        this.file.splice(index, 1);

        await writeFile(join(seederBaseFolder, this.filename), JSON.stringify(this.file));
        return;
    }
}

module.exports = BaseRepository;