"use strict";

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

    let filePath;

    fs.readdirSync(path).map((name) => {
        filePath = `${path}/${name}`;
        const stat = fs.statSync(filePath);
    });

    return filePath;

  },
}

module.exports = typings;
