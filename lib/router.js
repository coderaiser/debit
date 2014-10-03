(function() {
    'use strict';

    var fs          = require('fs'),
        express     = require('express'),
        pipe        = require('pipe-io'),
        parseCsv    = require('csv-parse'),
        handlebars  = require('handlebars'),
        
        customers   = require('./customers'),
        
        UploadName  = 'assets/upload.html',
        
        UploadTmpl  = fs.readFileSync(UploadName, {
            encoding: 'utf8'
        }),
        
        router      = express.Router(),
        
        ERROR       = new Error('Not implemented!');
    
    module.exports  = router;
    
    router.route('/upload')
        .get(function(req, res) {
            var template    = handlebars.compile(UploadTmpl),
                html        = template({
                    token: req.query.code
                });
            
            res.type('html');
            res.send(html);
        })
        .put(function (req, res, next) {
            next(ERROR);
        })
        .post(function(req, res, next) {
            pipe.getBody(req, function(error, data) {
                if (error)
                    next(error);
                else
                    parseCsv(data, function(error, data) {
                        if (!error)
                            customers(data, function(error, result) {
                                res.send(result);
                            });
                        else
                            res .status(404)
                                .send(error.message);
                    });
            });
        })
        .delete(function(req, res, next) {
            next(ERROR);
        });
})();
