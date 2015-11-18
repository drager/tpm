"use strict";

const nodegit = require('nodegit');

const fetcher = {
  get(url) {
    if (url === undefined || typeof url !== 'string' ||
        url.length <= 0) {
      throw new Error('The url to be fetched needs to be a string!');
    }

    return new Promise((resolve, reject) => {
      return resolve(nodegit.Clone(url, 'tmp', null));
    });
  }
}

module.exports = fetcher;
