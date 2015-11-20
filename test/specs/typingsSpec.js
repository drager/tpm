'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const chaiString = require('chai-string');
const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiString);

const fs = require('fs');
const typings = require('../../src/typings');

describe('typings', () => {
  afterEach(() => {
    if (fs.readdirSync.restore !== undefined
        && typeof fs.readdirSync.restore === 'function') {
        fs.readdirSync.restore();
    }
    if (fs.statSync.restore !== undefined
        && typeof fs.statSync.restore === 'function') {
        fs.statSync.restore();
    }
  });

  describe('find', () => {
    it('should throw if the passed parameter is undefiend', () => {
      expect(typings.find).to.throw();
    });

    it('should throw if the passed parameter is not a string', () => {
      const parameter = 1;
      expect(() => {
          typings.find(parameter);
        }).to.throw('The path needs to be a string!');
    });

    it('should throw if the passed parameter is an empty string', () => {
      const path = '';
      expect(() => {
          typings.find(path);
        }).to.throw('The path needs to be a string!');
    });

    it('should return path to file when found', () => {
      const path = 'path';
      const name = 'tmp.d.ts';
      sinon.stub(fs, 'readdirSync').returns([name]);
      sinon.stub(fs, 'statSync').returns({isFile: () => true});

      typings.find(path, (result) => {
        expect(result).to.be.equal(`${path}/${name}`);
      });
    });

    it('should call readdirSync once', () => {
      const path = 'tmp/typings';
      sinon.stub(fs, 'statSync').returns({isFile: () => true});
      const mock = sinon.stub(fs, 'readdirSync').returns([1]);

      typings.find(path, () => {});

      expect(mock).to.have.been.calledOnce;
    });

    it('should verify that the callback parameter is not undefined', () => {
      const path = 'tmp/typings';

      expect(() => {
          typings.find(path);
        }).to.throw('Callback needs to be a function!');
    });

    it('should verify that the callback parameter is a function', () => {
      const path = 'tmp/typings';

      expect(() => {
          typings.find(path, 's');
        }).to.throw('Callback needs to be a function!');
    });

    it('should call readdirSync twice if path contains a folder', () => {
      const path = 'tmp/typings';
      const statStub = sinon.stub(fs, 'statSync');
      statStub.onCall(0).returns(
        {
          isFile: () => false,
          isDirectory: () => true
        }
      );
      statStub.onCall(1).returns(
        {
          isFile: () => true,
          isDirectory: () => false
        }
      );

      const mock = sinon.stub(fs, 'readdirSync').returns(['typings']);

      typings.find(path, () => {});

      expect(mock).to.have.been.calledTwice;
    });

    it('should return files that only ends with .d.ts', () => {
      const path = 'k/typings';
      const statStub = sinon.stub(fs, 'statSync');
      sinon.stub(fs, 'readdirSync').returns(['index.js', 'tpm.d.ts', 'tpm.d.ts.js']);
      statStub.returns(
        {
          isFile: () => true,
        }
      );

      typings.find(path, (file) => {
        expect(file).to.endWith('.d.ts');
      });
    });
  });
});
