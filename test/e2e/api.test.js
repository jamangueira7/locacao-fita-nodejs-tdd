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
    });
});