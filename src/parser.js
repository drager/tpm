"use strict";

const yaml = require('js-yaml');
const BadFormatError = require('./errors');

const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined || typeof stringToParse !== 'string' || stringToParse.length <= 0) {
      throw new Error('The string to be parsed needs to be a string!');
    }

    const parsed = yaml.safeLoad(stringToParse);

    if (!parsed.hasOwnProperty('typings')) {
      throw new BadFormatError('String needs to contain typings.');
    }

    return parsed;
  }
}

module.exports = parser;
