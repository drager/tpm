'use strict';

const fs = require('fs');
const Path = require('path');

const parser = require('./parser');
const fetcher = require('./fetcher');
const typings = require('./typings');

const yamlFile = './typings.yaml';

const tpm = () => {
  if (typings.folderExists(yamlFile)) {
    return new Promise((resolve, reject) => {
      fs.readFile(yamlFile, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }

        const parsed = parser.parse(data);
        const object = parsed.typings;
        const keys = Object.keys(object);

        const promises = keys.map((key) => {
          let arr = [];
          let url = `https://github.com/${object[key]}`;
          fetcher.get(url, key);
        });

        resolve();
      });
      reject();
    });
  }
}

module.exports = tpm;
