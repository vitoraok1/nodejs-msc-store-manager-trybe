const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const { getAllMockWithData, getByIdMockWithData } = require('../mock/products.mock');

describe('Products Model tests', () => {
  afterEach(() => sinon.restore());
  describe('Success case', () => {
    it('getAll with data', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);

      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
    });

    it('getById with data', async () => {
      sinon.stub(connection, 'execute').resolves([getByIdMockWithData]);

      const result = await productsModel.getById(1);

      expect(result).to.be.deep.equal(getByIdMockWithData[0]);
    });
  });

  describe('Fails case', () => {
    it('getById db fail', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Product not found'));

      try {
        await productsModel.getById(32);
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Product not found');
      };
    });
  });
});