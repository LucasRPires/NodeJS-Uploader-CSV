const ReaderCSV = require('../helpers/readerCSV');
const UserRepository = require('../repositories/userRepository');
const ClientRepository = require('../repositories/clientRepository');
const AddressRepository = require('../repositories/addressRepository');
const ViaCep = require('../helpers/viaCep');
const responser = require('../helpers/responser');

var _ = require('lodash');

module.exports = class UploadDataService {

    constructor() {
        this.userRepository = new UserRepository();
        this.clientRepository = new ClientRepository();
        this.addressRepository = new AddressRepository();
    }
    
    async uploadPayload(req) {
        let userSplited = splitCSV(req.file.originalname);
        let userFind = await this.userRepository.findUser(userSplited);

        let userId;
        let userAlreadyExist;

        if(userFind.length <= 0) {
            userId = await this.userRepository.createUser(userSplited);
            userAlreadyExist = 'Usuário criado com sucesso';
        } else {
            userAlreadyExist = 'Usuário já existente';
            userId = userFind[0]._id;
        }

        let readerCSV = new ReaderCSV();
        let dataRead = await readerCSV.readCSVFile(req.file);
        let cepIndex = _.indexOf(dataRead.header, 'cep');
        let cpfIndex = _.indexOf(dataRead.header, 'cpf');
        let nameIndex = _.indexOf(dataRead.header, 'nome');

        let clientRepo = this.clientRepository;
        let addressRepo = this.addressRepository;
        
        _.forEach(dataRead.values, async function(value, key) {
            let oCreateClient = { name: value[nameIndex], 
                                  cpf: value[cpfIndex],
                                  cep: value[cepIndex],
                                  date_sent: new Date(),
                                  idUser: userId 
                                }
            let newClient = await clientRepo.createClient(oCreateClient);
            let address = await new ViaCep().getAddress(oCreateClient.cep);

             await addressRepo.createAddress(address, newClient);               
        });

        var data = { _id: userId,
                     name: userSplited.userName,
                     date_sent: oCreateClient.date_sent,
                     file_name: req.file.originalname,
                     status: 'upload_complete'
                };

        return responser(data, userAlreadyExist);
    }

}

function trimFields(value) {
    return value.replace('.', '').replace('-', '');
}

function splitCSV(fileName) {
    let nameArchive = fileName.split('.')[0];
    let userName = nameArchive.split('_')[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace('-', ' ');
    let userCode = nameArchive.split('_')[1];

    return {userName: userName, userCode: userCode};
}