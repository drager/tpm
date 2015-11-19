"use strict";

const fs = require('fs');

const typings = {
  find(path) {
    if (path === undefined || typeof path !== 'string' ||
        path.length <= 0) {
      throw new Error('The path needs to be a string!');
    }

    fs.lstatSync(path);
  },
}

module.exports = typings;
