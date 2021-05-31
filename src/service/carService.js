const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
    }

    getAvailableCar() {
        return this.carRepository.find();
    }
}

module.exports = CarService;
