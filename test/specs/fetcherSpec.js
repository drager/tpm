const expect = require('chai').expect;

const fetcher = require('../../src/fetcher');

describe('fetcher', () => {
  describe('fetch', () => {
    it('should throw if the passed parameter is undefiend', () => {
      expect(fetcher.fetch).to.throw('The string to be parsed needs to be a string!');
    });
  });
});
