'use strict';

const nodegit = require('nodegit');
const temp = require('temp');

const fetcher = {
  get(url, name) {
    if (url === undefined || typeof url !== 'string' ||
        url.length <= 0) {
      throw new Error('The url to be fetched needs to be a string!');
    }

    if (name === undefined || typeof name !== 'string' ||
        name.length <= 0) {
      throw new Error('The name needs to be a string!');
    }

    temp.track();

    let path = temp.mkdirSync('tpm-');

    path = `${path}/${name}`;

    return nodegit.Clone.clone(url, path, null).then((repository) => {
      return path;
    }).catch((e) => {
      throw e;
    });
  }
}

module.exports = fetcher;
