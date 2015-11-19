"use strict";

const typings = {
  find(path) {
    if (path === undefined) {
      throw new Error('The path needs to be a string!');
    }
  },
}

module.exports = typings;
