const {v4: uuidv4} = require("uuid");
const Movie = require("../entities/movie");

class MovieService {
    constructor({ repository, categoryRepository }) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    async getMovieById(id) {
        const movie = await this.repository.find(id);
        return movie;
    }

    async getAllMovies() {
        const movies = await this.repository.all();
        return movies;
    }

    async getAllMoviesByCategoryId(id) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ categoryId }) => categoryId === id);
        return result;
    }

    async getMoviesByTimeRange(ini, end) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ year }) => ini <= year && end >= end);
        return result;
    }

    async getMoviesByClassification(classification_param) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ classification }) => classification === parseInt(classification_param));
        return result;
    }

    async getMoviesThatHaveThatWordInTheName(part) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ name }) => name.toLowerCase().includes(part.toLowerCase()));
        return result;
    }

    async getMoviesThatHaveThatWordInTheDescription(part) {
        const movies = await this.repository.all();
        const result = await movies.filter(({ description }) => description.toLowerCase().includes(part.toLowerCase()));
        return result;
    }


    async createMovie(new_movie) {
        try {
            if(
                !new_movie.name
                || new_movie.name === "undefined"
                || new_movie.name === ""
            ) {

                throw new Error("Field name is required");
            }

            if(
                !new_movie.description
                || new_movie.description === "undefined"
                || new_movie.description === ""
            ) {

                throw new Error("Field description is required");
            }

            if(
                !new_movie.categoryId
                || new_movie.categoryId === "undefined"
                || new_movie.categoryId === ""
            ) {

                throw new Error("Field categoryId is required");
            }

            if(
                !new_movie.year
                || new_movie.year === "undefined"
                || new_movie.year === ""
            ) {

                throw new Error("Field year is required");
            }

            if(
                !new_movie.classification
                || new_movie.classification === "undefined"
                || new_movie.classification === ""
            ) {

                throw new Error("Field classification is required");
            }

            const category = await this.categoryRepository.find(new_movie.categoryId.toString());
            if(!category) {
                throw new Error("Category does not exist");
            }

            const movie = new Movie({
                id: uuidv4(),
                name: new_movie.name,
                description: new_movie.description,
                categoryId: new_movie.categoryId,
                year: new_movie.year,
                classification: new_movie.classification,
            });

            return await this.repository.create(movie);
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async changeMovie(param) {
        try {
            if(
                !param.id
                || param.id === "undefined"
                || param.id === ""
            ) {
                throw new Error("Field id is required");
            }

            const old = await this.repository.find(param.id.toString());

            if(!old) {
                throw new Error("Movie does not exist");
            }

            const category = await this.categoryRepository.find(param.categoryId.toString());
            if(!category) {
                throw new Error("Category does not exist");
            }

            const movie = new Movie({
                id: param.id,
                name: param.name,
                description: param.description,
                categoryId: param.categoryId,
                year: param.year,
                classification: param.classification,
            });

            return await this.repository.update(movie);
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async deleteMovie(id) {
        try {
            if(
                !id
                || id === "undefined"
                || id === ""
            ) {

                throw new Error("Field id is required");
            }

            const old = await this.repository.find(id.toString());

            if(!old) {
                throw new Error("Movie does not exist");
            }

            await this.repository.delete(id);

            return JSON.stringify({ msg: `Movie ${id} remove`});
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }
}

module.exports = MovieService;