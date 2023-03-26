const BaseRepository = require("./baseRepository");
const Util = require('./../util/util');

const { writeFile } = require('fs/promises');
const { join } = require('path');

const seederBaseFolder = join(__dirname, "../../", "database");

class CategoryRepository extends BaseRepository {

    async init({ file }, filename= "categories.json") {
        this.file = await Util.prepareData(file);
        this.filename = filename;
    }

    async create(category) {

        this.file.push(category);

        writeFile(join(seederBaseFolder, this.filename), JSON.stringify(this.file));
        return JSON.stringify(category);
    }

    async update(category) {
        await this.delete(category.id);
        this.file.push(category);
        writeFile(join(seederBaseFolder, this.filename), JSON.stringify(this.file));
        return JSON.stringify(category);
    }

    async delete(id_param) {
        const aux = this.find(id_param.toString());

        const index = this.file.indexOf(aux);
        this.file.splice(index, 1);

        writeFile(join(seederBaseFolder, this.filename), JSON.stringify(this.file));
        return;
    }
}

module.exports = CategoryRepository;