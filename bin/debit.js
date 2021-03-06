#!/usr/bin/env node

'use strict';

var http = require('http');
var express = require('express');
var router = require('../lib/router');

var app = express();
var server = http.createServer(app);

var PORT = process.env.PORT || 9876;
var IP = '0.0.0.0';
var DIR = __dirname + '/../assets';

app .use(router)
    .use(express.static(DIR));

server.listen(PORT, IP);

console.log('http://%s:%d', IP, PORT);
