const { readFile, writeFile } = require('fs/promises');
class Util {
    constructor({ file }) {
        this.file = file;
    }

    async currentFileConent() {
        return JSON.parse(await readFile(this.file));
    }

    async find(itemId) {
        const all = await this.currentFileConent();
        if(!itemId) {
            return all;
        }

        return all.find(({ id }) => itemId === id );
    }

    async findByCarId(carId) {
        const all = await this.currentFileConent();

        return all.find(({ carIds }) => carIds.includes(carId));
    }

}

module.exports = Util;