const Base = require('./base');

class Movie extends Base {
    constructor({ id, name, description, categoryId, year, classification }) {
        super({ id, name });

        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.year = year;
        this.classification = classification;

    }
}

module.exports = Movie;