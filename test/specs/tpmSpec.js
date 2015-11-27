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
  it('should call folderExists once', () => {
    const mock = sinon.mock(typings);

    mock.expects('folderExists').once();

    tpm();

    mock.verify();
  });
});
