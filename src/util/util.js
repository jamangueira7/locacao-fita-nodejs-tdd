const { readFile, writeFile } = require('fs/promises');
class Util {
    static async prepareData(file) {
        return typeof file === "object" ? file : JSON.parse(await readFile(file));
    }

}

module.exports = Util;