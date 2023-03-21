const faker = require('faker');

const Tape = require('./../src/entities/tape');
const Movie = require('../src/entities/movie');
const Category = require('./../src/entities/category');
const Client = require('./../src/entities/client');

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

const carCategory2 = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
});

const cars = [];
const customers = [];

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

    const customer = new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({ min: 18, max: 50 }),
    });

    customers.push(customer);
}

const car2 = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
});

cars.push(car2);

carCategory2.carIds.push(car2.id);

const write = (filename, data) => writeFile(join(seederBaseFoder, filename), JSON.stringify(data));

;(async () => {
    await write('cars.json', cars);
    await write('customers.json', customers);
    await write('carCategories.json', [carCategory, carCategory2]);

    console.log('##################');
    console.log('Creating  fakers');
    console.log('cars', cars);
    console.log('customers', customers);
    console.log('carCategory', carCategory);
})();