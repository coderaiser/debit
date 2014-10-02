(function() {
    'use strict';

    var express = require('express'),
        router  = express.Router(),
        debitoor    = require('debitoor');
    
    exports.router  = router;
    
    router.get('/debit', function (req, res, next) {
        next();
    });
})();
