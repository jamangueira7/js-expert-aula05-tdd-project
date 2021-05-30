const faker = require('faker');

const Car = require('./../src/entities/car');
const Costumes = require('./../src/entities/costumer');
const CarCategory = require('./../src/entities/carCategory');

const { join } = require('path');
const { writeFile } = require('fs/promises');

const seederBaseFoder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
});

const cars = [];

for (let index=0; index <= ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear(),
    });

    carCategory.carIds.push(car.id);
    cars.push(car);
}

const write = (filename, data) => writeFile(join(seederBaseFoder, filename), JSON.stringify(data));
;(async () => {
    await write('cars.json', cars);
    await write('carCategories.json', [carCategory]);

    console.log('##################');
    console.log('Creating  fakers');
    console.log('cars', cars);
    console.log('carCategory', carCategory);
})();
