const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { getAllMockWithData, getByIdMockWithData } = require('../mock/products.mock');

describe('Products Service tests', () => {
  afterEach(() => sinon.restore());
  describe('Success case', () => {
    it('getAll with data', async () => {
      sinon.stub(productsModel, 'getAll').resolves(getAllMockWithData);

      const result = await productsService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(getAllMockWithData);
    });

    it('getById with data', async () => {
      sinon.stub(productsModel, 'getById').resolves(getByIdMockWithData[0]);

      const result = await productsService.getById(1);

      expect(result.message).to.be.deep.equal(getByIdMockWithData[0]);
    });
  });

  describe('Fails case', () => {
    it('getById with a non existent id', async () => {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const result = await productsService.getById(1);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });
});