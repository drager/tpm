const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

const nodegit = require('nodegit');
const temp = require('temp');
const fetcher = require('../../src/fetcher');

describe('fetcher', () => {
  describe('fetch', () => {

    it('should throw if the passed parameter is undefiend', () => {
      expect(() => {
        fetcher.get();
      }).to.throw('The url to be fetched needs to be a string!');
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
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const urlToFetch = 'https://github.com/drager/tpm/';
      const fetcherSpy = sinon.spy();
      const promise = fetcher.get(urlToFetch);
      nodegit.Clone.clone.restore();
      return promise.then(fetcherSpy).then(() => {
        expect(fetcherSpy).to.have.been.calledOnce;
      });
    });

    it('should call Clone with the given url', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const urlToFetch = 'https://github.com/drager/tpm';

      fetcher.get(urlToFetch);
      expect(nodegit.Clone.clone).to.have.been.calledWith(urlToFetch);
      nodegit.Clone.clone.restore();
    });

    it('should eventually return the local path', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const path = 'tmp';
      const name = 'tpm';
      const urlToFetch = `https://github.com/drager/${name}`;

      const result = fetcher.get(urlToFetch);
      nodegit.Clone.clone.restore();
      return expect(result).to.eventually.equal(`${path}/${name}`);
    });

    it('should return rejected promise when the path is missing to repository', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => reject('rejected')));
      const path = 'tmp';
      const name = 'tpm';
      const urlToFetch = `https://github.com/drager/`;

      const result = fetcher.get(urlToFetch);
      nodegit.Clone.clone.restore();
      return expect(result).to.be.rejected;
    });

    it('should return rejected with a error when url with missing the path to the repository', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => reject(new Error('invalid url, missing path'))));
      const path = 'tmp';
      const name = 'tpm';
      const urlToFetch = `https://github.com/drager/`;

      const result = fetcher.get(urlToFetch);
      nodegit.Clone.clone.restore();
      return expect(result).to.be.rejectedWith('invalid url, missing path');
    });

    it('should call temp.track() once', () => {
      const urlToFetch = `https://github.com/drager/tpm`;
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const mock = sinon.mock(temp);

      mock.expects('track').once();

      const result = fetcher.get(urlToFetch);

      mock.verify();
    });
  });
});
