const Client = require("../entities/client");
const {v4: uuidv4} = require("uuid");
const Category = require("../entities/category");

class ClientService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async getClientById(id) {
        const client = await this.repository.find(id);
        return client;
    }

    async getAllClients() {
        const clients = await this.repository.all();
        return clients;
    }

    async createClient(new_client) {
        try {
            if(
                !new_client.name
                || new_client.name === "undefined"
                || new_client.name === ""
            ) {

                throw new Error("Field name is required");
            }

            if(
                !new_client.birthDate
                || new_client.birthDate === "undefined"
                || new_client.birthDate === ""
            ) {

                throw new Error("Field birthDate is required");
            }

            if(
                !new_client.address
                || new_client.address === "undefined"
                || new_client.address === ""
            ) {

                throw new Error("Field address is required");
            }

            if(
                !new_client.gender
                || new_client.gender === "undefined"
                || new_client.gender === ""
            ) {

                throw new Error("Field gender is required");
            }

            const client = new Client({
                id: uuidv4(),
                name: new_client.name,
                birthDate: new_client.birthDate,
                address: new_client.address,
                gender: new_client.gender,
            });

            return await this.repository.create(client);
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async changeClient(client_param) {
        try {
            if(
                !client_param.id
                || client_param.id === "undefined"
                || client_param.id === ""
            ) {

                throw new Error("Field id is required");
            }

            const old = await this.repository.find(client_param.id.toString());

            if(!old) {
                throw new Error("Client does not exist");
            }

            const client = new Client({
                id: client_param.id,
                name: client_param.name,
                birthDate: client_param.birthDate,
                address: client_param.address,
                gender: client_param.gender,
            });

            return await this.repository.update(client);
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }

    async deleteClient(id) {
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
                throw new Error("Client does not exist");
            }

            await this.repository.delete(id);

            return JSON.stringify({ msg: `Client ${id} remove`});
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    }
}

module.exports = ClientService;