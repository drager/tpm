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

    it('should throw if savePath folder does not exist', () => {
      const parameter = 'tpm.d.ts';
      const savePath = 'typings_custom';
      expect(() => {
        typings._move(parameter, savePath);
      }).to.throw(`${savePath} does not exists!`);
    });
  });
});
