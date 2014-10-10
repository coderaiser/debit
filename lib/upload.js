(function() {
    'use strict';
    
    var request     = require('request'),
        Util        = require('util-io'),
        
        URL         =  'https://api.debitoor.com/api/v1.0/';
    
    module.exports = function(token, customers, callback) {
        var n,
            props,
            done,
            isDone  = function(error, body) {
                --n;
                if (!n || error && !done) {
                    done = true;
                    callback(error, body);
                }
            };
        
        Util.checkArgs(arguments, ['token', 'customers', 'callback']);
        
        props   = customers.shift();
        n       = customers.length;
        
        customers.forEach(function(array) {
            var data    = getData(props, array),
                options = {
                    json    : true,
                    method  : 'POST',
                    url     : URL + 'customers',
                    body    : getCustomer(data),
                    
                    headers : {
                        'x-token': token
                    },
                };
            
            request(options,function(error, response, body) {
                if (!error && body.errors)
                    error = body;
                
                isDone(error, body);
            });
        });
    };
    
    function getData(props, data) {
        var i,
            n   = props.length,
            name,
            obj = {};
        
        for (i = 0; i < n; i++) {
            name        = props[i];
            obj[name]   = data[i];
        }
        
        return obj;
    }
    
    function getCustomer(data) {
        var json = {
            countryCode:'DK',
            paymentTermsId: 1,
        };
        
        Object.keys(data).forEach(function(name) {
            json[name] = data[name];
        });
        
        return JSON.stringify(json);
    }
})();
