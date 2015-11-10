const expect = require('chai').expect;

const parser = require('../../src/parser');

describe('parser', () => {
  describe('parse', () => {
    it('should return an object', () => {
      const stringToParse = 'typings: ';
      expect(parser.parse(stringToParse)).to.eql({typings: ''});
    });

    it('should throw if the passed string is undefiend', () => {
      const stringToParse = 'typings:';
      expect(parser.parse()).to.throw(Error);
    });
  });
});
