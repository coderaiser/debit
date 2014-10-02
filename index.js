(function() {
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        debitoor    = require('debitoor'),
        app         = express(),
        server      = http.createServer(app),
        
        PORT        = 1337,
        IP          = '0.0.0.0';
    
    app.use(express.static(__dirname));
    server.listen(PORT, IP);
})();
