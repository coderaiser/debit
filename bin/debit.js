#!/usr/bin/env node

(function() {
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        mollify     = require('mollify'),
        router      = require('../lib/router'),
        
        app         = express(),
        server      = http.createServer(app),
        
        PORT        = 9876,
        IP          = '0.0.0.0',
        DIR         = __dirname + '/../assets';
    
    app .use(router)
        .use(mollify({
            dir: DIR
        }))
        .use(express.static(DIR));
    
    server.listen(PORT, IP);
    
    console.log('http://%s:%d', IP, PORT);
})();
