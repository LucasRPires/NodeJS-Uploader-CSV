const ClientRepository = require('../repositories/clientRepository');
var CustomError = require('../lib/error/Error');

module.exports = class ClientService {

    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async findClientsByUser(_id) {
        let clients = await this.clientRepository.findClientsByUser(_id);

        if(clients.length <= 0)
            throw new CustomError(404, 'Client Not Found');
        
        return clients;
    }

    async deleteClient(_id) {
        let client = await this.clientRepository.findById(_id);
        
        if(client.length <= 0)
            throw new CustomError(404, 'Client Not Found');

        await this.clientRepository.deleteClient(_id);
        let clientFound  = client[0];

        return {
            _id: clientFound._id,
            date_sent: clientFound.date_sent,
            name: clientFound.name,
            status: 'deleted'
        }
    }

};