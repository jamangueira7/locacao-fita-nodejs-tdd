const { describe, it, beforeEach, afterEach } = require('mocha');
const request = require('supertest');
const assert = require('assert');
const { expect } = require("chai");
const sinon = require("sinon");
const http = require("http");
const { join } = require('path');
const { writeFile } = require('fs/promises');

const seederBaseFoder = join(__dirname, "../../", "database");
const App = require('../../src/app');

const SERVER_TEST_PORT = 3001;

const mocks = {
    allCategories: require("../mocks/category/valid-all-categories.json"),
    category: require("../mocks/category/valid-category.json"),
    allClients: require("../mocks/client/valid-all-clients.json"),
    client: require("../mocks/client/valid-client.json"),
    allTapes: require("../mocks/tape/valid-all-tapes.json"),
    tape: require("../mocks/tape/valid-tape.json"),
    allTapeByColor: require("../mocks/tape/valid-all-tapes-by-color.json"),
    allTapeByMovieId: require("../mocks/tape/valid-all-tapes-by-movieid.json"),
    randomTapeByMovieId: require("../mocks/tape/valid-random-tape.json"),
    allMovies: require("../mocks/movie/valid-all-movies.json"),
    movie: require("../mocks/movie/valid-movie.json"),
    moviesByCategory: require("../mocks/movie/valid-all-movies-by-category.json"),
    moviesByClassification: require("../mocks/movie/valid-all-movies-by-classification-12.json"),
    moviesByRange: require("../mocks/movie/valid-all-movies-range-1997-2010.json"),
    moviesByPartOfName: require("../mocks/movie/valid-all-movies-by-part-of-name.json"),
    moviesByPartOfDesc: require("../mocks/movie/valid-all-movies-by-part-of-description.json"),
}

const write = (filename, data) => writeFile(join(seederBaseFoder, filename), JSON.stringify(data));

describe("API Suite test", () => {
    let api = {};
    let sandbox = sinon.createSandbox();

    beforeEach( async() => {
        await write('categories_test.json', mocks.allCategories);
        await write('clients_test.json', mocks.allClients);
        await write('movies_test.json', mocks.allMovies);
        await write('tapes_test.json', mocks.allTapes);
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Connection", () => {
        it("should start with server 3000", () => {
            const api = new App();

            sandbox.spy(api);
            sandbox.stub(http, http.createServer.name).returns({
                listen: (port, callback) => {}
            });

            api.createServer();

            expect(api.createServer.getCall(0).args[0]).to.be.equal(undefined);
        });

        it("should start the server on createServer method", () => {
            const api = new App();
            const portTest = 6000;

            sandbox.spy(api);
            sandbox.stub(http, http.createServer.name).returns({
                listen: (port, callback) => {}
            });

            api.createServer("test", portTest);

            expect(http.createServer.callCount).to.be.equal(1);
            expect(api.createServer.getCall(0).args[1]).to.be.equal(portTest);
        });
    });

    describe("/Routes", () => {
        before(() => {
            const instance = new App();

            api = {
                instance,
                server: instance.createServer("test", SERVER_TEST_PORT),
            };
        });

        describe("/Default - 404", () => {
            it('request default routes return status 404', async () => {
                await request(api.server)
                    .get('/')
                    .expect(404);
            });

            it('request default routes return default test', async () => {
                const expected = { msg: '404 - Essa rota não existe.' };

                await request(api.server)
                    .get('/')
                    .expect(expected);
            });
        });

        describe('/categories', () => {

            it('request all categories', async () => {
                const expected = {
                    categories: mocks.allCategories
                };

                await request(api.server)
                    .get(`/categories`)
                    .expect(expected.categories);

            });

            it('request category by id', async () => {
                const expected = {
                    category: mocks.category
                };

                await request(api.server)
                    .get(`/category`)
                    .query({ id: "97587e96-fa58-48d2-acb7-9f2b27a0064f" })
                    .expect(expected.category);

            });

            it('create category error by empty name', async () => {
                const expected = { error: 'Field name is required' };

                const response = await request(api.server)
                    .post(`/category`)
                    .send({
                        "name": ""
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create category error by undefined name', async () => {
                const expected = { error: 'Field name is required' };

                const response = await request(api.server)
                    .post(`/category`)
                    .send({
                        "id": ""
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create category', async () => {
                const expected = {
                    "name": "test API"
                };

                const response = await request(api.server)
                    .post(`/category`)
                    .send({
                        "name": "test API"
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);
                assert.deepStrictEqual(aux.name, expected.name);
            });

            it('update category error by id empty', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/category/change`)
                    .send({
                        "id": "",
                        "name": "test API change"
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('update category error by id undefined', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/category/change`)
                    .send({
                        "name": "test API change"
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('update category error by category does not exist', async () => {
                const expected = { error: 'Category does not exist' };

                const response = await request(api.server)
                    .post(`/category/change`)
                    .send({
                        "id": "678470d4-ffff-ffff-9ecd-b81c15e6aa21",
                        "name": "test API change"
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('update category', async () => {
                const expected = {
                    "id": "42153792-2d54-4159-99e6-d09b0c419b2f",
                    "name": "test API change"
                };

                const response = await request(api.server)
                    .post(`/category/change`)
                    .send({
                        "id": "42153792-2d54-4159-99e6-d09b0c419b2f",
                        "name": "test API change"
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);
                assert.deepStrictEqual(aux.name, expected.name);
                assert.deepStrictEqual(aux.id, expected.id);
            });

            it('delete category error by empty id', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/category/delete`)
                    .send({
                        "id": "",
                    })
                    .expect(200);

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('delete category error by id undefined', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/category/delete`)
                    .send({
                        "name": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
                    })
                    .expect(200);

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('delete category ', async () => {
                const expected = { msg: "Category ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9 remove" };

                const response = await request(api.server)
                    .post(`/category/delete`)
                    .send({
                        "id": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
                    })
                    .expect(200);

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });
        });

        describe('/clients', () => {
            it('request all clients', async () => {
                const expected = {
                    clients: mocks.allClients
                };

                await request(api.server)
                    .get(`/clients`)
                    .expect(expected.clients);

            });

            it('request client by id', async () => {
                const expected = {
                    client: mocks.client
                };

                await request(api.server)
                    .get(`/client`)
                    .query({ id: "1f671f49-0e3f-442e-b764-f0a4222b5a3e" })
                    .expect(expected.client);

            });

            it('create client error by name empty', async () => {
                const expected = { error: 'Field name is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "male",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by name undefined', async () => {
                const expected = { error: 'Field name is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "male",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by birthDate empty', async () => {
                const expected = { error: 'Field birthDate is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "Client test",
                        "birthDate": "",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "male",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by birthDate undefined', async () => {
                const expected = { error: 'Field birthDate is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "Client test",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "male",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by address empty', async () => {
                const expected = { error: 'Field address is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "",
                        "gender": "male",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by address undefined', async () => {
                const expected = { error: 'Field address is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "gender": "male",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by gender empty', async () => {
                const expected = { error: 'Field gender is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client error by gender undefined', async () => {
                const expected = { error: 'Field gender is required' };

                const response = await request(api.server)
                    .post(`/client`)
                    .send({
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create client', async () => {
                const expected = {
                    "name": "Client test",
                    "birthDate": "2002-09-07T13:17:48.098Z",
                    "address": "Dickens Mall, 9551 Georgetown = IN",
                    "gender": "male",
                };

                const response = await request(api.server)
                    .post(`/client`)
                    .send(expected)
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.name, expected.name);
                assert.deepStrictEqual(aux.birthDate, expected.birthDate);
                assert.deepStrictEqual(aux.address, expected.address);
                assert.deepStrictEqual(aux.gender, expected.gender);
            });

            it('update client error by id empty', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/client/change`)
                    .send({
                        "id": "",
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('update client error by id undefined', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/client/change`)
                    .send({
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('update client error by client does not exist', async () => {
                const expected = {
                    "error": "Client does not exist",
                };

                const response = await request(api.server)
                    .post(`/client/change`)
                    .send({
                        "id": "179a8334-ffff-ffff-aec4-2b76d7d3eea5",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('update client', async () => {
                const expected = {
                    "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
                    "name": "Client test change",
                    "birthDate": "2002-09-07T13:17:48.098Z",
                    "address": "Dickens Mall, 9551 Georgetown = IN change",
                    "gender": "male",
                };

                const response = await request(api.server)
                    .post(`/client/change`)
                    .send(expected)
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('delete client error by id empty', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/client/delete`)
                    .send({
                        "id": "",
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                        "gender": "",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('delete client error by id undefined', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/client/delete`)
                    .send({
                        "name": "Client test",
                        "birthDate": "2002-09-07T13:17:48.098Z",
                        "address": "Dickens Mall, 9551 Georgetown = IN",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('delete client error by client does not exist', async () => {
                const expected = {
                    "error": "Client does not exist",
                };

                const response = await request(api.server)
                    .post(`/client/delete`)
                    .send({
                        "id": "179a8334-ffff-ffff-aec4-2b76d7d3eea5",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('delete client', async () => {
                const expected = {
                    "msg": "Client 1f671f49-0e3f-442e-b764-f0a4222b5a3e remove",
                };

                const response = await request(api.server)
                    .post(`/client/delete`)
                    .send({
                        "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });
        });

        describe('/tapes', () => {
            it('request all tales', async () => {
                const expected = {
                    tapes: mocks.allTapes
                };

                await request(api.server)
                    .get(`/tapes`)
                    .expect(expected.tapes);

            });

            it('request tape by id', async () => {
                const expected = {
                    tape: mocks.tape
                };

                await request(api.server)
                    .get(`/tape`)
                    .query({ id: "150e9058-0281-4608-bcf4-98fa7aecdfcc" })
                    .expect(expected.tape);

            });

            it('request tape by color', async () => {
                const expected = {
                    tape: mocks.allTapeByColor
                };

                await request(api.server)
                    .get(`/tape`)
                    .query({ color: "green" })
                    .expect(expected.tape);

            });

            it('request tape by moveId', async () => {
                const expected = {
                    tape: mocks.allTapeByMovieId
                };

                await request(api.server)
                    .get(`/tape`)
                    .query({ movieId: "a6e634fd-1c79-4062-9d4b-61ead6cf2b8c" })
                    .expect(expected.tape);

            });

            it('request random tape by moveId', async () => {
                const expected = {
                    tape: mocks.randomTapeByMovieId
                };

                sandbox
                    .stub(api.instance.tapeService, "getRandomTapeByMovieId")
                    .resolves(expected.tape)

                await request(api.server)
                    .get(`/tape/random`)
                    .query({ movieId: "a6e634fd-1c79-4062-9d4b-61ead6cf2b8c" })
                    .expect(expected.tape);

            });

            it('create tape error by color empty', async () => {
                const expected = { error: 'Field color is required' };

                const response = await request(api.server)
                    .post(`/tape`)
                    .send({
                        "color": "",
                        "movieId": "7e5c8719-313f-445b-83d9-21d1ecf78b91",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create tape error by color undefined', async () => {
                const expected = { error: 'Field color is required' };

                const response = await request(api.server)
                    .post(`/tape`)
                    .send({
                        "name": "test API change",
                        "movieId": "7e5c8719-313f-445b-83d9-21d1ecf78b91",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create tape error by movieId empty', async () => {
                const expected = { error: 'Field movieId is required' };

                const response = await request(api.server)
                    .post(`/tape`)
                    .send({
                        "color": "blue",
                        "movieId": "",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create tape error by movieId undefined', async () => {
                const expected = { error: 'Field movieId is required' };

                const response = await request(api.server)
                    .post(`/tape`)
                    .send({
                        "name": "test API change",
                        "color": "blue",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create tape error by movie does not exist', async () => {
                const expected = {
                    "msg": "Movie does not exist",
                };

                const response = await request(api.server)
                    .post(`/tape`)
                    .send({
                        "color": "blue",
                        "movieId": "7e5c8719-fff-fff-83d9-21d1ecf78b91",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('create tape', async () => {
                const expected = {
                    "color": "blue",
                    "movieId": "7e5c8719-313f-445b-83d9-21d1ecf78b91",
                };

                const response = await request(api.server)
                    .post(`/tape`)
                    .send(expected)
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('create tape error by color empty', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/tape/delete`)
                    .send({
                        "id": "",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('create tape error by color undefined', async () => {
                const expected = { error: 'Field id is required' };

                const response = await request(api.server)
                    .post(`/tape/delete`)
                    .send({
                        "name": "",
                    })
                    .expect(200)

                assert.deepStrictEqual(JSON.parse(response.text), expected);
            });

            it('delete tape error by tape does not exist', async () => {
                const expected = {
                    "error": "Tape does not exist",
                };

                const response = await request(api.server)
                    .post(`/tape/delete`)
                    .send({
                        "id": "179a8334-ffff-ffff-aec4-2b76d7d3eea5",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('delete tape', async () => {
                const expected = {
                    "msg": "Tape 179a8334-eb33-4b5d-aec4-2b76d7d3eea5 remove",
                };

                const response = await request(api.server)
                    .post(`/tape/delete`)
                    .send({
                        "id": "179a8334-eb33-4b5d-aec4-2b76d7d3eea5",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });
        });

        describe('/movies', () => {
            it('request all movies', async () => {
                const expected = {
                    movies: mocks.allMovies
                };

                await request(api.server)
                    .get(`/movies`)
                    .expect(expected.movies);

            });

            it('request movie by id', async () => {
                const expected = {
                    movie: mocks.movie
                };

                await request(api.server)
                    .get(`/movie`)
                    .query({ id: "8186123a-aaa3-414e-a1f6-8888e2cee196" })
                    .expect(expected.movie);

            });

            it('request movie by categoryId', async () => {
                const expected = {
                    movie: mocks.moviesByCategory
                };

                await request(api.server)
                    .get(`/movie`)
                    .query({ categoryId: "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9" })
                    .expect(expected.movie);

            });

            it('request movie by classification', async () => {
                const expected = {
                    movie: mocks.moviesByClassification
                };

                await request(api.server)
                    .get(`/movie`)
                    .query({ classification: 12 })
                    .expect(expected.movie);

            });

            it('request all movies major 1997 and minor 2010', async () => {
                const expected = {
                    movie: mocks.moviesByRange
                };

                const init = 1997;
                const end = 2010;

                await request(api.server)
                    .get(`/movie`)
                    .query({ years: `${init}-${end}` })
                    .expect(expected.movie);

            });

            it('request all movies that have that word in the name', async () => {
                const expected = {
                    movie: mocks.moviesByPartOfName
                };

                const part = "South";

                await request(api.server)
                    .get(`/movie`)
                    .query({ name: part })
                    .expect(expected.movie);

            });

            it('request all movies that have that word in the description', async () => {
                const expected = {
                    movie: mocks.moviesByPartOfDesc
                };

                const part = "South";

                await request(api.server)
                    .get(`/movie`)
                    .query({ description: part })
                    .expect(expected.movie);

            });

            it('create movie error by name empty', async () => {
                const expected = {
                    "error": "Field name is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"",
                        "description":"description test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by name undefined', async () => {
                const expected = {
                    "error": "Field name is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "description":"description test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by description empty', async () => {
                const expected = {
                    "error": "Field description is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":"",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by description undefined', async () => {
                const expected = {
                    "error": "Field description is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by categoryId empty', async () => {
                const expected = {
                    "error": "Field categoryId is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":" description test",
                        "categoryId":"",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by categoryId undefined', async () => {
                const expected = {
                    "error": "Field categoryId is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":" description test",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by year empty', async () => {
                const expected = {
                    "error": "Field year is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":" description test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year": "",
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by year undefined', async () => {
                const expected = {
                    "error": "Field year is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":" description test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by classification empty', async () => {
                const expected = {
                    "error": "Field classification is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":" description test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year":1559,
                        "classification": ""
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by classification undefined', async () => {
                const expected = {
                    "error": "Field classification is required",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":" description test",
                        "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                        "year":1559,
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('create movie error by category does not exist', async () => {
                const expected = {
                    "error":"Category does not exist",
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send({
                        "name":"name test",
                        "description":"description test",
                        "categoryId":"077968ee-ffff-ffff-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('create movie', async () => {
                const expected = {
                    "name":"name test",
                    "description":"description test",
                    "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
                    "year":1559,
                    "classification":0
                };

                const response = await request(api.server)
                    .post(`/movie`)
                    .send(expected)
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('update movie error by id empty', async () => {
                const expected = {
                    "error": "Field id is required",
                };

                const response = await request(api.server)
                    .post(`/movie/change`)
                    .send({
                        "id": "",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('update movie error by id undefined', async () => {
                const expected = {
                    "error": "Field id is required",
                };

                const response = await request(api.server)
                    .post(`/movie/change`)
                    .send({
                        "name": "ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('update movie error by category does not exist', async () => {
                const expected = {
                    "error":"Category does not exist",
                };

                const response = await request(api.server)
                    .post(`/movie/change`)
                    .send({
                        "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
                        "name":"name test",
                        "description":"description test",
                        "categoryId":"077968ee-ffff-ffff-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('update movie error by movie does not exist', async () => {
                const expected = {
                    "error":"Movie does not exist",
                };

                const response = await request(api.server)
                    .post(`/movie/change`)
                    .send({
                        "id":"077968ee-ffff-ffff-84d3-6bb5604811f0",
                        "name":"name test",
                        "description":"description test",
                        "categoryId":"077968ee-ffff-ffff-84d3-6bb5604811f0",
                        "year":1559,
                        "classification":0
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('update movie', async () => {
                const expected = {
                    "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
                    "name":"West white Solutions blue Albuquerque change",
                    "description":"East programming man Keyboard woefully experiences though Islands Manager yippee change",
                    "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
                    "year":1996,
                    "classification":16
                }

                const response = await request(api.server)
                    .post(`/movie/change`)
                    .send(expected)
                    .expect(200)

                const aux = JSON.parse(response.text);
                console.log(aux)
                assert.deepStrictEqual(aux.id, expected.id);
                assert.deepStrictEqual(aux.name, expected.name);
                assert.deepStrictEqual(aux.description, expected.description);
                assert.deepStrictEqual(aux.categoryId, expected.categoryId);
                assert.deepStrictEqual(aux.year, expected.year);
                assert.deepStrictEqual(aux.classification, expected.classification);
            });

            it('delete movie error by id empty', async () => {
                const expected = {
                    "error": "Field id is required",
                };

                const response = await request(api.server)
                    .post(`/movie/delete`)
                    .send({
                        "id": "",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('delete movie error by id undefined', async () => {
                const expected = {
                    "error": "Field id is required",
                };

                const response = await request(api.server)
                    .post(`/movie/delete`)
                    .send({
                        "name": "ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

            it('delete movie error by movie does not exist', async () => {
                const expected = {
                    "error":"Movie does not exist",
                };

                const response = await request(api.server)
                    .post(`/movie/delete`)
                    .send({
                        "id":"077968ee-ffff-ffff-84d3-6bb5604811f0"
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux.color, expected.color);
                assert.deepStrictEqual(aux.movieId, expected.movieId);
            });

            it('delete movie', async () => {
                const expected = {
                    "msg": "Movie ea99a7c7-7932-4dc9-ae8d-b601d84961dd remove",
                };

                const response = await request(api.server)
                    .post(`/movie/delete`)
                    .send({
                        "id": "ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
                    })
                    .expect(200)

                const aux = JSON.parse(response.text);

                assert.deepStrictEqual(aux, expected);
            });

        });
    });
});