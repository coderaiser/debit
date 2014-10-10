(function() {
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        minify      = require('minify'),
        router      = require('./lib/router'),
        
        app         = express(),
        server      = http.createServer(app),
        
        PORT        = 9876,
        IP          = '0.0.0.0',
        MSG         = ['http://', IP, ':', PORT].join(''),
        
        DIR         = __dirname + '/assets';
    
    app .use(router)
        .use(minify({
            dir: DIR
        }))
        .use(express.static(DIR));
    
    server.listen(PORT, IP);
    
    console.log(MSG);
})();
