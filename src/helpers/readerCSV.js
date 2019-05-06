var fs = require('fs');
var parse = require('csv-parse');
var CustomError = require('../lib/error/Error');
var _ = require('lodash');

module.exports = class ReaderCSV {

    async readCSVFile(file) {
        var csvData = [];

        if(!isCSVFile(file))
            throw new CustomError(415, 'Unsupported Media Type');

        var csvReaded = await new Promise(function(resolve, reject) {
            fs.createReadStream(file.path)
            .pipe(parse({delimiter: ';'}))
            .on('data', function(csvrow) {
                csvData.push(csvrow);
            }).on('end', function() {
                fs.unlinkSync(file.path);
                resolve(csvData);
            });
        });

        _.forEach(csvData[0], function(value, key) {
            csvData[0][key] = value.toLowerCase();
        });

        let header = csvData[0];
        csvReaded = _.drop(csvData, 1);   

        return {header: header, values: csvReaded}; 
    }

}

function isCSVFile(file) {
    if(file != undefined) {
        let extension = 'csv';
        let mimeFile = file.mimetype.split('/')[1];
        let nameFile = file.originalname.split('.')[1];
    
        if(mimeFile == extension && nameFile == extension)
            return true;    
    }

    return false;
}