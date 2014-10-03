(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        debitoor    = require('debitoor');
    
    module.exports  = router;
    
    router.get('/', function (req, res, next) {
        if (req.query.code)
            console.log(req.query.code);
        next();
    });
})();
