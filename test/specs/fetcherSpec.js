const expect = require('chai').expect;

const fetcher = require('../../src/fetcher');

describe('fetcher', () => {
  describe('fetch', () => {
    it('should throw if the passed parameter is undefiend', () => {
      expect(fetcher.get).to.throw('The url to be fetched needs to be a string!');
    });

    it('should throw if the passed parameter is not a string', () => {
      const parameter = 1;
      expect(() => {
          fetcher.get(parameter);
        }).to.throw('The url to be fetched needs to be a string!');
    });

    it('should throw if the passed parameter is an empty string', () => {
      const urlToFetch = '';
      expect(() => {
          fetcher.get(urlToFetch);
        }).to.throw('The url to be fetched needs to be a string!');
    });
  });
});
