module.exports = class CustomError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}