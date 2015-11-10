const parser = {
  parse(stringToParse) {
    if (stringToParse === undefined) {
      throw new Error();
    }
    return {typings: ''};
  }
}

module.exports = parser;
