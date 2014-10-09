(function() {
    'use strict';
    
    var fs          = require('fs'),
        parseCsv    = require('csv-parse');
    
    module.exports = function(name, callback) {
        fs.readFile(name, {encoding: 'utf8'}, function(error, data) {
            if (error)
                callback(error);
            else
                parseCsv(data, callback);
        });
    };
})();
