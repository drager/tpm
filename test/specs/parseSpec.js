'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const BadFormatError = require('../../src/errors');
const parser = require('../../src/parser');

describe('parser', () => {
  describe('parse', () => {
    it('should return an object', () => {
      const stringToParse = 'typings: ';
      expect(parser.parse(stringToParse)).to.eql({typings: null});
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
      expect(parser.parse(stringToParse)).to.eql({git: null});
    });

    it('should throw BadFormatError if it does not start with typings', () => {
      const stringToParse = 'a: ';

      expect(() => {
          parser.parse(stringToParse);
        }).to.throw(BadFormatError, 'String needs to start with typings.');
    });
  });
});
