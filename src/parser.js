yaml = require('js-yaml');

const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined || typeof stringToParse !== 'string' || stringToParse.length <= 0) {
      throw new Error('The string to be parsed needs to be a string!');
    }

    const parsed = yaml.safeLoad(stringToParse);

    for (var key in parsed) {
      if (parsed.hasOwnProperty(key)) {
        if (!parsed[key]) {
          parsed[key] = '';
        }
      }
    }

    return parsed;
  }
}

module.exports = parser;
