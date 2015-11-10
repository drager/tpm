"use strict";

const fetcher = {
  fetch(url) {
    if (url === undefined) {
      throw new Error('The string to be parsed needs to be a string!');
    }
  }
}

module.exports = fetcher;