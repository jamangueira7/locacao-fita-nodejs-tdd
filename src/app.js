const http = require('http');
const { join } = require('path');

const CategoryRepository = require("./repository/categoryRepository");
const ClientRepository = require("./repository/clientRepository");
const MovieRepository = require("./repository/movieRepository");
const TapeRepository = require("./repository/tapeRepository");
const RentalRepository = require("./repository/rentalRepository");

const CategoryService = require("./service/categoryService");
const ClientService = require("./service/clientService");
const MovieService = require("./service/movieService");
const TapeService = require("./service/tapeService");
const RentalService = require("./service/rentalService");

let dbCategory;
let dbClient;
let dbMovies;
let dbTapes;

const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type' : 'application/json' };
let ENVIRONMENT = "produce"

const createService = () => {
    const categoryRepository = new CategoryRepository();
    const clientRepository = new ClientRepository();
    const movieRepository = new MovieRepository();
    const tapeRepository = new TapeRepository();
    const rentalRepository = new RentalRepository();

    const db_category_filename = ENVIRONMENT === "produce" ? "categories.json" : "categories_test.json";
    const db_client_filename = ENVIRONMENT === "produce" ? "clients.json" : "clients_test.json";
    const db_movie_filename = ENVIRONMENT === "produce" ? "movies.json" : "movies_test.json";
    const db_tape_filename = ENVIRONMENT === "produce" ? "tapes.json" : "tapes_test.json";

    categoryRepository.init({ file: dbCategory }, db_category_filename);
    clientRepository.init({ file: dbClient }, db_client_filename);
    movieRepository.init({ file: dbMovies}, db_movie_filename);
    tapeRepository.init({ file: dbTapes}, db_tape_filename);
    //rentalRepository.init({ file: });

    return {
        CategoryService: new CategoryService({ repository: categoryRepository }),
        ClientService: new ClientService({ repository: clientRepository }),
        MovieService: new MovieService({ repository: movieRepository }),
        TapeService: new TapeService({ repository: tapeRepository, movieRepository: movieRepository }),
        RentalService: new RentalService({ repository: rentalRepository }),
    }
}

const createDependencies = (environment) => {
    ENVIRONMENT = environment;
    if(environment === "produce") {
        dbCategory =  join(__dirname, '../database', "categories.json");
        dbClient = join(__dirname, '../database', "clients.json");
        dbMovies = join(__dirname, '../database', "movies.json");
        dbTapes = join(__dirname, '../database', "tapes.json");

    } else {
        dbCategory = join(__dirname, '../test/mocks/category', "valid-all-categories.json");
        dbClient = join(__dirname, '../test/mocks/client', "valid-all-clients.json");
        dbMovies = join(__dirname, '../test/mocks/movie', "valid-all-movies.json");
        dbTapes = join(__dirname, '../test/mocks/tape', "valid-all-tapes.json");
    }

}

class App {
    constructor(dependencies = createService()) {
        this.categoryService = dependencies.CategoryService;
        this.clientService = dependencies.ClientService;
        this.movieService = dependencies.MovieService;
        this.tapeService = dependencies.TapeService;
    }


    createRoutes() {
        return {
            '/categories:get': async (request, response) => {

                const categories = await this.categoryService.getAllCategory();
                response.write(JSON.stringify(categories));
                return response.end();
            },
            '/category?id:get': async (request, response) => {
                const { id } = request;
                const category = await this.categoryService.getCategoryById(id);
                response.write(JSON.stringify(category));
                return response.end();
            },
            '/category:post': async (request, response) => {
                let dataValue = {}
                for await (const data of request) {
                    dataValue = JSON.parse(data);

                }

                const category = await this.categoryService.createCategory(dataValue);
                response.write(category);
                return response.end();
            },
            '/category/change:post': async (request, response) => {
                let dataValue = {}
                for await (const data of request) {
                    dataValue = JSON.parse(data);
                }

                const category = await this.categoryService.changeCategory(dataValue);
                response.write(category);
                return response.end();
            },
            '/category/delete:post': async (request, response) => {
                let dataValue = {}
                for await (const data of request) {
                    dataValue = JSON.parse(data);
                }

                const category = await this.categoryService.deleteCategory(dataValue.id);
                response.write(category);
                return response.end();
            },

            '/clients:get': async (request, response) => {

                const clients = await this.clientService.getAllClients();
                response.write(JSON.stringify(clients));
                return response.end();
            },
            '/client?id:get': async (request, response) => {
                const { id } = request;
                const client = await this.clientService.getClientById(id);
                response.write(JSON.stringify(client));
                return response.end();
            },

            '/tapes:get': async (request, response) => {

                const tapes = await this.tapeService.getAllTapes();
                response.write(JSON.stringify(tapes));
                return response.end();
            },
            '/tape?id:get': async (request, response) => {
                const { id } = request;
                const tape = await this.tapeService.getTapeById(id);
                response.write(JSON.stringify(tape));
                return response.end();
            },
            '/tape?color:get': async (request, response) => {
                const { id: color } = request;
                const tape = await this.tapeService.getAllTapesByColor(color);
                response.write(JSON.stringify(tape));
                return response.end();
            },
            '/tape/random?movieId:get': async (request, response) => {
                const { id: movieId } = request;
                const tape = await this.tapeService.getRandomTapeByMovieId(movieId);
                response.write(JSON.stringify(tape));
                return response.end();
            },
            '/tape?movieId:get': async (request, response) => {
                const { id: movieId } = request;
                const tape = await this.tapeService.getAllTapesByMovieId(movieId);
                response.write(JSON.stringify(tape));
                return response.end();
            },
            '/tape:post': async (request, response) => {
                let dataValue = {}
                for await (const data of request) {
                    dataValue = JSON.parse(data);

                }

                const tape = await this.tapeService.createTape(dataValue);
                response.write(tape);
                return response.end();
            },
            '/tape/delete:post': async (request, response) => {
                let dataValue = {}
                for await (const data of request) {
                    dataValue = JSON.parse(data);
                }

                const category = await this.tapeService.deleteTape(dataValue.id);
                response.write(category);
                return response.end();
            },

            '/movies:get': async (request, response) => {

                const movies = await this.movieService.getAllMovies();
                response.write(JSON.stringify(movies));
                return response.end();
            },
            '/movie?id:get': async (request, response) => {
                const { id } = request;
                const movie = await this.movieService.getMovieById(id);
                response.write(JSON.stringify(movie));
                return response.end();
            },
            '/movie?categoryId:get': async (request, response) => {
                const { id: categoryId } = request;
                const movie = await this.movieService.getAllMoviesByCategoryId(categoryId);
                response.write(JSON.stringify(movie));
                return response.end();
            },
            '/movie?classification:get': async (request, response) => {
                const { id: classification } = request;
                const movies = await this.movieService.getMoviesByClassification(classification);
                response.write(JSON.stringify(movies));
                return response.end();
            },
            '/movie?years:get': async (request, response) => {
                const { id: years } = request;
                const [init, end ] = years.split("-");
                const movies = await this.movieService.getMoviesByTimeRange(init, end);
                response.write(JSON.stringify(movies));
                return response.end();
            },
            '/movie?name:get': async (request, response) => {
                const { id: part } = request;
                const movies = await this.movieService.getMoviesThatHaveThatWordInTheName(part);
                response.write(JSON.stringify(movies));
                return response.end();
            },
            '/movie?description:get': async (request, response) => {
                const { id: part } = request;
                const movies = await this.movieService.getMoviesThatHaveThatWordInTheDescription(part);
                response.write(JSON.stringify(movies));
                return response.end();
            },

            default: async (request, response) => {
                response.writeHead(404, DEFAULT_HEADER);
                response.write(JSON.stringify({ msg: "404 - Essa rota não existe." }));
                return response.end();
            }
        }
    }

    header(request, response) {
        let { url, method } = request;
        const aux = url.split("=");
        if(method === 'GET' && typeof aux[1] !== "undefined") {
            url = aux[0];
            request.id = aux[1];
        }

        const routes = this.createRoutes();
        const routeKey = `${url}:${method.toLowerCase()}`;
        const chosen = routes[routeKey] || routes.default;

        response.writeHeader(200, DEFAULT_HEADER);

        return chosen(request, response);
    }

    createServer(environment="produce", port = PORT) {
        createDependencies(environment);
        const app = http
            .createServer(this.header.bind(this))
            .listen(port, () => console.log(`Listening on ${port}`));

        return app;
    }
}


module.exports = App;