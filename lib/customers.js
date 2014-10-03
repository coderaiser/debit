(function() {
    'use strict';
    
    var request     = require('request'),
        Util        = require('util-io'),
        
        URL         =  'https://api.debitoor.com/api/v1.0/';
    
    module.exports = function(token, customers, callback) {
        Util.checkArgs(arguments, ['token', 'customers', 'callback']);
        
        customers.forEach(function(name) {
            var options = {
                    uri     : URL + 'customers',
                    headers : {
                        'x-token': token,
                        json     : true
                    }
                };
            
            request.post(options, {formData: getCustomer(name[0])}, function(error, data) {
                console.log(error);
                callback(error, data);
            });
        });
    };
    
    function getCustomer(name) {
        var json = {
                name            : name,
                countryCode     : 'DK',
                paymentTermsId  : 1
            };
        
        return json;
    }
})();
