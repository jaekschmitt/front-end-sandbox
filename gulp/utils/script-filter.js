'use filter';

import path from 'path';

// filter all non .js files and prevent
// accidental inclusion of hidden files
export default function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
}