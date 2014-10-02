(function() {
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        router      = require('./lib/router'),
        app         = express(),
        server      = http.createServer(app),
        
        PORT        = 1337,
        IP          = '0.0.0.0';
    
    app .use(router)
        .use(express.static(__dirname + '/assets'));
    
    server.listen(PORT, IP);
})();
