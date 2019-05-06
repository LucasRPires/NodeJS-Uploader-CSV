const connection = require('../lib/database/mysql')();

module.exports = class UserRepository {

    async findUser(oToFind) {
        var sql = "SELECT * from users WHERE name = ? AND _id = ?";

        return new Promise(function(resolve, reject) {
            connection.query(sql, [oToFind.userName, oToFind.userCode], (err, rows) => {
                resolve(rows);
            });
        });
    }

    async createUser(oToCreate) {
        var sql = "INSERT INTO users (_id, name, date_sent) value (?,?,?)";

        return new Promise(function (resolve, reject) {
            connection.query(sql, [oToCreate.userCode, oToCreate.userName, new Date()], (err, rows) => {
                resolve(oToCreate.userCode);
            });
        });
    }

    async findById (_id) {
        var sql = "SELECT  * FROM users WHERE _id = ?";

        return new Promise(function(resolve, reject) {
            connection.query(sql, [_id], (err, rows) => {
                resolve(rows);
            });
        });
    }

    async deleteUser (_id) {
        var sql = "DELETE FROM users where _id = ?";

        return new Promise(function(resolve, reject) {
            connection.query(sql, [_id], (err, rows) => {
                resolve(rows);
            });
        });
    }

}