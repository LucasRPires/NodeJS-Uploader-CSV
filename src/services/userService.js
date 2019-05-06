const UserRepository = require('../repositories/userRepository');
var CustomError = require('../lib/error/Error');

module.exports = class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }


    async deleteUser(_id) {
        let user = await this.userRepository.findById(_id);
        
        if(user.length <= 0)
            throw new CustomError(404, 'User Not Found');

        await this.userRepository.deleteUser(_id);
        let userFound  = user[0];

        return {
            _id: userFound._id,
            date_sent: userFound.date_sent,
            name: userFound.name,
            status: 'deleted'
        }
    }

};