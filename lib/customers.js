(function() {
    'use strict';
    
    var request     = require('request'),
        Util        = require('util-io'),
        
        URL         =  'https://api.debitoor.com/api/v1.0/';
    
    module.exports = function(token, customers, callback) {
        var n       = 0,
            done,
            isDone  = function(error) {
                --n;
                if (!n || error && !done) {
                    done = true;
                    callback(error);
                }
            };
        
        Util.checkArgs(arguments, ['token', 'customers', 'callback']);
        
        n = customers.length;
        
        customers.forEach(function(name) {
            var options = {
                json    : true,
                method  : 'POST',
                url     : URL + 'customers',
                body    : getCustomer(name[0]),
                
                headers : {
                    'x-token': token
                },
            };
            
            request(options,function(error, response, body) {
                console.log(error, body);
                isDone(error);
            });
        });
    };
    
    function getCustomer(name) {
        var json = JSON.stringify({
            name: name,
            countryCode:'DK',
            paymentTermsId: 1,
            /*
            id:null,
            number: null,
            address:null,
            phone: null,
            email: null,
            homepage: null,
            ciNumber: null,
            vatNumber: null,
            customPaymentTermsDays:null,
            countryName:null,
            isArchived:null
            */
        });
        
        return json;
    }
})();
