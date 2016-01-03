'use strict';

const fs = require('fs');
const Path = require('path');

const parser = require('./parser');
const fetcher = require('./fetcher');
const typings = require('./typings');

const yamlFile = './typings.yaml';
const savePath = './typings_custom';

const tpm = () => {
  if (!typings.folderExists(yamlFile)) {
    throw new Error(`${yamlFile} is not present!`);
  }
  return new Promise((resolve, reject) => {
    fs.readFile(yamlFile, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }

      const parsed = parser.parse(data);
      const object = parsed.typings;

      if (!object) {
        throw new Error(`Typings are missing in the ${yamlFile} file!`);
      }

      const keys = Object.keys(object);

      const promises = keys.map((key) => {
        let url = `https://github.com/${object[key]}`;
        console.info('Fetching:', url)
        return fetcher.get(url, key).then((file) => {
          console.info('Found typings...');
          typings.find(file).then((files) => {
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

module.exports = tpm;
