const https = require('https');
const CustomError = require('../lib/error/Error');

module.exports = class ViaCep {

    async getAddress(cep){
        return new Promise(function(resolve, reject) {
            https.get("https://viacep.com.br/ws/"+cep+"/json/", (resp) => {

                resp.on('data', (data) => {
                    var address = JSON.parse(data);
                    let addressToInclude = { district: address.bairro,
                                             street: address.logradouro,
                                             state: address.localidade
                                           };
                    resolve(addressToInclude);
                });

                }).on("error", (err) => {
                    throw new CustomError(400, 'Bad Request');
                });
        });
    }
}