const connection = require('../lib/database/mysql')();

module.exports = class AddressRepository {

    async createAddress(oAddress, idClient) {
        var sql = "INSERT INTO address (district, street, state, idClient) values (?,?,?,?)";

        return new Promise(function (resolve, reject) {
            connection.query(sql, [oAddress.district, oAddress.street, oAddress.state, idClient], (err, rows) => {
                resolve(rows);
            });
        });
    } 

}