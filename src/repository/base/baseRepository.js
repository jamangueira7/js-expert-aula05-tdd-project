const { readFile } = require('fs/promises');

class BaseRepository {

    constructor({ file }) {
        this.file = file;
    }

    async find(itemId) {

        const content = typeof this.file === "object" ? this.file : JSON.parse(await readFile(this.file));

        if(!itemId) {
            return content;
        }

        return content.find(({ id }) => id === itemId);
    }
}

module.exports = BaseRepository;
