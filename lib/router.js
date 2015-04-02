(function() {
    'use strict';

    var fs          = require('fs'),
        express     = require('express'),
        handlebars  = require('handlebars'),
        formidable  = require('formidable'),
        parse       = require('./parse'),
        upload      = require('./upload'),
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
            
            form.parse(req, function(e, fields, files) {
                var token   = req.query.code,
                    file    = files.file.path;
                
                error(e, res) || parse(file, function(e, data) {
                    error(e, res) || upload(token, data, function(e, result) {
                        error(e, res) || res .end(JSON.stringify(result));
                    });
                });
            });
        })
        .delete(function(req, res, next) {
            next(ERROR);
        });
    
    function error(e, res) {
        if (e)
            res .status(404)
                .end(e.message || e);
        
        return !!e;
    }
})();
