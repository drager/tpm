const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

const typings = require('../../src/typings');

describe('typings', () => {
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
  });
});
