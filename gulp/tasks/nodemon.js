'use strict';

import config       from '../config'
import gulp         from 'gulp'
import nodemon      from 'gulp-nodemon'

gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: config.server.script,
        watch: config.server.src,
        ext: 'js',
        env: config.server.env
    }); 
});