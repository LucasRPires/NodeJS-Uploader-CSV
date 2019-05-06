const connection = require('../lib/database/mysql')();

module.exports = class ClientRepository {

    async createClient(oToCreate) {
        var sql = "INSERT INTO clients (name, cep, cpf, date_sent, idUser) values (?,?,?,?,?)";

        return new Promise(function (resolve, reject) {
            connection.query(sql, [oToCreate.name, oToCreate.cep, oToCreate.cpf, oToCreate.date_sent, oToCreate.idUser], (err, rows) => {
                resolve(rows.insertId);
            });
        });
    } 



}