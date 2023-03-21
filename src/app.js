const http = require('http');

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

const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type' : 'application/json' };

const createPokemonService = () => {
    const categoryRepository = new CategoryRepository();
    const clientRepository = new ClientRepository();
    const movieRepository = new MovieRepository();
    const tapeRepository = new TapeRepository();
    const rentalRepository = new RentalRepository();

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
        this.pokemonService = dependencies.PokemonService;
    }
    createRoutes() {
        return {
            '/team:get': async (request, response) => {

                const team = await this.pokemonService.getTeam();
                response.write(JSON.stringify({ team }));
                return response.end();
            },

            '/team?name:get': async (request, response) => {

                const { id } = request;
                const pokemon = await this.pokemonService.getPokemon(id);
                response.write(JSON.stringify( pokemon ));
                return response.end();
            },

            default: async (request, response) => {
                response.write(JSON.stringify({ msg: 'Essa rota não existe, tente acessar a rota /team para retornar dados.' }));
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