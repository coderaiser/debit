(function() {
    'use strict';
    
    var fs          = require('fs'),
        
        parseCsv    = require('csv-parse'),
        upload   = require('./upload');
    
    module.exports = function(name, token, callback) {
        fs.readFile(name, {encoding: 'utf8'}, function(error, data) {
            if (error)
                callback(error);
            else
                parseCsv(data, function(error, data) {
                    if (error)
                        callback(error);
                    else
                        upload(token, data, function(result) {
                            callback(null, result.message || result);
                        });
                });
        });
    };
})();
