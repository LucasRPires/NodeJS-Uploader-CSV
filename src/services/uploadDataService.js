const ReaderCSV = require('../helpers/readerCSV');
const UserRepository = require('../repositories/userRepository');
var _ = require('lodash');

module.exports = class UploadDataService {

    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async uploadPayload(req) {
        let userSplited = splitCSV(req.file.originalname);
        let userFind = await this.userRepository.findUser(userSplited);

        let userId;
        if(userFind.length <= 0) 
            userId = await this.userRepository.createUser(userSplited);
        else
            userId = userFind[0]._id;

        let readerCSV = new ReaderCSV();
        let dataRead = await readerCSV.readCSVFile(req.file);

        console.log(dataRead);

        // return userSplited;
    }

}

function splitCSV(fileName) {
    let nameArchive = fileName.split('.')[0];
    let userName = nameArchive.split('_')[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace('-', ' ');
    let userCode = nameArchive.split('_')[1];

    return {userName: userName, userCode: userCode};
}