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

  it('should call fs.readFile once', () => {
    sinon.stub(typings, 'folderExists');
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
});
