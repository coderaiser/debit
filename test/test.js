(function() {
    'use strict';
    
    /*global describe, it */
    
    var fs      = require('fs'),
        should  = require('should'),
        parse   = require('../lib/parse'),
        test    = fs.readFileSync(__dirname + '/test.json', {encoding: 'utf8'});
    
    describe('Debit', function() {
        describe('parse', function() {
            it('should parse cvs to json', function() {
                parse(__dirname + '/test.cvs', function(error, data) {
                    var json;
                    
                    if (!error)
                        json = JSON.stringify(data);
                    
                    should(json).eql(test);
                });
            });
        });
    });
    
})();
