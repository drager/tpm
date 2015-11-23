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
  describe('move', () => {
    it('should throw if no parameter is passed', () => {
      expect(() => {
        typings.move()
      }).to.throw('Files needs to an array!');
    });

    it('should throw if the parameter passed is not an array', () => {
      const parameter = 10;
      expect(() => {
          typings.move(parameter);
        }).to.throw('Files needs to an array!');
    });
  });
});
