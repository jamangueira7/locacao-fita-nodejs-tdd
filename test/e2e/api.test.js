const { describe, it, beforeEach, afterEach } = require('mocha');
const request = require('supertest');
const { expect } = require("chai");
const sinon = require("sinon");
const http = require("http");
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
}

describe("API Suite test", () => {
    let api = {};
    let sandbox = sinon.createSandbox();

    beforeEach(() => {
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

            api.createServer(portTest);

            expect(http.createServer.callCount).to.be.equal(1);
            expect(api.createServer.getCall(0).args[0]).to.be.equal(portTest);
        });
    });

    describe("/Routes", () => {
        before(() => {
            const instance = new App();

            api = {
                instance,
                server: instance.createServer(SERVER_TEST_PORT),
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

                await request(api.server)
                    .get(`/tape/random`)
                    .query({ movieId: "a6e634fd-1c79-4062-9d4b-61ead6cf2b8c" })
                    .expect(expected.tape);

            });


        });
    });
});