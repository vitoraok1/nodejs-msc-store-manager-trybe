const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const { getAllMockWithData, getByIdMockWithData } = require('../mock/sales.mock');

describe('Sales Model tests', () => {
  afterEach(() => sinon.restore());
  describe('Success case', () => {
    it('getAll with data', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);

      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
    });

    it('getById with data', async () => {
      sinon.stub(connection, 'execute').resolves([getByIdMockWithData]);

      const result = await salesModel.getById(1);

      expect(result).to.be.deep.equal(getByIdMockWithData);
    });
  });

  describe('Fails case', () => {
    it('getById db fail', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Sales not found'));

      try {
        await salesModel.getById(55);
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Sales not found');
      };
    });
  });
});