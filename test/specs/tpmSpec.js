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
const Path = require('path');

const tpm = require('../../src/index');
const typings = require('../../src/typings');
const parser = require('../../src/parser');
const fetcher = require('../../src/fetcher');

describe('tpm', () => {
  afterEach(() => {
    if (typings.folderExists.restore !== undefined
        && typeof typings.folderExists.restore === 'function') {
        typings.folderExists.restore();
    }

    if (fs.readFile.restore !== undefined
        && typeof fs.readFile.restore === 'function') {
        fs.readFile.restore();
    }
  });

  it('should call folderExists once', () => {
    const mock = sinon.mock(typings);

    mock.expects('folderExists').once();

    tpm();

    mock.verify();
  });

  it('should call folderExists with ./typings.yaml', () => {
    const mock = sinon.mock(typings);

    mock.expects('folderExists').withArgs('./typings.yaml');

    tpm();

    mock.verify();
  });

  it('should call fs.readFile once', () => {
    sinon.stub(typings, 'folderExists').returns(true);
    const mock = sinon.mock(fs);

    mock.expects('readFile').once();

    tpm();

    mock.verify();
  });

  it('should not call fs.readFile if file does not exist', () => {
    sinon.stub(typings, 'folderExists').returns(false);
    const mock = sinon.mock(fs);

    mock.expects('readFile').never();

    tpm();

    mock.verify();
  });

  it('should call fs.readFile with ./typings.yaml', () => {
    sinon.stub(typings, 'folderExists').returns(true);
    const mock = sinon.mock(fs);

    mock.expects('readFile').withArgs('./typings.yaml');

    tpm();

    mock.verify();
  });

  it('should return a resolved Promise', () => {
    sinon.stub(typings, 'folderExists').returns(true);
    sinon.stub(fs, 'readFile').callsArgWith(2, undefined, 'typings: ');

    const promise = tpm();

    return expect(promise).to.be.fulfilled;
  });

  it('should return a rejected Promise if reading failes', () => {
    sinon.stub(typings, 'folderExists').returns(true);
    sinon.stub(fs, 'readFile').callsArgWith(2, 'File not found!');

    const promise = tpm();

    return expect(promise).to.be.rejected;
  });

  it('should call parser with the data from readFile', () => {
    const data = 'typings: ';
    sinon.stub(typings, 'folderExists').returns(true);
    sinon.stub(fs, 'readFile').callsArgWith(2, undefined, data);
    const mock = sinon.mock(parser);

    mock.expects('parse').withArgs(data);

    tpm();

    mock.verify();
  });

  it('should call fetcher two times if data is two has repositories', () => {
    const data = `typings:
                    ramda: donnut/typescript-ramda
                    cetti: drager/cetti`;
    sinon.stub(typings, 'folderExists').returns(true);
    sinon.stub(fs, 'readFile').callsArgWith(2, undefined, data);
    const mock = sinon.stub(fetcher, 'get');

    tpm();

    expect(mock).to.have.been.calledTwice;
  });
});
