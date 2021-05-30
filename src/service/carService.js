const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
    }
}

module.exports = CarService;
