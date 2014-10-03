(function() {
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        multer      = require('multer'),
        router      = require('./lib/router'),
        
        app         = express(),
        server      = http.createServer(app),
        
        PORT        = 1337,
        IP          = '0.0.0.0',
        MSG         = ['http://', IP, ':', PORT].join('');
    
    app .use(multer())
        .use(router)
        .use(express.static(__dirname + '/assets'));
    
    server.listen(PORT, IP);
    
    console.log(MSG);
})();
