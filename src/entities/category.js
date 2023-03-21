const Base = require('./base');

class Category extends Base {
    constructor({ id, name }) {
        super({ id, name });
    }
}

module.exports = Category;