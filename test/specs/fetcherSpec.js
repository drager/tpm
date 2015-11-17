const expect = require('chai').expect;
const sinon = require('sinon');
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

    it('should return a Promise', () => {
      const urlToFetch = 'https://github.com/drager/tpm/';
      const fetcherSpy = sinon.spy();
      const promise = fetcher.get(urlToFetch);

      return promise.then(fetcherSpy).then(() => {
        expect(fetcherSpy).to.have.been.calledOnce;
      });
    });
  });
});
