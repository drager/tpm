const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined || typeof stringToParse !== 'string') {
      throw new Error();
    }
    return {typings: ''};
  }
}

module.exports = parser;
