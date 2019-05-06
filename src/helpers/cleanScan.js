var _ = require('lodash');

module.exports = function (oToScan) {
    _.forEach(oToScan, function(value, key) {
        oToScan[key] = value.replace(/[^\w\s]/gi, '');
    });

    return oToScan;
}