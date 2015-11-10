const expect = require('chai').expect;

const parser = require('../../src/parser');

describe('parser', () => {
  describe('parse', () => {
    it('should return an object', () => {
      const stringToParse = 'typings: ';
      expect(parser.parse(stringToParse)).to.be.an('object');
    });
  });
});
