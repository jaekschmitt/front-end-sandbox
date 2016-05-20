'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import rename       from 'gulp-rename';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import shim         from 'browserify-shim';
import browserSync  from 'browser-sync';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import debowerify   from 'debowerify';
import ngAnnotate   from 'browserify-ngannotate';
import handleErrors from '../utils/handle-errors';

function createSourcemap() {
    return !global.isProd || config.browserify.prodSourcemap;
}

function buildScript(file) {

    let bundler = browserify({
        entries: [config.sourceDir + 'scripts/' + file],
        debug: createSourcemap(),
        cache: {},
        packageCache: {},
        fullPaths: !global.isProd
    });

    if(!global.isProd) {
        bundler = watchify(bundler);

        bundler.on('update', function() {
            rebundle();
            gutil.log('Rebundle...');
        })
    }

    const transforms = [
        { 'name': babelify, 'options': { 'ignore': ['client/vendor'] } },
        { 'name': shim, 'options': {} },
        { 'name': debowerify, 'options': {} },        
        { 'name': ngAnnotate, 'options': {} },
        { 'name': 'brfs', 'options': {} },
        { 'name': 'bulkify', options: {} }
    ];

    transforms.forEach(function(transform) {
        bundler.transform(transform.name, transform.options);
    });

    function rebundle() {
        const stream = bundler.bundle();
        const sourceMapLocation = !global.isProd ? './' : null;

       return stream.on('error', handleErrors)
          .pipe(source(file))
          .pipe(rename((path) => {
            path.basename = path.basename.replace('module', 'bundle');
          }))
          .pipe(gulpif(createSourcemap(), buffer()))
          .pipe(gulpif(createSourcemap(), sourcemaps.init({ loadMaps: true })))
          .pipe(gulpif(global.isProd, streamify(uglify({
            compress: { drop_console: true } // eslint-disable-line camelcase
          }))))
          .pipe(gulpif(createSourcemap(), sourcemaps.write(sourceMapLocation)))          
          .pipe(gulp.dest(config.scripts.dest))
          .pipe(browserSync.stream());
    }

    return rebundle();
}

gulp.task('browserify', function() {
    return buildScript('site.module.js');
});