"use strict";

const yaml = require('js-yaml');
const BadFormatError = require('./errors');

const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined || typeof stringToParse !== 'string' || stringToParse.length <= 0) {
      throw new Error('The string to be parsed needs to be a string!');
    }

    let parsed = yaml.safeLoad(stringToParse);

    const key = Object.keys(parsed).find((k) => k);

    if (key !== 'typings') {
      throw new BadFormatError('String needs to start with typings.');
    }

    return parsed;
  }
}

module.exports = parser;
