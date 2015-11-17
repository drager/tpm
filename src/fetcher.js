"use strict";

const fetcher = {
  get(url) {
    if (url === undefined || typeof url !== 'string' ||
        url.length <= 0) {
      throw new Error('The url to be fetched needs to be a string!');
    }
  }
}

module.exports = fetcher;
