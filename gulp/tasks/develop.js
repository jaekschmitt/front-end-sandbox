'use strict';

import gulp         from 'gulp';
import runSequence  from 'run-sequence';
import nodemon      from 'gulp-nodemon';

gulp.task('develop', ['clean'], function(cb) {

    global.isProd = false;
    runSequence(['styles', 'browserify'], ['watch', 'nodemon'], cb);
});