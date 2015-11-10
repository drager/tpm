const expect = require('chai').expect;

const fetcher = require('../../src/fetcher');

describe('fetcher', () => {
  describe('fetch', () => {
    it('should throw if the passed parameter is undefiend', () => {
      expect(fetcher.fetch).to.throw('The url to be fetched needs to be a string!');
    });

    it('should throw if the passed parameter is not a string', () => {
      const parameter = 1;
      expect(() => {
          fetcher.fetch(parameter);
        }).to.throw('The url to be fetched needs to be a string!');
    });
  });
});
