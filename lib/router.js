(function() {
    'use strict';

    var fs          = require('fs'),
        async       = require('async'),
        express     = require('express'),
        handlebars  = require('handlebars'),
        formidable  = require('formidable'),
        parse       = require('./parse'),
        upload      = require('./upload'),
        log         = require('debug')('router'),
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
        .post(function(req, res) {
            var form = new formidable.IncomingForm();
            
            async.waterfall([
               function(callback) {
                   form.parse(req, function(error, fields, files) {
                        var token   = req.query.code,
                            file    = files.file.path;
                        
                        log('token: %s', token);
                        log('file: %s', file);
                        
                        callback(error, token, file);
                    });
               },
               
               function(token, name, callback) {
                   parse(name, function(error, data) {
                       callback(error, token, data);
                   });
               },
               
               function(token, csv, callback) {
                    log('csv: %s', csv);
                    upload(token, csv, callback);
               },
               
               function(result, callback) {
                   res.end(JSON.stringify(result));
                   callback();
               }
            ], function(error) {
                 if (error)
                    res .status(404)
                        .end(error.message);
            });
        })
        .delete(function(req, res, next) {
            next(ERROR);
        });
})();
