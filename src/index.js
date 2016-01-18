'use strict';

const fs = require('fs');
const Path = require('path');

const parser = require('./parser');
const fetcher = require('./fetcher');
const typings = require('./typings');

const yamlFile = './typings.yaml';
let savePath = './typings_tpm';

const tpm = () => {
  if (!typings.folderExists(yamlFile)) {
    console.error(`${yamlFile} is not present!`);
    return Promise.reject();
  }
  return new Promise((resolve, reject) => {
    fs.readFile(yamlFile, 'utf8', (error, data) => {
      if (error) {
        return reject(error);
      }

      const parsed = parser.parse(data);
      const path = Object.keys(parsed).find(k => k);

      if (path !== 'typings') {
        savePath = path;
      }

      const object = parsed.typings;

      if (!object) {
        console.error(`typings are missing in the ${yamlFile} file!`);
        return reject();
      }

      const keys = Object.keys(object);

      const promises = keys.map((key) => {
        const url = `https://github.com/${object[key]}`;
        console.info('Fetching:', url)
        return fetcher.get(url, key)
            .then((file) => typings.find(file))
            .then((files) => {
              if (files.length) {
                console.info('Found typings...');
                typings.move(files, Path.normalize(`${savePath}/${key}`));
                console.info('Moving typings...');
                console.info('Done.');
              } else {
                console.warn('Repository contained no typings.');
              }
            });
      });
      Promise.all(promises).then(resolve);
    });
  });
}

module.exports = tpm;
