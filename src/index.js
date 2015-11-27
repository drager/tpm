'use strict';

const fs = require('fs');
const Path = require('path');

const parser = require('./parser');
const fetcher = require('./fetcher');
const typings = require('./typings');

const yamlFile = './typings.yaml';

const tpm = () => {
  if (typings.folderExists(yamlFile)) {
    fs.readFile(yamlFile);
  }
}

module.exports = tpm;
