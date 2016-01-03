'use strict';

const fs = require('fs');
const Path = require('path');

const parser = require('./parser');
const fetcher = require('./fetcher');
const typings = require('./typings');

const yamlFile = './typings.yaml';
const savePath = './typings_custom';

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
          let url = `https://github.com/${object[key]}`;
          return fetcher.get(url, key).then((file) => {
            console.info('Fetching:', url)
            typings.find(file).then((files) => {
              console.info('Found typings...');
              typings.move(files, Path.normalize(`${savePath}/${key}`));
              console.info('Moving typings...');
              console.info('Done.');
            });
          });
        });
        Promise.all(promises).then(resolve);
      });
      reject();
    });
  }
}

module.exports = tpm;
