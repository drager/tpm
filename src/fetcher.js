"use strict";

const fetcher = {
  fetch(url) {
    if (url === undefined || typeof url !== 'string') {
      throw new Error('The url to be fetched needs to be a string!');
    }
  }
}

module.exports = fetcher;
