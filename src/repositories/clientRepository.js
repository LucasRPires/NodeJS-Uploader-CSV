const connection = require('../lib/database/mysql')();
var _ = require('lodash');

module.exports = class ClientRepository {

    async createClient(oToCreate) {
        var sql = "INSERT INTO clients (name, cep, cpf, date_sent, idUser) values (?,?,?,?,?)";

        return new Promise(function (resolve, reject) {
            connection.query(sql, [oToCreate.name, oToCreate.cep, oToCreate.cpf, oToCreate.date_sent, oToCreate.idUser], (err, rows) => {
                resolve(rows.insertId);
            });
        });
    } 

    async findClientsByUser (_id) {
        var sql = "SELECT  c._id, c.name, c.cep, c.cpf, c.date_sent, a.district, a.street, a.state "+
                  "FROM clients c INNER JOIN address a on c._id = a.idClient WHERE c.idUser = ?";

        return new Promise(function(resolve, reject) {
            connection.query(sql, [_id], (err, rows) => {
                let response = [];
                _.forEach(rows, function(value, key) {
                    let data = { _id: value._id, 
                             name: value.name,
                             CEP: value.cep,
                             CPF: value.cpf,
                             date_sent: value.date_sent,
                             address: {
                                 district: value.district,
                                 street: value.street,
                                 state: value.state
                             }};
                    response.push(data);
                });
                resolve(response);
            });
        });
    }

    async findById (_id) {
        var sql = "SELECT  * FROM clients WHERE _id = ?";

        return new Promise(function(resolve, reject) {
            connection.query(sql, [_id], (err, rows) => {
                resolve(rows);
            });
        });
    }

    async deleteClient (_id) {
        var sql = "DELETE FROM clients where _id = ?";

        return new Promise(function(resolve, reject) {
            connection.query(sql, [_id], (err, rows) => {
                resolve(rows);
            });
        });
    }

}