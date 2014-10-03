(function() {
    'use strict';

    var fs          = require('fs'),
        express     = require('express'),
        csv         = require('csv'),
        handlebars  = require('handlebars'),
        debitoor    = require('debitoor'),
        
        UploadName  = 'assets/upload.html',
        
        UploadTmpl  = fs.readFileSync(UploadName, {
            encoding: 'utf8'
        }),
        
        router      = express.Router(),
        
        ERROR       = new Error('Not implemented!');
    
    module.exports  = router;
    
    router.route('/upload')
        .get(function(req, res, next) {
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
            fs.readFile(req.files.file.path, function(error, data) {
                if (error)
                    next(error);
                else
                    res.send('done');
            });
        })
        .delete(function(req, res, next) {
            next(ERROR);
        });
})();
