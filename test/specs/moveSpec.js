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
const Path = require('path');

describe('typings', () => {
  describe('move', () => {
    afterEach(() => {
      if (typings._move.restore !== undefined
          && typeof typings._move.restore === 'function') {
          typings._move.restore();
      }
    });

    it('should throw if no parameter is passed', () => {
      expect(() => {
        typings.move()
      }).to.throw('Files needs to be an array!');
    });

    it('should throw if the parameter passed is not an array', () => {
      const parameter = 10;
      expect(() => {
          typings.move(parameter);
        }).to.throw('Files needs to be an array!');
    });

    it('should call _move function with each element', () => {
      const parameter = ['tpm.d.ts', 'typescript.d.ts'];
      const mock = sinon.stub(typings, '_move');

      typings.move(parameter);

      expect(mock).to.have.been.calledTwice;
    });
  });

  describe('_move', () => {
    afterEach(() => {
      if (fs.statSync.restore !== undefined
          && typeof fs.statSync.restore === 'function') {
          fs.statSync.restore();
      }
      if (typings.folderExists.restore !== undefined
          && typeof typings.folderExists.restore === 'function') {
          typings.folderExists.restore();
      }

      if (fs.mkdirSync.restore !== undefined
          && typeof fs.mkdirSync.restore === 'function') {
          fs.mkdirSync.restore();
      }

      if (fs.createWriteStream.restore !== undefined
          && typeof fs.createWriteStream.restore === 'function') {
          fs.createWriteStream.restore();
      }

      if (fs.createReadStream.restore !== undefined
          && typeof fs.createReadStream.restore === 'function') {
          fs.createReadStream.restore();
      }

      if (fs.WriteStream.restore !== undefined
          && typeof fs.WriteStream.restore === 'function') {
          fs.WriteStream.restore();
      }

      if (Path.normalize.restore !== undefined
          && typeof Path.normalize.restore === 'function') {
          Path.normalize.restore();
      }
    });

    it('should throw if no parameter is passed', () => {
      expect(() => {
        typings._move();
      }).to.throw('File needs to be a string!');
    });

    it('should throw if parameter passed is not a string', () => {
      const parameter = 2;
      expect(() => {
        typings._move(parameter);
      }).to.throw('File needs to be a string!');
    });

    it('should throw if savePath is not passed', () => {
      const parameter = 'tpm.d.ts';
      const savePath = 'typings_custom';
      expect(() => {
        typings._move(parameter);
      }).to.throw('savePath needs to be a string!');
    });

    it('should throw if savePath is not a string', () => {
      const parameter = 'tpm.d.ts';
      const savePath = 123;
      expect(() => {
        typings._move(parameter, savePath);
      }).to.throw('savePath needs to be a string!');
    });

    it('should call folderExists once', () => {
      const parameter = 'tpm.d.ts';
      const savePath = 'typings_custom';
      sinon.stub(fs, 'createWriteStream');
      sinon.stub(fs, 'createReadStream').returns({pipe: sinon.spy()});
      const mock = sinon.stub(typings, 'folderExists').returns(true);

      typings._move(parameter, savePath);

      expect(mock).to.have.been.calledOnce;
    });

    it('should create savePath folder if it does not exist', () => {
      const parameter = 'tpm.d.ts';
      const savePath = 'typings_custom';
      sinon.stub(fs, 'createWriteStream');
      sinon.stub(fs, 'createReadStream').returns({pipe: sinon.spy()});
      sinon.stub(typings, 'folderExists').returns(false);
      const mock = sinon.mock(fs);

      mock.expects('mkdirSync').once();

      const result = typings._move(parameter, savePath);

      mock.verify();
    });

    it('should call createReadStream once with file as argument', () => {
      const parameter = 'tpm.d.ts';
      const savePath = 'typings_custom';
      sinon.stub(fs, 'createWriteStream');
      const stub = sinon.stub(typings, 'folderExists').returns(true);
      const mock = sinon.mock(fs);

      mock.expects('createReadStream').returns({pipe: sinon.spy()}).once().withExactArgs(parameter);

      const result = typings._move(parameter, savePath);

      mock.verify();
    });

    it('should call createWriteStream once with savePath and fileName as argument', () => {
      const filePath = '/tmp/typings/';
      const fileName = 'tpm.d.ts';
      const savePath = '/tmp/typings_custom/';
      sinon.stub(fs, 'createReadStream').returns({pipe: sinon.spy()});
      const stub = sinon.stub(typings, 'folderExists').returns(true);
      const mock = sinon.mock(fs);

      const arg = savePath + fileName;

      mock.expects('createWriteStream').once().withExactArgs(arg);

      const result = typings._move(filePath + fileName, savePath);

      mock.verify();
    });

    it('should call normalize twice', () => {
      const filePath = '/tmp/typings/';
      const fileName = 'tpm.d.ts';
      const savePath = '/tmp/typings_custom/';
      sinon.stub(fs, 'createReadStream').returns({pipe: sinon.spy()});
      sinon.stub(fs, 'createWriteStream');
      sinon.stub(typings, 'folderExists').returns(true);
      const mock = sinon.mock(Path);

      mock.expects('normalize').twice();

      const result = typings._move(filePath + fileName, savePath);

      mock.verify();
    });

    it('should call pipe once', () => {
      const filePath = '/tmp/typings/';
      const fileName = 'tpm.d.ts';
      const savePath = '/tmp/typings_custom/';
      const spy = sinon.spy();
      sinon.stub(fs, 'createReadStream').returns({pipe: spy});
      const stream = sinon.stub(fs, 'WriteStream');
      sinon.stub(fs, 'createWriteStream').returns(stream);
      sinon.stub(typings, 'folderExists').returns(true);
      sinon.stub(Path, 'normalize');

      const result = typings._move(filePath + fileName, savePath);

      expect(spy).to.be.calledOnce;
    });

    it('should call pipe with write stream', () => {
      const filePath = '/tmp/typings/';
      const fileName = 'tpm.d.ts';
      const savePath = '/tmp/typings_custom/';
      const spy = sinon.spy();
      sinon.stub(fs, 'createReadStream').returns({pipe: spy});
      const stream = sinon.stub(fs, 'WriteStream');
      sinon.stub(fs, 'createWriteStream').returns(stream);
      sinon.stub(typings, 'folderExists').returns(true);
      sinon.stub(Path, 'normalize');

      const result = typings._move(filePath + fileName, savePath);

      expect(spy).to.be.calledWithExactly(stream);
    });
  });

  describe('folderExists', () => {
    afterEach(() => {
      if (fs.statSync.restore !== undefined
          && typeof fs.statSync.restore === 'function') {
          fs.statSync.restore();
      }
    });

    it('should throw if no parameter is passed', () => {
      expect(() => {
        typings.folderExists()
      }).to.throw('Path needs to be a string!');
    });

    it('should throw if parameter passed is not a string', () => {
      const parameter = 13213;
      expect(() => {
        typings.folderExists(parameter);
      }).to.throw('Path needs to be a string!');
    });

    it('should call statSync once', () => {
      const parameter = 'typings_custom';
      const mock = sinon.stub(fs, 'statSync');

      typings.folderExists(parameter);

      expect(mock).to.have.been.calledOnce;
    });

    it('should return false if folder does exists', () => {
      const parameter = 'sd';
      sinon.stub(fs, 'statSync').throws(new Error());

      expect(typings.folderExists(parameter)).to.be.false;
    });
  });
});
