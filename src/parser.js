const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined || typeof stringToParse !== 'string') {
      throw new Error('The string to be parsed needs to be a string!');
    }
    return {typings: ''};
  }
}

module.exports = parser;
