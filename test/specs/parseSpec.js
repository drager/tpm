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
      expect(() => {
          parser.parse(parameter);
        }).to.throw('The string to be parsed needs to be a string!');
    });

    it('should throw if the passed parameter is an empty string', () => {
      const stringToParse = '';
      expect(() => {
          parser.parse(stringToParse);
        }).to.throw(Error);
    });

    it('should return a parsed JSON object from the passed parameter string', () => {
      const stringToParse = 'git: ';
      expect(parser.parse(stringToParse)).to.eql({git: ''});
    });
  });
});
