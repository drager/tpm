"use strict";

const nodegit = require('nodegit');

const fetcher = {
  get(url) {
    if (url === undefined || typeof url !== 'string' ||
        url.length <= 0) {
      throw new Error('The url to be fetched needs to be a string!');
    }

    let name = url.split('/');
    name = name[name.length - 1];

    const path = `tmp/${name}`;

    return nodegit.Clone.clone(url, path, null).then((repository) => {
      return path;
    }).catch((e) => {
      throw e;
    });
  }
}

module.exports = fetcher;
