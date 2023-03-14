const BaseRepository = require('./../repository/base/baseRepository');
const Tax = require('./../entities/tax');
const Transaction = require('./../entities/transaction');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
        this.taxesBaseOnAge = Tax.taxesBaseOnAge;
        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    async getAvailableCar(carCategory) {

        let avaliableCar = [];

        await carCategory.carIds.map(async (id) => {
            const car = await this.carRepository.find(id)

            if(car.available) {
                avaliableCar.push(car.id);
            }
        })


        if(avaliableCar.length === 0) {
            return false;
        }

        carCategory.carIds = avaliableCar;

        const cardId = await this.chooseRandomCar(carCategory);

        const car = await this.carRepository.find(cardId);

        return car;
    }

    chooseRandomCar(carCategory) {

        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
        const carId = carCategory.carIds[randomCarIndex];

        return carId;
    }

    getRandomPositionFromArray(list) {
        const listLength = list.length;


        return Math.floor(
          Math.random() * (listLength)
        );

    }

    calculateFinalPrice(customer, carCategory, numberOfDay) {
        const { age } = customer;
        const price = carCategory.price;
        const { then: tax } = this.taxesBaseOnAge.find((tax) => age >= tax.from && age <= tax.to);

        const finalPrice = ((tax * price) * (numberOfDay));
        const formattedPrice = this.currencyFormat.format(finalPrice);

        return formattedPrice;
    }

    async rent( customer, carCategory, numberOfDay) {
        const car = await this.getAvailableCar(carCategory);
        const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDay);

        const today = new Date();
        today.setDate(today.getDate() + numberOfDay);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const dueDate = today.toLocaleDateString('pt-br', options);

        const transaction = new Transaction({
            customer,
            car,
            amount: finalPrice,
            dueDate
        });

        return transaction;
    }
}

module.exports = CarService;
