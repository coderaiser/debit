(function() {
    'use strict';
    
    var gulp        = require('gulp'),
        mocha       = require('gulp-mocha');
    
    gulp.task('test', function() {
       gulp.src('test/test.js')
           .pipe(mocha({reporter: 'min'}))
           .on('error', onError);
    });
    
    function onError(params) {
        console.log(params.message);
    }
})();
