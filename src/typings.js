'use strict';

const fs = require('fs');

const typings = {
  find(path, callback) {
    if (path === undefined || typeof path !== 'string' ||
        path.length <= 0) {
      throw new Error('The path needs to be a string!');
    }

    if (callback === undefined || typeof callback !== 'function') {
      throw new Error('Callback needs to be a function!');
    }

    fs.readdirSync(path).map((name) => {
        const filePath = `${path}/${name}`;
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          if (new RegExp('.d.ts$').test(filePath)) {
            callback(filePath);
          }
        } else if (stat.isDirectory()) {
          typings.find(filePath, callback);
        }
    });
  },
}

module.exports = typings;
