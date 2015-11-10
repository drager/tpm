const expect = require('chai').expect;

const parser = require('../../src/parser');

describe('parser', () => {
  describe('parse', () => {
    it('should return an object', () => {
      const stringToParse = 'typings: ';
      expect(parser.parse(stringToParse)).to.eql({typings: ''});
    });

    it('should throw if the passed parameter is undefiend', () => {
      expect(parser.parse).to.throw(Error);
    });

    it('should throw if the passed parameter is not a string', () => {
      const parameter = 1;
      expect(
        function () {
          parser.parse(parameter);
        }).to.throw(Error);
    });
  });
});
