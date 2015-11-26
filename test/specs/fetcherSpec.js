'use strict';

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
    let mkdirSync;
    beforeEach(() => {
      mkdirSync = sinon.stub(temp, 'mkdirSync');
    });

    afterEach(() => {
      if (temp.track.restore !== undefined
          && typeof temp.track.restore === 'function') {
          temp.track.restore();
      }

      if (temp.mkdirSync.restore !== undefined
          && typeof temp.mkdirSync.restore === 'function') {
          temp.mkdirSync.restore();
      }

      if (nodegit.Clone.clone.restore !== undefined
          && typeof nodegit.Clone.clone.restore === 'function') {
          nodegit.Clone.clone.restore();
      }
    });

    it('should throw if the url parameter is undefiend', () => {
      expect(() => {
        fetcher.get();
      }).to.throw('The url to be fetched needs to be a string!');
    });

    it('should throw if the url parameter is not a string', () => {
      const parameter = 1;
      expect(() => {
          fetcher.get(parameter, 'tpm');
        }).to.throw('The url to be fetched needs to be a string!');
    });

    it('should throw if the url parameter is an empty string', () => {
      const urlToFetch = '';
      expect(() => {
          fetcher.get(urlToFetch, 'tpm');
        }).to.throw('The url to be fetched needs to be a string!');
    });

    it('should throw if the name parameter is undefiend', () => {
      expect(() => {
        fetcher.get('https://github.com/drager/tpm');
      }).to.throw('The name needs to be a string!');
    });

    it('should throw if the name parameter is not a string', () => {
      expect(() => {
        fetcher.get('https://github.com/drager/tpm', 12313);
      }).to.throw('The name needs to be a string!');
    });

    it('should return a resolved Promise', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const urlToFetch = 'https://github.com/drager/tpm/';
      const fetcherSpy = sinon.spy();
      const promise = fetcher.get(urlToFetch, 'tpm');
      nodegit.Clone.clone.restore();
      return promise.then(fetcherSpy).then(() => {
        expect(fetcherSpy).to.have.been.calledOnce;
      });
    });

    it('should call Clone with the given url', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const urlToFetch = 'https://github.com/drager/tpm';

      fetcher.get(urlToFetch, 'tpm');
      expect(nodegit.Clone.clone).to.have.been.calledWith(urlToFetch);
      nodegit.Clone.clone.restore();
    });

    it('should eventually return newly created folder', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const name = 'tpm';
      const createdFolderPath = '/tmp/tpm-1151026-7172-81duv7';
      const urlToFetch = `https://github.com/drager/${name}`;

      mkdirSync.returns(createdFolderPath)

      const result = fetcher.get(urlToFetch, 'tpm');
      nodegit.Clone.clone.restore();
      return expect(result).to.eventually.equal(`${createdFolderPath}/${name}`);
    });

    it('should return rejected promise when the path is missing to repository', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => reject('rejected')));
      const path = 'tmp';
      const name = 'tpm';
      const urlToFetch = `https://github.com/drager/`;

      const result = fetcher.get(urlToFetch, 'tpm');
      nodegit.Clone.clone.restore();
      return expect(result).to.be.rejected;
    });

    it('should return rejected with a error when url with missing the path to the repository', () => {
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => reject(new Error('invalid url, missing path'))));
      const path = 'tmp';
      const name = 'tpm';
      const urlToFetch = `https://github.com/drager/`;

      const result = fetcher.get(urlToFetch, 'tpm');
      nodegit.Clone.clone.restore();
      return expect(result).to.be.rejectedWith('invalid url, missing path');
    });

    it('should call temp.track() once', () => {
      const urlToFetch = `https://github.com/drager/tpm`;
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const mock = sinon.mock(temp);

      mock.expects('track').once();

      fetcher.get(urlToFetch, 'tpm');

      mock.verify();
    });

    it('should call temp.mkdirSync() once', () => {
      const urlToFetch = `https://github.com/drager/tpm`;
      sinon.stub(nodegit.Clone, 'clone').returns(
        new Promise((resolve, reject) => resolve('resolved')));
      const mock = sinon.mock(temp);

      if (temp.mkdirSync.restore !== undefined
          && typeof temp.mkdirSync.restore === 'function') {
          temp.mkdirSync.restore();
      }

      mock.expects('mkdirSync').once().withArgs('tpm-');

      fetcher.get(urlToFetch, 'tpm');

      mock.verify();
    });
  });
});
