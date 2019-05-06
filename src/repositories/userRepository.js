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
        var sql = "INSERT INTO user (_id, name) value (?,?)";

        return new Promise(function (resolve, reject) {
            connection.query(sql, [oToCreate.userName, oToCreate.userCode], (err, rows) => {
                resolve(rows);
            });
        });
    }

}