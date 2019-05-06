const ClientRepository = require('../repositories/clientRepository');

module.exports = class UserService {

    constructor() {
        this.clientRepository = new ClientRepository();
    }


};