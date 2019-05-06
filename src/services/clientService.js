const ClientRepository = require('../repositories/clientRepository');
const AddressRepository = require('../repositories/addressRepository');
const CustomError = require('../lib/error/Error');
const ViaCep = require('../helpers/viaCep');
const cleanScan = require('../helpers/cleanScan');

module.exports = class ClientService {

    constructor() {
        this.clientRepository = new ClientRepository();
        this.addressRepository = new AddressRepository();
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

    async updateClient(_id, updateClient) {
        let client = await this.clientRepository.findById(_id);
        
        if(client.length <= 0)
            throw new CustomError(404, 'Client Not Found');

        updateClient = cleanScan(updateClient);

        await this.clientRepository.updateClient(_id, updateClient);
        let newAddress = await new ViaCep().getAddress(updateClient.cep);
        await this.addressRepository.updateAddress(newAddress, _id);

        return {
            _id: _id ,
            date_sent: new Date(),
            name: updateClient.name,
            status: 'update_info'
        }
    }

};