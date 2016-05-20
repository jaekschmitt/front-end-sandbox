'use strict';

import path     from 'path'
import fs       from 'fs';

export default {

    browserPort: 8080,
    UIPort: 8081,
    testPort: 8082,

    sourceDir: 'client/',
    buildDir: 'client/dist',

    styles: {
        src: 'client/styles/**/*.scss',
        dest: 'client/dist/css',
        prodSourcemap: false,
        sassIncludePaths: [
            'node_modules/bootstrap-sass/assets/stylesheets'
        ]
    },

    scripts: {
        src: 'client/scripts/**/*.js',
        dest: 'client/dist/js',
        gulp: 'gulp/**/*.js'
    },

    server: {
        script: 'server.js',
        src: ['server.js']
    },

    browserify: {
        bundleName: 'main.js',
        prodSourcemap: false
    },

    browserSync: {
        proxy: 'http://localhost:8080',
        open: false,
        broswer: 'google chrome',
        port: 8081,
        notify: false
    },

    init: function() {
        return this;
    }
}.init();