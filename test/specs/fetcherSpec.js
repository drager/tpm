const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

const nodegit = require('nodegit');
const fetcher = require('../../src/fetcher');

describe('fetcher', () => {
  after(() => {
      // When the test either fails or passes, restore the original
      // nodegit Clone function
      nodegit.Clone.restore();
  });

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

    it('should return a resolved Promise', () => {
      const urlToFetch = 'https://github.com/drager/tpm/';
      const fetcherSpy = sinon.spy();
      const promise = fetcher.get(urlToFetch);

      return promise.then(fetcherSpy).then(() => {
        expect(fetcherSpy).to.have.been.calledOnce;
      });
    });

    it('should call Clone with the given url', () => {
      const urlToFetch = 'https://github.com/drager/tpm';
      const fetcherSpy = sinon.spy();
      const cb = sinon.stub(nodegit, 'Clone');
      fetcher.get(urlToFetch).then(fetcherSpy);

      expect(cb).to.have.been.calledWith(urlToFetch);
    });
  });
});
