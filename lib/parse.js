'use strict';

var fs = require('fs');
var baby = require('babyparse');

module.exports = function(name, callback) {
    fs.readFile(name, {encoding: 'utf8'}, function(error, data) {
        var csv;
        
        if (!error)
            csv = baby.parse(data).data;
        
        callback(error, csv);
    });
};
