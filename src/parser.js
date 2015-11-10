"use strict";

const yaml = require('js-yaml');

const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined || typeof stringToParse !== 'string' || stringToParse.length <= 0) {
      throw new Error('The string to be parsed needs to be a string!');
    }

    return yaml.safeLoad(stringToParse);
  }
}

module.exports = parser;
