"use strict";

const nodegit = require('nodegit');

const fetcher = {
  get(url) {
    if (url === undefined || typeof url !== 'string' ||
        url.length <= 0) {
      throw new Error('The url to be fetched needs to be a string!');
    }

    let name = 'tpm';

    const path = `tmp/${name}`;

    return nodegit.Clone.clone(url, 'tmp', null).then((repository) => {
      return path;
    });
  }
}

module.exports = fetcher;
