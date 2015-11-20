const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

const fs = require('fs');
const typings = require('../../src/typings');

describe('typings', () => {
  var mock;

  beforeEach(() => {
    mock = sinon.mock(fs);
  });

  afterEach(() => {
    mock.restore();
  })

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

      const result = typings.find(path, () => {});

      expect(result).to.be.equal(`${path}/${name}`);
      fs.readdirSync.restore();
      fs.statSync.restore();
    });

    it('should call readdirSync once', () => {
      const path = 'tmp/typings';

      mock.expects('readdirSync')
          .returns(['a'])
          .withExactArgs(path)
          .once();

      mock.expects('statSync');

      typings.find(path, () => {});

      mock.verify();
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
  });
});
