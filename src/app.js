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

const dbCategory = join(__dirname, '../database', "categories.json");
const dbClient = join(__dirname, '../database', "clients.json");
const dbMovies = join(__dirname, '../database', "movies.json");
const dbTapes = join(__dirname, '../database', "tapes.json");

const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type' : 'application/json' };

const createPokemonService = () => {
    const categoryRepository = new CategoryRepository();
    const clientRepository = new ClientRepository();
    const movieRepository = new MovieRepository();
    const tapeRepository = new TapeRepository();
    const rentalRepository = new RentalRepository();

    categoryRepository.init({ file: dbCategory });
    clientRepository.init({ file: dbClient });
    movieRepository.init({ file: dbMovies});
    tapeRepository.init({ file: dbTapes});
    //rentalRepository.init({ file: });

    return {
        CategoryService: new CategoryService({ repository: categoryRepository }),
        ClientService: new ClientService({ repository: clientRepository }),
        MovieService: new MovieService({ repository: movieRepository }),
        TapeService: new TapeService({ repository: tapeRepository }),
        RentalService: new RentalService({ repository: rentalRepository }),
    }
}
class App {
    constructor(dependencies = createPokemonService()) {
        this.categoryService = dependencies.CategoryService;
        this.clientService = dependencies.ClientService;
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

    createServer(port = PORT) {
        const app = http
            .createServer(this.header.bind(this))
            .listen(port, () => console.log(`Listening on ${port}`));

        return app;
    }
}


module.exports = App;