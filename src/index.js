'use strict';

const fs = require('fs');
const Path = require('path');

const parser = require('./parser');
const fetcher = require('./fetcher');
const typings = require('./typings');

const tpm = () => {
  typings.folderExists();
}

module.exports = tpm;
