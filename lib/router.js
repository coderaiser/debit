'use strict';

var fs = require('fs');
var async = require('async');
var express = require('express');
var handlebars = require('handlebars');
var formidable = require('formidable');
var parse = require('./parse');
var upload = require('./upload');
var log = require('debug')('router');
var UploadName = 'assets/upload.html';

var UploadTmpl = fs.readFileSync(UploadName, {
    encoding: 'utf8'
});

var router = express.Router();

var ERROR = new Error('Not implemented!');

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
