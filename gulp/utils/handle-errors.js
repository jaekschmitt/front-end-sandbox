'use strict';

import notify from 'gulp-notify';

export default function(err) {

    if(!global.isProd) {
        let args = Array.prototype.slice.call(arguments);

        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);

        this.emit('end');
    } else {

        console.log(err);
        process.exit(1);
    }
};