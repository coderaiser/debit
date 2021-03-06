'use strict';

var request = require('request');
var check = require('checkup');

var URL =  'https://api.debitoor.com/api/v1.0/';

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
    
    check(arguments, ['token', 'customers', 'callback']);
    
    props   = customers.shift();
    n       = customers.length;
    
    if (!n)
        callback(Error('Customers list is empty'));
    else
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
            
            request(options, function(error, response, body) {
                if (!error && body.errors)
                    error = body;
                
                isDone(error, body);
            });
        });
};

function getData(props, data) {
    var obj = {};
    
    props.forEach(function(name, i) {
        obj[name] = data[i];
    });
    
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
