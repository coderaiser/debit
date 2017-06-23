'use strict';

/*global describe, it */

const fs = require('fs');
const should = require('should');
const parse = require('../lib/parse');
const test = fs.readFileSync(__dirname + '/test.json', {encoding: 'utf8'});

describe('Debit', () => {
    describe('parse', () => {
        it('should parse cvs to json', () => {
            parse(__dirname + '/test.cvs', (error, data) => {
                const json = JSON.stringify(data);
                
                should(json).eql(test);
            });
        });
    });
});

