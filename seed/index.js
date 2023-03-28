const { faker } = require('@faker-js/faker');

const Tape = require('./../src/entities/tape');
const Movie = require('../src/entities/movie');
const Category = require('./../src/entities/category');
const Client = require('./../src/entities/client');

const { join } = require('path');
const { writeFile } = require('fs/promises');

const seederBaseFoder = join(__dirname, "../", "database");

const mocks = {
    allCategories: require("../test/mocks/category/valid-all-categories.json"),
    allClients: require("../test/mocks/client/valid-all-clients.json"),
    allTapes: require("../test/mocks/tape/valid-all-tapes.json"),
    allMovies: require("../test/mocks/movie/valid-all-movies.json"),
}

const ITEMS_AMOUNT_CATEGORY = 3;
const ITEMS_AMOUNT_MOVIE = 30;
const ITEMS_AMOUNT_TAPE = 60;
const ITEMS_AMOUNT_CLIENT = 5;

const categories = [];
for (let index=0; index <= ITEMS_AMOUNT_CATEGORY; index++) {
    const category = new Category({
        id: faker.datatype.uuid(),
        name: faker.random.word()
    });

    categories.push(category);
}

const movies = [];
const classification = [0, 12, 16, 18];
for (let index=0; index <= ITEMS_AMOUNT_MOVIE; index++) {
    const randomNumber = Math.floor(Math.random() * classification.length);
    const randomCategory = Math.floor(Math.random() * categories.length);
    const movie = new Movie({
        id: faker.datatype.uuid(),
        name: faker.random.words(5),
        description: faker.random.words(10),
        categoryId: categories[randomCategory].id,
        year: faker.datatype.number({ min: 1950, max: 2020 }),
        classification: classification[randomNumber],
    });

    movies.push(movie);
}

const clients = [];

for (let index=0; index <= ITEMS_AMOUNT_CLIENT; index++) {
    const client = new Client({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        address: `${faker.address.street()}, ${faker.address.buildingNumber()} ${faker.address.cityName()} = ${faker.address.stateAbbr()}`,
        gender: faker.name.sexType()
    });

    clients.push(client);
}

const tapes = [];

for (let index=0; index <= ITEMS_AMOUNT_TAPE; index++) {
    const randomMovie = Math.floor(Math.random() * movies.length);
    const tape = new Tape({
        id: faker.datatype.uuid(),
        color: faker.commerce.color(),
        movieId: movies[randomMovie].id,
    });

    tapes.push(tape);
}


const write = (filename, data) => writeFile(join(seederBaseFoder, filename), JSON.stringify(data));

;(async () => {
    await write('categories.json', categories);
    await write('movies.json', movies);
    await write('clients.json', clients);
    await write('tapes.json', tapes);

    console.log('##################');
    console.log('Creating fakers');
    console.log('-----------------');
    console.log('categories', categories);
    console.log('-----------------');
    console.log('movies', movies);
    console.log('-----------------');
    console.log('clients', clients);
    console.log('-----------------');
    console.log('tapes', tapes);

    console.log('##################');
    console.log('Creating tests database');
    console.log('-----------------');
    console.log('categories_test', mocks.allCategories);
    await write('categories_test.json', mocks.allCategories);
    console.log('-----------------');
    console.log('clients_test', mocks.allClients);
    await write('clients_test.json', mocks.allClients);
    console.log('-----------------');
    console.log('movies_test', mocks.allMovies);
    await write('movies_test.json', mocks.allMovies);
    console.log('-----------------');
    console.log('tapes_test', categories);
    await write('tapes_test.json', mocks.allMovies);
})();