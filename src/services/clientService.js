const ClientRepository = require('../repositories/clientRepository');

module.exports = class ClientService {

    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async findClientsByUser(_id) {
        return await this.clientRepository.findClientsByUser(_id);
    }

};